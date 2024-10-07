import css from "./css.module.css";
import defaultImg from "../profile.svg";
import { Cross } from "../../../../components/icons/Cross";
import { Check } from "../../../../components/icons/Check";
import { Contact } from "../../accountContactsService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editContactSchema } from "./editContactSchema";
import { z } from "zod";

export default function EditContact({ contact, closeForm }: Props) {
  const { img, name, tell } = contact;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditContactForm>({ resolver: zodResolver(editContactSchema) });

  console.log(errors);

  const onSubmit = (data: EditContactForm) => {
    console.log(data);
  };

  return (
    <form className={css.edit} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.wrapperImg}>
        <img className={css.img} src={img ?? defaultImg} alt={name} />
        <input className={css.inputFile} type="file" {...register("img")} />
      </div>
      <input
        className={css.name}
        type="text"
        defaultValue={name}
        {...register("name")}
      />
      <input
        className={css.tell}
        type="tel"
        defaultValue={tell}
        {...register("tell")}
      />
      <Cross className={css.close} onClick={closeForm} />
      <button type="submit">
        <Check className={css.save} />
      </button>
    </form>
  );
}

type Props = {
  contact: Contact;
  closeForm: () => void;
};

type EditContactForm = z.infer<typeof editContactSchema>;
