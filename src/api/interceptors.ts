import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import store from "../store";
import { refreshAccessToken } from "../store/thunks";
import { logout } from "../store/auth-slice";
import { setProfileView } from "../store/ui-slice";

export const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken =
        localStorage.getItem("accessToken") ||
        store.getState().auth.accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
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
        error.config?.url?.includes("auth/signin") ||
        error.config?.url?.includes("auth/refresh")
      ) {
        return Promise.reject(error);
      }
      if (error.response?.status === 401 && !originalRequest._retry) {
        console.log(error.response);
        originalRequest._retry = true;
        try {
          const newAccessToken = await store
            .dispatch(refreshAccessToken())
            .unwrap();
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Ошибка обновления токена:", refreshError);
          store.dispatch(logout());
          store.dispatch(setProfileView("auth"));
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
