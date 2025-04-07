import NewTask from "./components/NewTask";
import Tabs from "./components/Tabs";
import TaskList from "./components/TaskList";
import Error from "./components/Error";
import { useEffect, useState } from "react";
import {
  fetchTasks,
  addNewTask,
  deleteTask,
  changeTaskStatus,
  changeTaskTitle,
} from "./http.js";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [valueTask, setValueTask] = useState("");
  // const [editingTaskTitle, setEditingTaskTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [tasksNumber, setTasksNumber] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchFilteredTaskList();
  }, []);

  async function fetchFilteredTaskList(filter) {
    setIsFetching(true);

    try {
      const tasks = await fetchTasks(filter);
      setTaskList(tasks.data);

      setIsFetching(false);

      const { all, inWork, completed } = await tasks.info;
      setTasksNumber({ all, inWork, completed });
    } catch (error) {
      setError({
        message: error.message || "Не получилось загрузить список задач.",
      });
    }

    setIsFetching(false);
  }

  async function handleAddNewTask(title) {
    try {
      await addNewTask(title);
      await fetchFilteredTaskList(filter);
      setValueTask("");
    } catch (error) {
      setError({
        message: error.message || "Не получилось создать новую задачу.",
      });
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);
      await fetchFilteredTaskList(filter);
    } catch (error) {
      setError({
        message: error.message || "Не получилось удалить задачу.",
      });
    }
  }

  async function handleChangeTaskStatus(id, filter) {
    try {
      await changeTaskStatus(id);
      await fetchFilteredTaskList(filter);
    } catch (error) {
      setError({
        message: error.message || "Не получилось изменить статус задачи.",
      });
    }
  }

  async function handleChangeTaskTitle(id, title, filter) {
    try {
      await changeTaskTitle(id, title);
      await fetchFilteredTaskList(filter);
    } catch (error) {
      setError({
        message: error.message || "Не получилось изменить текст задачи.",
      });
    }
  }

  return (
    <div className="app">
      <NewTask
        handleAddNewTask={handleAddNewTask}
        valueTask={valueTask}
        setValueTask={setValueTask}
      >
        Создать
      </NewTask>
      <Tabs
        filterTaskList={fetchFilteredTaskList}
        setFilter={setFilter}
        filter={filter}
        tasksNumber={tasksNumber}
      />
      {error && (
        <Error title="Пу-пу-пу, надо подумать..." message={error.message} />
      )}
      {!error && (
        <TaskList
          taskList={taskList}
          handleChangeTaskStatus={handleChangeTaskStatus}
          isLoading={isFetching}
          loadingText="Загрузка списка задач..."
          fallbackText="У вас нет задач."
          onDeleteClick={handleDeleteTask}
          filter={filter}
          handleChangeTaskTitle={handleChangeTaskTitle}
          // editingTaskTitle={editingTaskTitle}
          // setEditingTaskTitle={setEditingTaskTitle}
        />
      )}
    </div>
  );
}
