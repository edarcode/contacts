import { Contact } from "../../accountContactsService";
import Btn from "./Btn/Btn";
import css from "./css.module.css";

export default function DeleteContact({ contact, closeForm }: Props) {
  return (
    <form className={css.form}>
      <span className={css.msg}>
        ¿Seguro que deseas eliminar a{" "}
        <strong className={css.name}>{contact.name}</strong>?
      </span>
      <Btn className={css.delete}>Eliminar</Btn>
      <Btn type="button" className={css.noDelete} onClick={closeForm}>
        Mejor no
      </Btn>
    </form>
  );
}

type Props = {
  contact: Contact;
  closeForm: () => void;
};
