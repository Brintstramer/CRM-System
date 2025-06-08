import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { Token } from "../types/types";
import { clearTokens, saveTokens } from "../utils/auth";

export const setupInterceptors = (api: AxiosInstance) => {
  const getAccessToken = (): string | null => {
    return (
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken")
    );
  };

  const getRefreshToken = (): string | null => {
    return (
      localStorage.getItem("refreshToken") ||
      sessionStorage.getItem("refreshToken")
    );
  };

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry: boolean;
      };

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        getRefreshToken()
      ) {
        originalRequest._retry = true;

        try {
          const response = await api.post<Token>("/auth/refresh", {
            refreshToken: getRefreshToken(),
          });

          const { accessToken, refreshToken } = response.data;
          const remember = localStorage.getItem("refreshToken") !== null;
          saveTokens({ accessToken, refreshToken }, remember);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Ошибка обновления токена:", refreshError);
          clearTokens();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
