export type TaskType = {
  created: string;
  id: number;
  title: string;
  isDone: boolean;
};

export type TasksNumber = {
  all: number;
  inWork: number;
  completed: number;
};

export type ErrorType = { message: string } | null;

export type ResponseData<T, N> = {
  data: T[];
  info: N;
  meta: {
    totalAmount: number;
  };
};

// export enum Filter {
//   All = "all",
//   InWork = "inWork",
//   Completed = "completed",
// }

export enum ErrorMessage {
  FailedTaskList = "Не получилось загрузить список задач.",
  FailedNewTask = "Не получилось создать задачу.",
  FailedDeleteTask = "Не получилсь удалить задачу.",
  FailedChangeStatusTask = "Не получилось изменить статус задачи.",
  FailedChangeTask = "Не получилось изменить задачу.",
}
