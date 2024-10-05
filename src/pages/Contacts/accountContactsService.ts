import { CONTACTS_BACK_URL } from "../../consts/urls";
import { EdarErr } from "../../errors/EdarErr";

export const accountContactsService = async ({
  signal,
  token,
}: Params): Promise<AccountContacts | undefined> => {
  if (!token) return;

  const res = await fetch(CONTACTS_BACK_URL.accountContacts, {
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new EdarErr({
      status: res.status,
      msg: "Err al consultar contactos",
    });
  }

  return await res.json();
};

type Params = {
  signal: AbortSignal;
  token?: string | null;
};

interface Contact {
  id: string;
  name: string;
  img: string | null;
  tell: string;
}

interface AccountContacts {
  limit: number;
  page: number;
  records: Contact[];
  totalPages: number;
}
