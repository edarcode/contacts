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
import { useEffect, useState } from "react";
import { useAccountContactsState } from "../useAccountContactsState";
import InputText from "../../../components/inputs/InputText/InputText";
import InputTel from "../../../components/inputs/InputTel/InputTel";
import { uploadImg } from "../../../services/uploadImg";

export default function AddContact({ closeForm }: Props) {
  const [isUploadingImg, setIsUploadingImg] = useState(false);
  const token = useAuth((auth) => auth.token);
  const refetchAccountContacts = useAccountContactsState(
    (state) => state.refetchAccountContacts
  );

  const { res, loading, err, startFetch } = useFetch<
    AddContactPayload,
    AddContactRes
  >(addContactService);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AddContactForm>({
    resolver: zodResolver(addContactSchema),
  });

  useEffect(() => {
    if (!res || !refetchAccountContacts) return;
    closeForm();
    refetchAccountContacts();
  }, [res, closeForm, refetchAccountContacts]);

  const onSubmit = async ({ img, name, tell }: AddContactForm) => {
    if (!token) return;

    let imgUrl;
    if (img) {
      setIsUploadingImg(true);
      try {
        imgUrl = await uploadImg(img);
      } catch (error) {
        console.log(error);
      } finally {
        setIsUploadingImg(false);
      }
    }

    startFetch({ token, name, tell, img: imgUrl });
  };

  const file = watch()?.img?.[0];

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <Cross className={css.cross} onClick={closeForm} />

      <div className={css.wrapper}>
        <div className={css.wrapperImg}>
          <img
            className={css.img}
            src={file ? URL.createObjectURL(file) : defaultImg}
            alt="Inserta una imagen"
          />
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
          placeholder="+57*3332221100"
          err={errors.tell?.message}
        />

        <Btn
          className={css.add}
          disabled={
            !!Object.keys(errors).length || loading || !!res || isUploadingImg
          }
          loading={loading || isUploadingImg}
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
