import Task from "./Task";

export default function TaskList({ taskList, onCheckboxChange }) {
  return (
    <ol className="app__tasks">
      {taskList.map((task, index) => (
        <Task
          key={task.taskText}
          {...task}
          onCheckboxChange={(event) => onCheckboxChange(event, index)}
          taskList={taskList}
          index={index}
        ></Task>
      ))}
    </ol>
  );
}
