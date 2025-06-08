import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { Token } from "../types/types";
import { clearTokens } from "../utils/auth";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<Token>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      clearTokens();
    },
  },
});

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const authActions = authSlice.actions;

export default authSlice;
