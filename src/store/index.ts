import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/ui-slice";
import authSlice from "./slices/auth-slice";
import usersSlice from "./slices/users-slice";
import modalSlice from "./slices/modal-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    auth: authSlice,
    users: usersSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
