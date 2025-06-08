import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import authSlice from "./auth-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
