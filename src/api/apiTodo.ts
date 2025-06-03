import { MetaResponse, Todo, TodoInfo } from "../types/types";
import { api } from "./api";

export const fetchTasks = async (
  filter: string
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const response = await api.get<MetaResponse<Todo, TodoInfo>>("/todos", {
      params: { filter },
    });
    return response.data;
  } catch {
    throw new Error("Не получилось загрузить список задач.");
  }
};
