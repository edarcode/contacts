import { CONTACTS_BACK_URL } from "../../consts/urls";
import { EdarErr } from "../../errors/EdarErr";

export const accountContactsService = async ({
  signal,
  token,
  page,
  limit,
  name,
}: Params): Promise<AccountContacts | undefined> => {
  if (!token) return;

  const url = new URL(CONTACTS_BACK_URL.accountContacts);
  if (page) url.searchParams.append("page", `${page}`);
  if (limit) url.searchParams.append("limit", `${limit}`);
  if (name) url.searchParams.append("name", name);

  const res = await fetch(url, {
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
  page?: number;
  limit?: number;
  name?: string;
};

export type Contact = {
  id: string;
  name: string;
  img: string | null;
  tell: string;
};

type AccountContacts = {
  limit: number;
  page: number;
  records: Contact[];
  totalPages: number;
};
