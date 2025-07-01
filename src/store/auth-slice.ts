import { createSlice } from "@reduxjs/toolkit";
import { ProfileRequest } from "../types/types";
import { getUserData, loginUser, refreshAccessToken, registerUser } from "./thunks";
import { tokenManager } from "../utils/tokenManager";

interface InitialState {
  userData: ProfileRequest | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: InitialState = {
  userData: null,
  isAuth: false,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      tokenManager.clearTokens();
      state.userData = null;
      state.isAuth = false;
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
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при регистрации";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuth = true;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при авторизации";
        state.isAuth = false;
      })
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Сессия закончилась. Пройдите авторизацию заново.";
        state.userData = null;
        state.isAuth = false;
      })
      .addCase(refreshAccessToken.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.payload ?? "Сессия закончилась. Пройдите авторизацию заново.";
      });
  },
});

export const { logout, clearError, resetSuccess } = authSlice.actions;
export default authSlice.reducer;
