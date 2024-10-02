import { useEffect, useState } from "react";
import { EdarErr } from "../errors/EdarErr";

const initFetchState = {
  err: undefined,
  loading: false,
  payload: undefined,
  res: undefined,
};

export const useFetch = <Payload, Res>(fetch: Fetch<Payload, Res>) => {
  const [fetchState, setFetchState] =
    useState<FetchState<Payload, Res>>(initFetchState);

  useEffect(() => {
    if (!fetchState.loading) return;

    const controller = new AbortController();

    fetch({ signal: controller.signal, payload: fetchState.payload })
      .then((res) => setFetchState({ ...initFetchState, res }))
      .catch((err: EdarErr) => setFetchState({ ...initFetchState, err }));

    return () => controller.abort();
  }, [fetch, fetchState]);

  const startFetch = (payload?: Payload) => {
    setFetchState({ ...initFetchState, payload, loading: true });
  };

  return {
    res: fetchState.res,
    loading: fetchState.loading,
    err: fetchState.err,
    startFetch,
  };
};

export type Fetch<Payload, Res> = (
  params: FetchParams<Payload>
) => Promise<Res>;

type FetchParams<Payload> = {
  signal: AbortSignal;
  payload?: Payload;
};

type FetchState<Payload, Res> = {
  err: EdarErr | undefined;
  loading: boolean;
  payload: Payload | undefined;
  res: Res | undefined;
};
