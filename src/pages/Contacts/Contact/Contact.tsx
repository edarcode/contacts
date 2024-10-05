import { Contact as ContactType } from "../accountContactsService";
import css from "./css.module.css";
import defaultImg from "../Contact/profile.svg";
import { Delete } from "./icons/Delete";
import { Edit } from "./icons/Edit";

export default function Contact({ contact }: Props) {
  const { img, name, tell } = contact;

  return (
    <article className={css.contact}>
      <img className={css.img} src={img ?? defaultImg} alt={name} />
      <span className={css.name}>{name}</span>
      <span className={css.tell}>{tell}</span>
      <Edit className={css.edit} />
      <Delete className={css.delete} />
    </article>
  );
}

type Props = {
  contact: ContactType;
};
