import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  authLinkIsVisible: boolean;
}

const initialState: UIState = {
  authLinkIsVisible: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showAuthLink(state) {
      state.authLinkIsVisible = true;
    },
    hideAuthLink(state) {
      state.authLinkIsVisible = false;
    },
  },
});

export const { showAuthLink, hideAuthLink } = uiSlice.actions;

export default uiSlice.reducer;
