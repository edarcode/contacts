import Contact from "./Contact/Contact";
import css from "./css.module.css";
import Spinner from "../../components/spinners/Spinner/Spinner";
import Paged from "../../components/paginations/Paged/Paged";
import { useAccountContacts } from "./useAccountContacts";
import InputText from "../../components/inputs/InputText/InputText";

export default function Contacts() {
  const { accountContacts, page, isLoading, isEmpty, setPage, name, setName } =
    useAccountContacts();

  return (
    <section className={css.contacts}>
      <InputText value={name} onChange={(e) => setName(e.target.value)} />

      <div className={css.wrapper}>
        {isLoading && <Spinner />}

        {isEmpty && <span>No tienes contactos</span>}

        {accountContacts?.records.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </div>

      <Paged
        className={css.paged}
        page={page}
        totalPage={accountContacts?.totalPages || 1}
        action={setPage}
      />
    </section>
  );
}
