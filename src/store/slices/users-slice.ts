import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserFilters } from "../../types/users";
import {
  blockUser,
  deleteUser,
  fetchUser,
  fetchUsers,
  unblockUser,
  updateRole,
  updateUser,
} from "../thunks/users-thunk";

interface UsersState {
  users: User[];
  total: number;
  filters: UserFilters;
  user: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UsersState = {
  users: [],
  total: 0,
  filters: {
    search: "",
    sortBy: undefined,
    sortOrder: undefined,
    isBlocked: undefined,
    offset: 0,
    limit: 20,
  },
  user: null,
  loading: false,
  error: null,
  success: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<UserFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError(state) {
      state.error = null;
    },
    resetSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // получение всех пользователей
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data ?? [];
        state.total = action.payload.meta.totalAmount ?? 0;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при получении данных пользователей";
      })
      // получение конкретного пользователя
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload ?? "Ошибка при получении данных пользователя";
      })
      // обновление конкретного пользователя
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при обновлении данных пользователя";
      })
      // удаление пользователя
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.meta.arg);
        state.total = Math.max(0, state.total - 1);
        state.success = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при удалении пользователя";
      })
      // блокировка пользователя
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const user = state.users.find((u) => u.id === action.payload.id);
        if (user) {
          user.isBlocked = action.payload.isBlocked;
        }
        state.loading = false;
        state.success = true;
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при блокировке пользователя";
      })

      // .addCase(blockUser.pending, (state, action) => {
      //   const user = state.users.find((u) => u.id === action.meta.arg);
      //   if (user) {
      //     user.isBlocked = true;
      //   }
      //   if (state.user?.id === action.meta.arg) {
      //     state.user.isBlocked = true;
      //   }
      //   state.error = null;
      // })

      // разблокировка пользователя
      .addCase(unblockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        const user = state.users.find((u) => u.id === action.payload.id);
        if (user) {
          user.isBlocked = action.payload.isBlocked;
        }
        state.loading = false;
        state.success = true;
      })
      .addCase(unblockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при разблокировке пользователя";
      })
      // изменение роли пользователя
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const user = state.users.find((u) => u.id === action.payload.id);
        if (user) {
          user.roles = action.payload.roles;
        }
        state.loading = false;
        state.success = true;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при изменении роли пользователя";
      });
  },
});

export const { setFilters, resetSuccess, clearError } = usersSlice.actions;
export default usersSlice.reducer;
