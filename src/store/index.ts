import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/ui-slice";
import authSlice from "./slices/auth-slice";
import usersSlice from "./slices/users-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    auth: authSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
