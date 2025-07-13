import axios from "axios";
import { setupInterceptors } from "./interceptors";

export const api = axios.create({
  baseURL: "https://easydev.club/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(api);
