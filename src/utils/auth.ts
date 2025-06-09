import { Token } from "../types/types";

export const tokens = {
  get access(): string | null {
    return localStorage.getItem("accessToken");
  },
  get refresh(): string | null {
    return localStorage.getItem("refreshToken");
  },
  set(data: Token): void {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  },
  clear(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};
