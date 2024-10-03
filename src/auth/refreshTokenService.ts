import { CONTACTS_BACK_URL } from "../consts/urls";
import { EdarErr } from "../errors/EdarErr";
import { Fetch } from "../hooks/useFetch";

export const refreshTokenService: RefreshTokenService = async (params) => {
  const { signal, payload: token } = params;

  if (!token) return;

  const res = await fetch(CONTACTS_BACK_URL.refreshToken, {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!res.ok)
    throw new EdarErr({ status: res.status, msg: "Err refrescando token" });

  return await res.json();
};

type RefreshTokenService = Fetch<RefreshTokenPayload, RefreshTokenRes>;
export type RefreshTokenPayload = string;
export type RefreshTokenRes = { token: string };
