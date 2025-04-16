import "./todo.css";
import NewTask from "../../components/NewTask/NewTask.jsx";
import Tabs from "../../components/Tabs/Tabs.jsx";
import TaskList from "../../components/TaskList/TaskList.jsx";
import Error from "../../components/Error/Error.jsx";
import { useEffect, useState } from "react";
import { fetchTasks } from "../../api/http.js";

export default function TodoPage() {
  const [taskList, setTaskList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [tasksNumber, setTasksNumber] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchFilteredTaskList();
  }, [filter]);

  async function fetchFilteredTaskList() {
    setIsFetching(true);
    setError("");

    try {
      const tasks = await fetchTasks(filter);
      setTaskList(tasks.data);
      setTasksNumber(tasks.info);

      setIsFetching(false);
    } catch (error) {
      setError({
        message: error.message || "Не получилось загрузить список задач.",
      });

      setIsFetching(false);
    }
  }

  return (
    <div className="todo">
      <NewTask
        fetchFilteredTaskList={fetchFilteredTaskList}
        setError={setError}
      />
      <Tabs setFilter={setFilter} tasksNumber={tasksNumber} filter={filter} />
      {error && (
        <Error title="Пу-пу-пу, надо подумать..." message={error.message} />
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
}
