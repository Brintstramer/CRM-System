import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const { setProfileView, showAuthLink, hideAuthLink } = uiSlice.actions;

export default uiSlice.reducer;
