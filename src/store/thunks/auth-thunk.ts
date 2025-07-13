import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthData,
  Profile,
  ProfileRequest,
  RefreshToken,
  Token,
  UserRegistration,
} from "../../types/auth";
import { api } from "../../api/api";
import { handleAxiosError } from "../../utils/axiosError";
import { tokenManager } from "../../utils/tokenManager";

export const registerUser = createAsyncThunk<Profile, UserRegistration, { rejectValue: string }>(
  "auth/register",
  async (userRegistration, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/signup", userRegistration);
      return data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Ошибка регистрации");
      if (errorMessage.includes("409")) {
        return rejectWithValue("Такой логин уже существует");
      }
      return rejectWithValue(errorMessage);
    }
  },
);

export const loginUser = createAsyncThunk<Token, AuthData, { rejectValue: string }>(
  "auth/login",
  async (authData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/signin", authData);
      tokenManager.setAccessToken(data);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Ошибка авторизации");
      if (errorMessage.includes("401")) {
        return rejectWithValue("Неверные логин или пароль");
      }
      return rejectWithValue(errorMessage);
    }
  },
);

export const getUserData = createAsyncThunk<ProfileRequest, void, { rejectValue: string }>(
  "auth/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/profile");
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error, "Ошибка получения данных пользователя"));
    }
  },
);

export const refreshAccessToken = createAsyncThunk<Token, RefreshToken, { rejectValue: string }>(
  "auth/refreshToken",
  async (refreshToken, { rejectWithValue }) => {
    if (!refreshToken) return;
    try {
      const { data } = await api.post("/auth/refresh", refreshToken);
      tokenManager.setAccessToken(data);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error, "Сессия закончена, авторизуйтесь заново"));
    }
  },
);
