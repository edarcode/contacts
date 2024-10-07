import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Params = {
  refetchAccountContacts: (() => void) | null;
  saveRefetchAccountContacts: ((fn: () => void) => void) | null;
};

export const useAccountContactsState = create<Params>()(
  devtools(
    (set) => ({
      refetchAccountContacts: null,
      saveRefetchAccountContacts: (fn) => {
        set({ refetchAccountContacts: fn });
      },
    }),
    { name: "accountContacts" }
  )
);
