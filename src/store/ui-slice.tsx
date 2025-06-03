import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./index";

type AuthView = "auth" | "registration";

interface UIState {
  authView: AuthView;
  authLinkIsVisible: boolean;
}

const initialState: UIState = {
  authView: "auth",
  authLinkIsVisible: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showRegistration(state) {
      state.authView = "registration";
    },
    showAuth(state) {
      state.authView = "auth";
    },
    showAuthLink(state) {
      state.authLinkIsVisible = true;
    },
    hideAuthLink(state) {
      state.authLinkIsVisible = false;
    },
  },
});

export const selectAuthView = (state: RootState) => state.ui.authView;
export const selectAuthLinkIsVisible = (state: RootState) =>
  state.ui.authLinkIsVisible;

export const uiActions = uiSlice.actions;

export default uiSlice;
