import { createAsyncThunk } from "@reduxjs/toolkit";
import { MetaResponse, User, UserFilters, UserRequest, UserRolesRequest } from "../../types/users";
import { api } from "../../api/api";
import { handleAxiosError } from "../../utils/axiosError";

interface UpdateUserArgs {
  id: string;
  data: UserRequest;
}

interface updateRoleArgs {
  id: number;
  data: UserRolesRequest;
}

export const fetchUsers = createAsyncThunk<
  MetaResponse<User>,
  UserFilters,
  { rejectValue: string }
>("users/fetchUsers", async (filters, { rejectWithValue }) => {
  try {
    const { data } = await api.get<MetaResponse<User>>("/admin/users", {
      params: { ...filters },
    });
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error, "Ошибка при получении данных пользователей"));
  }
});

export const fetchUser = createAsyncThunk<User, string, { rejectValue: string }>(
  "users/fetchUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get<User>(`admin/users/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error, "Ошибка при получение данных пользователя"));
    }
  },
);

export const updateUser = createAsyncThunk<User, UpdateUserArgs, { rejectValue: string }>(
  "users/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`admin/users/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error, "Ошибка при обновлении дынных пользователя"));
    }
  },
);

export const deleteUser = createAsyncThunk<void, number, { rejectValue: string }>(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`admin/users/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error, "Ошибка при удалении пользователя"));
    }
  },
);

export const blockUser = createAsyncThunk<User, number, { rejectValue: string }>(
  "users/blockUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`admin/users/${id}/block`);
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error, "Ошибка при блокировке пользователя"));
    }
  },
);

export const unblockUser = createAsyncThunk<User, number, { rejectValue: string }>(
  "users/unblockUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`admin/users/${id}/unblock`);
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error, "Ошибка при разблокировке пользователя"));
    }
  },
);

export const updateRole = createAsyncThunk<User, updateRoleArgs, { rejectValue: string }>(
  "users/updateRole",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`admin/users/${id}/rights`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error, "Ошибка при изменении роли пользователя"));
    }
  },
);
