import { CONTACTS_BACK_URL } from "../../consts/urls";
import { EdarErr } from "../../errors/EdarErr";
import { Fetch } from "../../hooks/useFetch";

export const addContactService: Fetch<
  AddContactPayload,
  AddContactRes
> = async ({ signal, payload }) => {
  if (!payload) return;

  const { name, img, tell, token } = payload;

  if (!token) return;

  const res = await fetch(CONTACTS_BACK_URL.addContact, {
    signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ name: name.toLowerCase(), tell, img }),
  });

  if (!res.ok) {
    throw new EdarErr({
      status: res.status,
      msg: "Err al agregar contacto",
    });
  }

  return await res.json();
};

export type AddContactPayload = {
  token?: string | null;
  name: string;
  tell: string;
  img?: string;
};

export type AddContactRes = {
  msg: string;
};
