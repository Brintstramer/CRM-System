import { createAsyncThunk } from "@reduxjs/toolkit";
import { MetaResponse, User, UserFilters } from "../../types/users";
import { api } from "../../api/api";
import { handleAxiosError } from "../../utils/axiosError";

export const fetchUsers = createAsyncThunk<
  MetaResponse<User>,
  UserFilters,
  { rejectValue: string }
>("users/fetchUsers", async (filters: UserFilters, { rejectWithValue }) => {
  try {
    const { data } = await api.get<MetaResponse<User>>("/admin/users", { params: filters });
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error, "Ошибка при получении данных о пользователях"));
  }
});
