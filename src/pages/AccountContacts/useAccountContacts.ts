import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { accountContactsService } from "./accountContactsService";
import { accountContactsSchema } from "./accountContactsSchema";

const initFilters = {
  page: 1,
  limit: 5,
  name: "",
};

export const useAccountContacts = () => {
  const token = useAuth((auth) => auth.token);
  const [filters, setFilters] = useState(initFilters);
  const [debouncedName, setDebouncedName] = useState(filters.name);
  const queryClient = useQueryClient();

  const format = accountContactsSchema.safeParse({ token, ...filters });

  const {
    data: accountContacts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["accountContacts", { token, ...filters }],
    queryFn: (tanStack) =>
      accountContactsService({
        signal: tanStack.signal,
        token,
        page: filters.page,
        limit: filters.limit,
        name: filters.name,
      }),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: format.success && !!token,
    retry: 0,
  });

  const errName = !format.success ? format.error?.issues[0].message : undefined;
  const isEmpty = !errName && !isLoading && !accountContacts?.records.length;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((filters) => ({ ...filters, name: debouncedName, page: 1 }));
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [debouncedName]);

  useEffect(() => {
    if (!isError) return;
    setFilters((filters) => ({ ...filters, page: filters.page - 1 }));
  }, [isError]);

  const setPage = (newPage: number) =>
    setFilters({ ...filters, page: newPage });

  const refetchAccountContacts = () => {
    queryClient.refetchQueries({ queryKey: ["accountContacts"] });
  };

  return {
    accountContacts,
    isLoading,
    isEmpty,
    page: filters.page,
    setPage,
    name: debouncedName,
    setName: setDebouncedName,
    errName,
    refetchAccountContacts,
  };
};
