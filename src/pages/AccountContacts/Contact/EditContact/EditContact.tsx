import css from "./css.module.css";
import defaultImg from "../profile.svg";
import { Cross } from "../../../../components/icons/Cross";
import { Check } from "../../../../components/icons/Check";
import { Contact } from "../../accountContactsService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editContactSchema } from "./editContactSchema";
import { z } from "zod";
import { useFetch } from "../../../../hooks/useFetch";
import {
  editContactService,
  EditContactPayload,
  EditContactRes,
} from "./editContactService";
import { useAuth } from "../../../../auth/useAuth";
import { useEffect, useState } from "react";
import { useAccountContactsState } from "../../useAccountContactsState";
import Button from "../../../../components/buttons/Button/Button";
import { uploadImg } from "../../../../services/uploadImg";

export default function EditContact({ contact, closeForm }: Props) {
  const { img, name, tell, id } = contact;

  const [isUploadingImg, setIsUploadingImg] = useState(false);

  const { res, startFetch, loading, err } = useFetch<
    EditContactPayload,
    EditContactRes
  >(editContactService);

  const token = useAuth((auth) => auth.token);

  const refetchAccountContacts = useAccountContactsState(
    (state) => state.refetchAccountContacts
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EditContactForm>({
    resolver: zodResolver(editContactSchema),
    defaultValues: { name, tell },
  });

  const form = watch();
  const isSameContactWithForm =
    form.name === name && form.tell === tell && !form.img?.length;

  useEffect(() => {
    if (!res || !refetchAccountContacts) return;
    closeForm();
    refetchAccountContacts();
  }, [res, closeForm, refetchAccountContacts]);

  const onSubmit = async ({ name, tell, img }: EditContactForm) => {
    if (isSameContactWithForm) return;

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

    startFetch({ name, tell, token, id, img: imgUrl });
  };

  return (
    <form className={css.edit} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.wrapperImg}>
        <img className={css.img} src={img ?? defaultImg} alt={name} />
        <input className={css.inputFile} type="file" {...register("img")} />
      </div>
      <input className={css.name} type="text" {...register("name")} />
      <input className={css.tell} type="tel" {...register("tell")} />
      <Cross className={css.close} onClick={closeForm} />
      <Button
        className={css.btn}
        disabled={
          !!Object.keys(errors).length ||
          isSameContactWithForm ||
          loading ||
          !!res ||
          isUploadingImg
        }
        loading={loading || isUploadingImg}
        err={!!err}
      >
        <Check className={css.save} />
      </Button>
    </form>
  );
}

type Props = {
  contact: Contact;
  closeForm: () => void;
};

type EditContactForm = z.infer<typeof editContactSchema>;
