import { useQuery } from "@tanstack/react-query";
import { accountContactsService } from "./accountContactsService";
import { useAuth } from "../../auth/useAuth";
import Contact from "./Contact/Contact";
import css from "./css.module.css";
import Spinner from "../../components/spinners/Spinner/Spinner";
import Paged from "../../components/paginations/Paged/Paged";

export default function Contacts() {
  const token = useAuth((auth) => auth.token);

  const { data: accountContacts, isLoading } = useQuery({
    queryKey: ["accountContacts", token],
    queryFn: (tanStack) =>
      accountContactsService({ signal: tanStack.signal, token }),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const isEmptyContacs = !isLoading && !accountContacts?.records.length;

  return (
    <section className={css.contacts}>
      {isLoading && <Spinner />}

      {isEmptyContacs && <span>No tienes contactos</span>}

      {accountContacts?.records.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}

      <Paged
        fn={(newPage) => console.log(newPage)}
        totalPage={accountContacts?.totalPages}
      />
    </section>
  );
}
