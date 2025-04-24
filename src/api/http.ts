import { Filter, ResponseData, TaskType, TasksNumber } from "../types/types";

const BASE_URL = "https://easydev.club/api/v1/todos";

export const fetchTasks = async (
  filter: Filter
): Promise<ResponseData<TaskType, TasksNumber>> => {
  try {
    const response = await fetch(`${BASE_URL}?filter=${filter}`);

    // if (!response.ok) {
    //   throw new Error("Не получилось загрузить список задач.");
    // }

    const resData: ResponseData<TaskType, TasksNumber> = await response.json();

    return resData;
  } catch (error) {
    throw new Error("Не получилось загрузить список задач.");
  }
};

export const addNewTask = async (title: string) => {
  try {
    // const response =
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // const resData = await response.json();
    // return resData;
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error("Не получилось создать задачу.");
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
    if (error instanceof Error) throw new Error("Не получилсь удалить задачу.");
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
      throw new Error("Не получилось изменить статус задачи.");
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
    if (error instanceof Error)
      throw new Error("Не получилось изменить задачу.");
  }
};
