import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalAction, User } from "../../types/users";

interface ModalState {
  open: boolean;
  action: ModalAction | null;
  user: User | null;
}

const initialState: ModalState = {
  open: false,
  action: null,
  user: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ user: User; action: ModalAction }>) => {
      state.open = true;
      state.action = action.payload.action;
      state.user = action.payload.user;
    },
    closeModal: (state) => {
      state.open = false;
      state.action = null;
      state.user = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
