import NewTask from "./components/NewTask";
import Tabs from "./components/Tabs";
import TaskList from "./components/TaskList";
import { tasks } from "./data/tasks";
import { useState } from "react";

export default function App() {
  const [enteredNewTask, setEnteredNewTask] = useState("");
  const [taskList, setTaskList] = useState(tasks);
  const [isValidTask, setIsValidTask] = useState(false);

  const newTaskInvalid = isValidTask && enteredNewTask === "";
  let numberCheckedTasks;

  function handleInputChange(event) {
    setEnteredNewTask(event.target.value);
  }

  function addTask(enteredNewTask) {
    if (enteredNewTask === "") {
      setIsValidTask(true);
    } else {
      setTaskList((prevTaskList) => {
        return [{ taskText: enteredNewTask }, ...prevTaskList];
      });
    }
  }

  function handleTabAll() {
    setTaskList(tasks);
  }

  function handleTabInWork() {
    setTaskList(tasks.filter((task) => !task.state));
  }

  function handleTabDone() {
    setTaskList(tasks.filter((task) => task.state));
  }

  function handleCheckboxChange(value, index) {
    taskList[index].state = value.target.checked;

    setTaskList(tasks);
  }

  console.log(taskList);

  return (
    <div className="app">
      <NewTask
        invalid={newTaskInvalid}
        onChange={handleInputChange}
        onClick={addTask}
        enteredNewTask={enteredNewTask}
      >
        Add
      </NewTask>
      <Tabs
        taskList={taskList}
        onHandleTabAll={handleTabAll}
        onHandleTabInWork={handleTabInWork}
        onHandleTabDone={handleTabDone}
      />
      <TaskList taskList={taskList} onCheckboxChange={handleCheckboxChange} />
    </div>
  );
}
