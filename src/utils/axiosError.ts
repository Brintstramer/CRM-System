import axios from "axios";

export const handleAxiosError = (error: unknown, fallback = "Произошла ошибка") => {
  if (axios.isAxiosError(error)) {
    console.log(error.response);
    return error.response?.data || error.message || fallback;
  }
};
