import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { refreshTokenService } from "./refreshTokenService";

type Auth = {
  token: null | string;
  getTokenPayload: () => TokenPayload | void;
  removeToken: () => void;
  updateToken: (token: string) => void;
  refreshToken: (signal: AbortSignal) => void;
};

export const useAuth = create<Auth>()(
  devtools(
    (set, get) => ({
      token: null,
      removeToken: () => {
        set({ token: null });
        localStorage.removeItem("token");
      },
      updateToken: (token: string) => {
        set({ token });
        localStorage.setItem("token", token);
      },
      getTokenPayload() {
        const { token } = get();
        if (!token) return;
        return jwtDecode(token);
      },
      refreshToken: async (signal: AbortSignal) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
          const infoToken = jwtDecode(token) as TokenPayload;
          const currentTime = Math.floor(Date.now() / 1000);
          const daysInSeconds = 3 * 24 * 60 * 60;
          const isTimeToRefresh = currentTime - infoToken.iat > daysInSeconds;

          const { updateToken } = get();
          if (!isTimeToRefresh) return updateToken(token);

          const { token: newToken } = await refreshTokenService({
            signal,
            payload: token,
          });
          return updateToken(newToken);
        } catch {
          const { removeToken } = get();
          return removeToken();
        }
      },
    }),
    { name: "auth" }
  )
);

type TokenPayload = {
  id: string;
  name: string;
  role: Role;
  img: string;
  iat: number;
};

enum Role {
  client = "CLIENT",
  admin = "ADMIN",
}
