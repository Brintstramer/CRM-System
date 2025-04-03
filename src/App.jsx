import NewTask from "./components/NewTask";
import Tabs from "./components/Tabs";
import TaskList from "./components/TaskList";
import { tasks } from "./data/tasks";
import { use, useState } from "react";

export default function App() {
  const [enteredNewTask, setEnteredNewTask] = useState("");
  const [taskList, setTaskList] = useState(tasks);
  const [isInvalidTask, setIsInvalidTask] = useState(false);

  const newTaskInvalid = isInvalidTask && enteredNewTask === "";
  let checkedTasks;

  function handleInputChangeNewTask(event) {
    setEnteredNewTask(event.target.value);
  }

  function addTask(enteredNewTask) {
    if (enteredNewTask === "") {
      setIsInvalidTask(true);
    } else {
      setTaskList((prevTaskList) => {
        return [{ taskText: enteredNewTask }, ...prevTaskList];
      });
    }
  }

  function handleTabAll(event) {
    setTaskList(tasks);
    console.log(event);
  }

  function handleTabInWork() {
    setTaskList(taskList.filter((task) => !task.state));
  }

  function handleTabDone(event) {
    setTaskList(taskList.filter((task) => task.state));
    console.log(event);
  }

  function handleCheckboxChange(value, index) {
    taskList[index].state = value.target.checked;

    setTaskList(taskList);
  }

  return (
    <div className="app">
      <NewTask
        invalid={newTaskInvalid}
        onChange={handleInputChangeNewTask}
        onClick={addTask}
        enteredNewTask={enteredNewTask}
      >
        Создать
      </NewTask>
      <Tabs
        checkedTasks={checkedTasks}
        onHandleTabAll={handleTabAll}
        onHandleTabInWork={handleTabInWork}
        onHandleTabDone={handleTabDone}
      />
      <TaskList taskList={taskList} onCheckboxChange={handleCheckboxChange} />
    </div>
  );
}
