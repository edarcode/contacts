import { useEffect, useState } from "react";
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
import { deleteImg } from "../../../../services/deleteImg";

export default function DeleteContact({ contact, closeForm }: Props) {
  const [isDeletingImg, setIsDeletingImg] = useState(false);
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
      onSubmit={async (e) => {
        e.preventDefault();
        if (!token || !contact.id) return;

        if (contact.img) {
          setIsDeletingImg(true);
          try {
            await deleteImg(contact.img);
          } catch (err) {
            console.log(err);
          } finally {
            setIsDeletingImg(false);
          }
        }

        startFetch({ id: contact.id, token });
      }}
    >
      <span className={css.msg}>
        ¿Deseas eliminar a <strong className={css.name}>{contact.name}</strong>?
      </span>

      <Btn
        className={css.delete}
        disabled={!token || !contact.id || loading || !!res || isDeletingImg}
        err={!!err}
        loading={loading || isDeletingImg}
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
