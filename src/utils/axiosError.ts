import axios from "axios";

export const handleAxiosError = (error: unknown, fallback = "Произошла ошибка") => {
  if (axios.isAxiosError(error)) {
    return error.response?.data || error.message || fallback;
  }
};
