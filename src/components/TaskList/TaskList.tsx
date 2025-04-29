import classes from "../TaskList/TaskList.module.css";
import Task from "../Task/Task";
import { TaskType, ErrorType } from "../../types/types";

type TaskListProps = {
  fetchFilteredTaskList: () => Promise<void>;
  taskList: TaskType[];
  fallbackText: string;
  isFetching: boolean;
  loadingText: string;
  setError: (error: ErrorType) => void;
};

const TaskList: React.FC<TaskListProps> = ({
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
