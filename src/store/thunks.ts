import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthData,
  Profile,
  ProfileRequest,
  Token,
  UserRegistration,
} from "../types/types";
import { api } from "../api/api";
import { RootState } from ".";
import { handleAxiosError } from "../utils/axiosError";

export const registerUser = createAsyncThunk<
  Profile,
  UserRegistration,
  { rejectValue: string }
>("auth/register", async (userRegistration, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/signup", userRegistration);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error, "Ошибка регистрации"));
  }
});

export const loginUser = createAsyncThunk<
  Token,
  AuthData,
  { rejectValue: string }
>("auth/login", async (authData, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/signin", authData);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  } catch (error) {
    const errorMessage = handleAxiosError(error, "Ошибка авторизации");
    if (errorMessage.includes("401")) {
      return rejectWithValue("Неверные логин или пароль");
    }

    return rejectWithValue(errorMessage);
  }
});

export const getUserData = createAsyncThunk<
  ProfileRequest,
  void,
  { state: RootState; rejectValue: string }
>("auth/getUserData", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/user/profile");
    return data;
  } catch (error) {
    return rejectWithValue(
      handleAxiosError(error, "Ошибка получения данных пользователя")
    );
  }
});

export const refreshAccessToken = createAsyncThunk<
  string,
  void,
  { state: RootState; rejectValue: string }
>("auth/refreshToken", async (_, { getState, rejectWithValue }) => {
  const { refreshToken } = getState().auth;

  if (!refreshToken) {
    return rejectWithValue("Рефреш токен отсутствут");
  }

  try {
    const { data } = await api.post("/auth/refresh", { refreshToken });
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data.accessToken;
  } catch (error) {
    return rejectWithValue("Сессия закончена, авторизуйтесь заново");
  }
});
