import { Token } from "../types/types";

const createTokenManager = () => {
  let accessToken: string | null;

  return {
    setAccessToken(tokens: Token) {
      accessToken = tokens.accessToken;
    },
    getAccessToken() {
      return accessToken;
    },
    clearTokens() {
      accessToken = null;
      localStorage.removeItem("refreshToken");
    },
  };
};

export const tokenManager = createTokenManager();
