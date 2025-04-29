import {
  Filter,
  ResponseData,
  TaskType,
  TasksNumber,
  ErrorMessage,
} from "../types/types";

const BASE_URL = "https://easydev.club/api/v1/todos";

export const fetchTasks = async (
  filter: Filter
): Promise<ResponseData<TaskType, TasksNumber>> => {
  try {
    const response = await fetch(`${BASE_URL}?filter=${filter}`);

    const resData: ResponseData<TaskType, TasksNumber> = await response.json();

    return resData;
  } catch (error: unknown) {
    throw new Error(ErrorMessage.FailedTaskList);
  }
};

export const addNewTask = async (title: string) => {
  try {
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(ErrorMessage.FailedNewTask);
  }
};

export const deleteTask = async (id: number) => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(ErrorMessage.FailedDeleteTask);
  }
};

export const changeTaskStatus = async (id: number, status: boolean) => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ isDone: !status }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(ErrorMessage.FailedChangeStatusTask);
  }
};

export const changeTaskTitle = async (id: number, title: string) => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(ErrorMessage.FailedChangeTask);
  }
};
