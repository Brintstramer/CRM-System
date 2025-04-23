import classes from "../TaskList/TaskList.module.css";
import Task from "../Task/Task";

const TaskList: React.FC<{ taskList: [] }> = ({
  fetchFilteredTaskList,
  taskList,
  fallbackText,
  isFetching,
  loadingText,
  setError,
}) => {
  return (
    <>
      {isFetching && <p className={classes.center}>{loadingText}</p>}
      {!isFetching && taskList.length === 0 && (
        <p className={classes.center}>{fallbackText}</p>
      )}
      {!isFetching && taskList.length > 0 && (
        <ul className={classes.taskList}>
          {taskList.map((task) => (
            <li key={task.id}>
              <Task
                task={task}
                fetchFilteredTaskList={fetchFilteredTaskList}
                setError={setError}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TaskList;
