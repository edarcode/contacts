import { Contact as ContactType } from "../accountContactsService";
import css from "./css.module.css";
import defaultImg from "./profile.svg";
import { Delete } from "./icons/Delete";
import { Edit } from "./icons/Edit";
import { useState } from "react";
import EditContact from "./EditContact/EditContact";
import DeleteContact from "./DeleteContact/DeleteContact";

export default function Contact({ contact }: Props) {
  const { img, name, tell } = contact;
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isEditing)
    return (
      <EditContact contact={contact} closeForm={() => setIsEditing(false)} />
    );

  if (isDeleting)
    return (
      <DeleteContact contact={contact} closeForm={() => setIsDeleting(false)} />
    );

  return (
    <article className={css.contact}>
      <img className={css.img} src={img ?? defaultImg} alt={name} />
      <span className={css.name}>{name}</span>
      <span className={css.tell}>{tell}</span>
      <Edit className={css.edit} onClick={() => setIsEditing(true)} />
      <Delete className={css.delete} onClick={() => setIsDeleting(true)} />
    </article>
  );
}

type Props = {
  contact: ContactType;
};
