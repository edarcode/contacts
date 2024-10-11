import { CONTACTS_BACK_URL } from "../../../../consts/urls";
import { EdarErr } from "../../../../errors/EdarErr";
import { Fetch } from "../../../../hooks/useFetch";

export const editContactService: Fetch<
  EditContactPayload,
  EditContactRes
> = async ({ signal, payload }) => {
  if (!payload) return;
  const { name, img, tell, token, id } = payload;

  if (!token || !id) return;

  const res = await fetch(CONTACTS_BACK_URL.editcontact + `/${id}`, {
    signal,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      name: name?.toLowerCase(),
      tell: tell?.replace("*", " "),
      img,
    }),
  });

  if (!res.ok) {
    throw new EdarErr({
      status: res.status,
      msg: "Err al editar contacto",
    });
  }

  return await res.json();
};

export type EditContactPayload = {
  token?: string | null;
  name?: string;
  tell?: string;
  img?: string;
  id: string;
};

export type EditContactRes = {
  msg: string;
};
