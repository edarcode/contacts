import { CONTACTS_BACK_URL } from "../../consts/urls";
import { EdarErr } from "../../errors/EdarErr";
import { Fetch } from "../../hooks/useFetch";

export const registerService: RegisterFetch = async (params) => {
  const { signal, payload } = params;

  const res = await fetch(CONTACTS_BACK_URL.register, {
    signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new EdarErr({
      status: res.status,
      msg: "Err al registrar un usuario.",
    });
  }

  return await res.json();
};

type RegisterFetch = Fetch<RegisterPayload, RegisterRes>;
export type RegisterPayload = { email: string; password: string };
export type RegisterRes = { msg: string };
