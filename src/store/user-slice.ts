// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./index";
// import { ProfileRequest } from "../types/types";
// import { fetchUserData } from "./thunks";

// const initialState: ProfileRequest = {
//   username: "",
//   email: "",
//   phoneNumber: "",
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     // getUserData(state, action: PayloadAction<ProfileRequest>) {
//     //   return { ...state, ...action.payload };
//     // },
//   },
//   extraReducers(builder) {
//     builder.addCase(fetchUserData.fulfilled, (state, action) => {
//       return { ...state, ...action.payload };
//     });
//   },
// });

// export const selectUsername = (state: RootState) => state.user.username;
// export const selectEmail = (state: RootState) => state.user.email;
// export const selectPhoneNumber = (state: RootState) => state.user.phoneNumber;

// export const userActions = userSlice.actions;

// export default userSlice;
