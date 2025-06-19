import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { Token } from "../types/types";
import { tokens } from "../utils/auth";

export const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (tokens.access) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
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
        tokens.refresh
      ) {
        originalRequest._retry = true;

        try {
          const { data } = await api.post<Token>("/auth/refresh", {
            refreshToken: tokens.refresh,
          });
          tokens.set(data);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Ошибка обновления токена:", refreshError);
          tokens.clear();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
