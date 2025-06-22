import { createSlice } from "@reduxjs/toolkit";
import { ProfileRequest } from "../types/types";
import { getUserData, loginUser, refreshAccessToken, registerUser } from "./thunks";

interface InitialState {
  loading: boolean;
  userData: ProfileRequest | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  success: boolean;
}

const initialState: InitialState = {
  loading: false,
  userData: null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.loading = false;
      state.userData = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "Ошибка при регистрации";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "Ошибка при авторизации";
      })
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData = payload;
      })
      .addCase(getUserData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "Сессия закончилась. Пройдите авторизацию заново.";
      })
      .addCase(refreshAccessToken.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      })
      .addCase(refreshAccessToken.rejected, (state, { payload }) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.userData = null;
        state.error = payload ?? "Сессия закончилась. Пройдите авторизацию заново.";
      });
  },
});

export const { logout, clearError, resetSuccess } = authSlice.actions;
export default authSlice.reducer;
