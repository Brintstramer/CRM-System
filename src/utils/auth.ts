import { Token } from "../types/types";

export const saveTokens = (tokens: Token, remember: boolean) => {
  const storage = remember ? localStorage : sessionStorage;

  storage.setItem("accessToken", tokens.accessToken);
  storage.setItem("refreshToken", tokens.refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
};
