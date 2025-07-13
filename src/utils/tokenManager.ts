import { Token } from "../types/auth";

class TokenManager {
  #accessToken: string | null = null;

  setAccessToken(tokens: Token): void {
    this.#accessToken = tokens.accessToken;
  }

  getAccessToken(): string | null {
    return this.#accessToken;
  }

  clearTokens(): void {
    this.#accessToken = null;
    localStorage.removeItem("refreshToken");
  }
}

export const tokenManager = new TokenManager();
