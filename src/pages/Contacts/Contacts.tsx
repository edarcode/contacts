import Contact from "./Contact/Contact";
import css from "./css.module.css";
import Spinner from "../../components/spinners/Spinner/Spinner";
import Paged from "../../components/paginations/Paged/Paged";
import { useAccountContacts } from "./useAccountContacts";

export default function Contacts() {
  const { accountContacts, page, isLoading, isEmpty, setPage } =
    useAccountContacts();

  return (
    <section className={css.contacts}>
      <div className={css.wrapper}>
        {isLoading && <Spinner />}

        {isEmpty && <span>No tienes contactos</span>}

        {accountContacts?.records.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </div>

      <Paged
        page={page}
        totalPage={accountContacts?.totalPages || 1}
        action={setPage}
      />
    </section>
  );
}
