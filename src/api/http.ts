import axios from "axios";
import {
  ResponseData,
  TaskType,
  TasksNumber,
  ErrorMessage,
} from "../types/types";

const api = axios.create({
  baseURL: "https://easydev.club/api/v1/todos",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTasks = async (
  filter: string
): Promise<ResponseData<TaskType, TasksNumber>> => {
  try {
    const response = await api.get<ResponseData<TaskType, TasksNumber>>("", {
      params: { filter },
    });
    return response.data;
  } catch {
    throw new Error(ErrorMessage.FailedTaskList);
  }
};

export const addNewTask = async (title: string): Promise<void> => {
  try {
    await api.post("", { title });
  } catch {
    throw new Error(ErrorMessage.FailedNewTask);
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch {
    throw new Error(ErrorMessage.FailedDeleteTask);
  }
};

export const changeTaskStatus = async (
  id: number,
  status: boolean
): Promise<void> => {
  try {
    await api.put(`/${id}`, { isDone: !status });
  } catch {
    throw new Error(ErrorMessage.FailedChangeStatusTask);
  }
};

export const changeTaskTitle = async (
  id: number,
  title: string
): Promise<void> => {
  try {
    await api.put(`/${id}`, { title });
  } catch {
    throw new Error(ErrorMessage.FailedChangeTask);
  }
};
