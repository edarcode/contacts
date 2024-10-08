import { useForm } from "react-hook-form";
import Btn from "../../../components/buttons/Btn/Btn";
import { Cross } from "../../../components/icons/Cross";
import css from "./css.module.css";
import {
  AddContactPayload,
  AddContactRes,
  addContactService,
} from "./addContactService";
import { addContactSchema } from "./addContactSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import defaultImg from "./profile.svg";
import { useFetch } from "../../../hooks/useFetch";
import { useAuth } from "../../../auth/useAuth";
import { useEffect } from "react";
import { useAccountContactsState } from "../useAccountContactsState";
import InputText from "../../../components/inputs/InputText/InputText";
import InputTel from "../../../components/inputs/InputTel/InputTel";

export default function AddContact({ closeForm }: Props) {
  const token = useAuth((auth) => auth.token);
  const refetchAccountContacts = useAccountContactsState(
    (state) => state.refetchAccountContacts
  );

  const { res, startFetch, loading, err } = useFetch<
    AddContactPayload,
    AddContactRes
  >(addContactService);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddContactForm>({
    resolver: zodResolver(addContactSchema),
  });

  const onSubmit = ({ name, tell }: AddContactForm) => {
    if (!token) return;

    startFetch({ token, name, tell });
  };

  useEffect(() => {
    if (!res || !refetchAccountContacts) return;
    closeForm();
    refetchAccountContacts();
  }, [res, closeForm, refetchAccountContacts]);

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <Cross className={css.cross} onClick={closeForm} />

      <div className={css.wrapper}>
        <div className={css.wrapperImg}>
          <img className={css.img} src={defaultImg} alt="Inserta una imagen" />
          <input className={css.inputFile} type="file" {...register("img")} />
        </div>
        <InputText
          className={css.name}
          {...register("name")}
          placeholder="Nombre"
          err={errors.name?.message}
        />

        <InputTel
          className={css.tell}
          {...register("tell")}
          placeholder="+57 3332221100"
          err={errors.tell?.message}
        />

        <Btn
          className={css.add}
          disabled={!!Object.keys(errors).length || loading || !!res}
          loading={loading}
          err={!!err}
        >
          Guardar contacto
        </Btn>
      </div>
    </form>
  );
}

type Props = {
  closeForm: () => void;
};

type AddContactForm = z.infer<typeof addContactSchema>;
