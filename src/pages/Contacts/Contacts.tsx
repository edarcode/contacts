import { useQuery } from "@tanstack/react-query";
import { accountContactsService } from "./accountContactsService";
import { useAuth } from "../../auth/useAuth";

export default function Contacts() {
  const token = useAuth((auth) => auth.token);

  const { data: accountContacts, isLoading } = useQuery({
    queryKey: ["accountContacts", token],
    queryFn: (tanStack) =>
      accountContactsService({ signal: tanStack.signal, token }),
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (isLoading) return <div>Cargando...</div>;
  if (!accountContacts?.records.length) return <div>No tiene contactos...</div>;
  return (
    <div>
      {accountContacts.records.map((contact) => (
        <article key={contact.id}>
          <span>{contact.name}: </span>
          <span>{contact.tell}</span>
        </article>
      ))}
    </div>
  );
}
