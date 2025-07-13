import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserFilters } from "../../types/users";
import { fetchUsers } from "../thunks/users-thunk";

interface UsersState {
  users: User[];
  total: number;
  loading: boolean;
  filters: UserFilters;
}

const initialState: UsersState = {
  users: [],
  total: 0,
  loading: false,
  filters: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<UserFilters>) {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.total = action.payload.meta.totalAmount;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilters } = usersSlice.actions;
export default usersSlice.reducer;
