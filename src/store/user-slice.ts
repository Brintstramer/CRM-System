import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface ProfileRequest {
  username: string;
  email: string;
  phoneNumber: string;
}

const initialState: ProfileRequest = {
  username: "",
  email: "",
  phoneNumber: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserData(state, action: PayloadAction<ProfileRequest>) {
      return { ...state, ...action.payload };
    },
  },
});

export const selectUsername = (state: RootState) => state.user.username;
export const selectEmail = (state: RootState) => state.user.email;
export const selectPhoneNumber = (state: RootState) => state.user.phoneNumber;

export const userActions = userSlice.actions;

export default userSlice;
