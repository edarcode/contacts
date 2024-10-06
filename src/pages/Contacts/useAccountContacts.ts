import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useQuery } from "@tanstack/react-query";
import { accountContactsService } from "./accountContactsService";

export const useAccountContacts = () => {
  const token = useAuth((auth) => auth.token);
  const [filters, setFilters] = useState({ page: 1, limit: null, name: null });

  const { data: accountContacts, isLoading } = useQuery({
    queryKey: ["accountContacts", { token, ...filters }],
    queryFn: (tanStack) =>
      accountContactsService({
        signal: tanStack.signal,
        token,
        page: String(filters.page),
      }),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const setPage = (newPage: number) =>
    setFilters({ ...filters, page: newPage });

  const isEmpty = !isLoading && !accountContacts?.records.length;

  return { accountContacts, isLoading, isEmpty, page: filters.page, setPage };
};
