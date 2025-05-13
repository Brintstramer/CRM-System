import NewTask from "../components/NewTask";
import TabsComponent from "../components/TabsComponent";
import TaskList from "../components/TaskList/TaskList";
import ErrorComponent from "../components/ErrorComponent";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchTasks } from "../api/http";
import { ErrorMessage, ErrorType, TasksNumber, TaskType } from "../types/types";
import { RefreshContext } from "../store/RefreshContext";

const TodoPage: React.FC = () => {
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>(null);
  const [filter, setFilter] = useState<string>("all");
  const [tasksNumber, setTasksNumber] = useState<TasksNumber>({
    all: 0,
    inWork: 0,
    completed: 0,
  });

  const intervalRef = useRef<number | null>(null);

  const fetchFilteredTaskList = useCallback(async () => {
    setIsFetching(true);
    setError(null);

    try {
      const tasks = await fetchTasks(filter);
      setTaskList(tasks.data);
      setTasksNumber(tasks.info);
    } catch (error: unknown) {
      setError({
        message:
          error instanceof Error ? error.message : ErrorMessage.FailedTaskList,
      });
    } finally {
      setIsFetching(false);
    }
  }, [filter]);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startInterval = useCallback(() => {
    stopInterval();
    intervalRef.current = setInterval(() => fetchFilteredTaskList(), 5000);
  }, [stopInterval, fetchFilteredTaskList]);

  useEffect(() => {
    fetchFilteredTaskList();
    startInterval();
    return () => stopInterval();
  }, [filter]);

  return (
    <RefreshContext.Provider
      value={{ pauseRefresh: stopInterval, resumeRefresh: startInterval }}
    >
      <div
        style={{
          maxWidth: "35rem",
          height: "100%",
          paddingTop: "2rem",
          margin: "0 auto",
        }}
      >
        <NewTask
          fetchFilteredTaskList={fetchFilteredTaskList}
          setError={setError}
        />
        <TabsComponent
          setFilter={setFilter}
          tasksNumber={tasksNumber}
          filter={filter}
        />
        {error && (
          <ErrorComponent
            title="Пу-пу-пу, надо подумать..."
            message={error.message}
          />
        )}
        {!error && (
          <TaskList
            taskList={taskList}
            fetchFilteredTaskList={fetchFilteredTaskList}
            isFetching={isFetching}
            loadingText="Загрузка списка задач..."
            fallbackText="Задачи закончились."
            setError={setError}
          />
        )}
      </div>
    </RefreshContext.Provider>
  );
};

export default TodoPage;
