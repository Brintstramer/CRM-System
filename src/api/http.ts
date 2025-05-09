import axios from "axios";
import {
  ResponseData,
  TaskType,
  TasksNumber,
  ErrorMessage,
} from "../types/types";

const BASE_URL = "https://easydev.club/api/v1/todos";

export const fetchTasks = async (
  filter: string
): Promise<ResponseData<TaskType, TasksNumber>> => {
  try {
    const response = await axios.get<ResponseData<TaskType, TasksNumber>>(
      `${BASE_URL}?filter=${filter}`
    );

    return response.data;
  } catch {
    throw new Error(ErrorMessage.FailedTaskList);
  }
};

export const addNewTask = async (title: string) => {
  try {
    await axios.post(BASE_URL, { title });
  } catch {
    throw new Error(ErrorMessage.FailedNewTask);
  }
};

export const deleteTask = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch {
    throw new Error(ErrorMessage.FailedDeleteTask);
  }
};

export const changeTaskStatus = async (id: number, status: boolean) => {
  try {
    await axios.put(`${BASE_URL}/${id}`, { isDone: !status });
  } catch {
    throw new Error(ErrorMessage.FailedChangeStatusTask);
  }
};

export const changeTaskTitle = async (id: number, title: string) => {
  try {
    await axios.put(`${BASE_URL}/${id}`, { title });
  } catch {
    throw new Error(ErrorMessage.FailedChangeTask);
  }
};
