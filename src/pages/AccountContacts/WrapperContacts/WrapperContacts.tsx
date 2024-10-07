import Spinner from "../../../components/spinners/Spinner/Spinner";
import { AccountContacts } from "../accountContactsService";
import Contact from "../Contact/Contact";
import css from "./css.module.css";

export default function WrapperContacts({
  errName,
  isLoading,
  isEmpty,
  accountContacts,
}: Props) {
  return (
    <div className={css.wrapper}>
      {errName && <span className={css.error}>{errName} 👀</span>}

      {isLoading && <Spinner />}

      {isEmpty && <span className={css.empty}>No hay contactos.</span>}

      {accountContacts?.records.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </div>
  );
}

type Props = {
  errName?: string;
  isLoading: boolean;
  isEmpty: boolean;
  accountContacts?: AccountContacts;
};
