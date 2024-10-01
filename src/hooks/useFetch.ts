import { useEffect, useState } from "react";
import { EdarErr } from "../errors/EdarErr";

const initFetchState = {
  err: undefined,
  loading: false,
  payload: undefined,
  data: undefined,
};

export const useFetch = <Payload, Data>(fetch: Fetch<Payload, Data>) => {
  const [fetchState, setFetchState] =
    useState<FetchState<Payload, Data>>(initFetchState);

  const { err, loading, payload, data } = fetchState;

  useEffect(() => {
    if (!loading) return;
    const controller = new AbortController();

    fetch({ signal: controller.signal, payload })
      .then((data) => setFetchState({ ...initFetchState, data }))
      .catch((err: EdarErr) => setFetchState({ ...initFetchState, err }));

    return () => controller.abort();
  }, [fetch, loading, payload]);

  const startFetch = (payload?: Payload) => {
    setFetchState({ ...initFetchState, payload, loading: true });
  };

  return { data, loading, err, startFetch };
};

export type Fetch<Payload, Data> = (
  params: FetchParams<Payload>
) => Promise<Data>;

type FetchParams<Payload> = {
  signal: AbortSignal;
  payload?: Payload;
};

type FetchState<Payload, Data> = {
  err: EdarErr | undefined;
  loading: boolean;
  payload: Payload | undefined;
  data: Data | undefined;
};
