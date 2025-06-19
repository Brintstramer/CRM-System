import NewTask from "../components/NewTask";
import TabsComponent from "../components/TabsComponent";
import TaskList from "../components/TaskList/TaskList";
import { useCallback, useEffect, useState, useRef } from "react";
import { fetchTasks } from "../api/apiTodo";
import { Filter, TodoInfo, Todo } from "../types/types";
import { REFRESH_INTERVAL } from "../constants";
import { notification } from "antd";

const TodoPage: React.FC = () => {
  const [taskList, setTaskList] = useState<Todo[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [todoInfo, setTodoInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const showError = useCallback((message: string) => {
    notification.error({
      message: "Пу-пу-пу, надо подумать...",
      description: message,
      placement: "topRight",
    });
  }, []);

  const fetchFilteredTaskList = useCallback(async () => {
    setIsFetching(true);

    try {
      const { data, info } = await fetchTasks(filter);
      setTaskList(data);
      setTodoInfo(info);
    } catch (error: unknown) {
      showError(
        error instanceof Error
          ? error.message
          : "Не получилось загрузить список задач."
      );
    } finally {
      setIsFetching(false);
    }
  }, [filter, showError]);

  const stopRefreshInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startRefreshInterval = useCallback(() => {
    stopRefreshInterval();
    intervalRef.current = setInterval(fetchFilteredTaskList, REFRESH_INTERVAL);
  }, [fetchFilteredTaskList, stopRefreshInterval]);

  useEffect(() => {
    fetchFilteredTaskList();
    startRefreshInterval();

    return stopRefreshInterval;
  }, [fetchFilteredTaskList, startRefreshInterval, stopRefreshInterval]);

  return (
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
        showError={showError}
      />
      <TabsComponent
        setFilter={setFilter}
        todoInfo={todoInfo}
        filter={filter}
      />

      <TaskList
        taskList={taskList}
        fetchFilteredTaskList={fetchFilteredTaskList}
        isFetching={isFetching}
        loadingText="Загрузка списка задач..."
        fallbackText="Задачи закончились."
        showError={showError}
        startRefreshInterval={startRefreshInterval}
        stopRefreshInterval={stopRefreshInterval}
      />
    </div>
  );
};

export default TodoPage;
