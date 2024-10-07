import { useEffect } from "react";
import { useAuth } from "../../../../auth/useAuth";
import { useFetch } from "../../../../hooks/useFetch";
import { Contact } from "../../accountContactsService";
import Btn from "./Btn/Btn";
import css from "./css.module.css";
import {
  DeleteContactPayload,
  DeleteContactRes,
  deleteContactService,
} from "./deleteContactService";
import { useAccountContactsState } from "../../useAccountContactsState";

export default function DeleteContact({ contact, closeForm }: Props) {
  const token = useAuth((auth) => auth.token);
  const refetchAccountContacts = useAccountContactsState(
    (state) => state.refetchAccountContacts
  );

  const { startFetch, res, loading, err } = useFetch<
    DeleteContactPayload,
    DeleteContactRes
  >(deleteContactService);

  useEffect(() => {
    if (!res || !refetchAccountContacts) return;
    closeForm();
    refetchAccountContacts();
  }, [closeForm, res, refetchAccountContacts]);

  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (!token || !contact.id) return;

        startFetch({ id: contact.id, token });
      }}
    >
      <span className={css.msg}>
        ¿Seguro que deseas eliminar a{" "}
        <strong className={css.name}>{contact.name}</strong>?
      </span>

      <Btn
        className={css.delete}
        disabled={!token || !contact.id || loading || !!res}
        err={!!err}
        loading={loading}
      >
        Eliminar
      </Btn>

      <Btn type="button" className={css.noDelete} onClick={closeForm}>
        Atras
      </Btn>
    </form>
  );
}

type Props = {
  contact: Contact;
  closeForm: () => void;
};
