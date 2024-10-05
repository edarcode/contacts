import { useQuery } from "@tanstack/react-query";
import { accountContactsService } from "./accountContactsService";
import { useAuth } from "../../auth/useAuth";
import Contact from "./Contact/Contact";
import css from "./css.module.css";
import Spinner from "../../components/spinners/Spinner/Spinner";
import Paged from "../../components/paginations/Paged/Paged";
import { useState } from "react";

export default function Contacts() {
  const token = useAuth((auth) => auth.token);
  const [page, setPage] = useState(1);

  const { data: accountContacts, isLoading } = useQuery({
    queryKey: ["accountContacts", { token, page }],
    queryFn: (tanStack) =>
      accountContactsService({
        signal: tanStack.signal,
        token,
        page: String(page),
      }),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const isEmptyContacs = !isLoading && !accountContacts?.records.length;

  return (
    <section className={css.contacts}>
      <div className={css.wrapper}>
        {isLoading && <Spinner />}

        {isEmptyContacs && <span>No tienes contactos</span>}

        {accountContacts?.records.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </div>

      <Paged
        fn={(newPage) => setPage(newPage)}
        totalPage={accountContacts?.totalPages}
      />
    </section>
  );
}
