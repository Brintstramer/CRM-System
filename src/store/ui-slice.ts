import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

type ProfileView = "auth" | "registration" | "userData";

interface UIState {
  profileView: ProfileView;
  authLinkIsVisible: boolean;
}

const initialState: UIState = {
  profileView: "auth",
  authLinkIsVisible: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // showRegistration(state) {
    //   state.profileView = "registration";
    // },
    // showAuth(state) {
    //   state.profileView = "auth";
    // },
    // showUserData(state) {
    //   state.profileView = "userData";
    // },
    setProfileView(state, action: PayloadAction<ProfileView>) {
      state.profileView = action.payload;
    },
    showAuthLink(state) {
      state.authLinkIsVisible = true;
    },
    hideAuthLink(state) {
      state.authLinkIsVisible = false;
    },
  },
});

export const selectProfileView = (state: RootState) => state.ui.profileView;
export const selectAuthLinkIsVisible = (state: RootState) =>
  state.ui.authLinkIsVisible;

export const uiActions = uiSlice.actions;

export default uiSlice;
