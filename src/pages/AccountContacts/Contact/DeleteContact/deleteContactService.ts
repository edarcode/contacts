import { CONTACTS_BACK_URL } from "../../../../consts/urls";
import { EdarErr } from "../../../../errors/EdarErr";
import { Fetch } from "../../../../hooks/useFetch";

export const deleteContactService: Fetch<
  DeleteContactPayload,
  DeleteContactRes
> = async ({ signal, payload }) => {
  if (!payload) return;

  const { token, id } = payload;

  if (!token || !id) return;

  const res = await fetch(CONTACTS_BACK_URL.deleteContact + `/${id}`, {
    signal,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new EdarErr({
      status: res.status,
      msg: "Err al eliminar contacto",
    });
  }

  return await res.json();
};

export type DeleteContactPayload = {
  token?: string | null;
  id: string;
};

export type DeleteContactRes = {
  msg: string;
};
