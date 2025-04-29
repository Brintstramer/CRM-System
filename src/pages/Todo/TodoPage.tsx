import "./todo.css";
import NewTask from "../../components/NewTask/NewTask";
import Tabs from "../../components/Tabs/Tabs";
import TaskList from "../../components/TaskList/TaskList";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { useEffect, useState } from "react";
import { fetchTasks } from "../../api/http";
import { ErrorMessage, ErrorType, Filter, TaskType } from "../../types/types";

const TodoPage: React.FC = () => {
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [tasksNumber, setTasksNumber] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchFilteredTaskList();
  }, [filter]);

  const fetchFilteredTaskList = async () => {
    setIsFetching(true);
    setError(null);

    try {
      const tasks = await fetchTasks(filter);
      setTaskList(tasks.data);
      setTasksNumber(tasks.info);

      setIsFetching(false);
    } catch (error: unknown) {
      setError({
        message:
          error instanceof Error ? error.message : ErrorMessage.FailedTaskList,
      });

      setIsFetching(false);
    }
  };

  return (
    <div className="todo">
      <NewTask
        fetchFilteredTaskList={fetchFilteredTaskList}
        setError={setError}
      />
      <Tabs setFilter={setFilter} tasksNumber={tasksNumber} filter={filter} />
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
  );
};

export default TodoPage;
