import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import store from "../store";
import { refreshAccessToken } from "../store/thunks/auth-thunk.ts";
import { Token } from "../types/auth.ts";
import { tokenManager } from "../utils/tokenManager.ts";

let refreshTokenPromise: Promise<Token> | null = null;

const getRefreshToken = async (): Promise<Token> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("Нет refresh токена");
  if (!refreshTokenPromise) {
    refreshTokenPromise = store
      .dispatch(refreshAccessToken({ refreshToken }))
      .unwrap()
      .finally(() => {
        refreshTokenPromise = null;
      });
  }

  return refreshTokenPromise;
};

export const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = tokenManager.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry: boolean;
      };

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        error.config?.url?.includes("auth/signin") &&
        error.config?.url?.includes("auth/refresh")
      ) {
        originalRequest._retry = true;
        try {
          const newTokens = await getRefreshToken();
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
};
