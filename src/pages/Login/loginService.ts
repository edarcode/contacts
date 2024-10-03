import { CONTACTS_BACK_URL } from "../../consts/urls";
import { EdarErr } from "../../errors/EdarErr";
import { Fetch } from "../../hooks/useFetch";

export const loginService: LoginService = async (params) => {
  const { signal, payload } = params;

  const res = await fetch(CONTACTS_BACK_URL.login, {
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
      msg: "Err al iniciar sessión.",
    });
  }

  return await res.json();
};

type LoginService = Fetch<LoginPayload, LoginRes>;
export type LoginPayload = { email: string; password: string };
export type LoginRes = { token: string };
