import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { Token } from "../types/types";
import { tokens } from "../utils/auth";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  accessToken: tokens.access,
  refreshToken: tokens.refresh,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<Token>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      tokens.set(action.payload);
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      tokens.clear();
    },
  },
});

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const authActions = authSlice.actions;

export default authSlice;
