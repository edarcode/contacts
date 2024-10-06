import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useQuery } from "@tanstack/react-query";
import { accountContactsService } from "./accountContactsService";

const initFilters = {
  page: 1,
  limit: 5,
  name: "",
};

export const useAccountContacts = () => {
  const token = useAuth((auth) => auth.token);
  const [filters, setFilters] = useState(initFilters);
  const [debouncedName, setDebouncedName] = useState(filters.name);

  const { data: accountContacts, isLoading } = useQuery({
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
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((filters) => ({ ...filters, name: debouncedName, page: 1 }));
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [debouncedName]);

  const setPage = (newPage: number) =>
    setFilters({ ...filters, page: newPage });

  const isEmpty = !isLoading && !accountContacts?.records.length;

  return {
    accountContacts,
    isLoading,
    isEmpty,
    page: filters.page,
    setPage,
    name: debouncedName,
    setName: setDebouncedName,
  };
};
