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

export type Filter = "all" | "inWork" | "completed";

export type ErrorType = { message: string } | null;

export type ResponseData<T, N> = {
  data: T[];
  info: N;
  meta: {
    totalAmount: number;
  };
};

export type NewTaskProps = {
  fetchFilteredTaskList: () => Promise<void>;
  setError: (error: ErrorType) => void;
};

export type TabsProps = {
  setFilter: (filter: Filter) => void;
  filter: string;
  tasksNumber: TasksNumber;
};

export type ErrorComponentProps = { title: string; message: string };

export type TaskListProps = {
  fetchFilteredTaskList: () => Promise<void>;
  taskList: TaskType[];
  fallbackText: string;
  isFetching: boolean;
  loadingText: string;
  setError: (error: ErrorType) => void;
};

export type TaskProps = {
  task: TaskType;
  fetchFilteredTaskList: () => Promise<void>;
  setError: (error: ErrorType) => void;
};

export type ButtonProps = {
  disabled?: boolean;
  className: string;
  onClick?: () => Promise<void> | void;
  children: React.ReactNode;
};
