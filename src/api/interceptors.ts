import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import store from "../store";
import { refreshAccessToken } from "../store/thunks";
import { Token } from "../types/types.ts";

let refreshTokenPromise: Promise<Token> | null = null;

const getRefreshToken = async (): Promise<Token> => {
  if (!refreshTokenPromise) {
    refreshTokenPromise = store
      .dispatch(refreshAccessToken())
      .unwrap()
      .finally(() => {
        refreshTokenPromise = null;
      });
  }

  return refreshTokenPromise;
};

export const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken = store.getState().auth.accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry: boolean;
      };

      if (
        error.config?.url?.includes("auth/signin") ||
        error.config?.url?.includes("auth/refresh")
      ) {
        return Promise.reject(error);
      }
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newTokens = await getRefreshToken();
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          }
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
};
