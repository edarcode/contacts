import { CONTACTS_BACK_URL } from "../../../../consts/urls";
import { EdarErr } from "../../../../errors/EdarErr";

export const editContactService = async ({
  signal,
  token,
  name,
  tell,
  img,
}: Params) => {
  if (!token) return;

  const res = await fetch(CONTACTS_BACK_URL.editcontact, {
    signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ name, tell, img }),
  });

  if (!res.ok) {
    throw new EdarErr({
      status: res.status,
      msg: "Err al editar contacto",
    });
  }

  return await res.json();
};

type Params = {
  signal: AbortSignal;
  token?: string | null;
  name?: string;
  tell?: string;
  img?: string;
};
