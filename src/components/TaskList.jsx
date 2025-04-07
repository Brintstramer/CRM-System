import Task from "./Task";

export default function TaskList({
  taskList,
  handleChangeTaskStatus,
  fallbackText,
  isLoading,
  loadingText,
  onDeleteClick,
  filter,
  handleChangeTaskTitle,
}) {
  return (
    <>
      {isLoading && <p className="fallback-text">{loadingText}</p>}
      {!isLoading && taskList.length === 0 && (
        <p className="fallback-text">{fallbackText}</p>
      )}
      {!isLoading && taskList.length > 0 && (
        <ul className="app__tasks">
          {taskList.map((task) => (
            <Task
              key={task.id}
              task={task}
              handleChangeTaskStatus={handleChangeTaskStatus}
              onDeleteClick={onDeleteClick}
              filter={filter}
              handleChangeTaskTitle={handleChangeTaskTitle}
            />
          ))}
        </ul>
      )}
    </>
  );
}
