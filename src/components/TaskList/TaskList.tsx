import React from "react";
import classes from "../TaskList/TaskList.module.css";
import Task from "../Task/Task";
import { Todo } from "../../types/todos";

type TaskListProps = {
  fetchFilteredTaskList: () => Promise<void>;
  taskList: Todo[];
  fallbackText: string;
  isFetching: boolean;
  loadingText: string;
  showError: (error: string) => void;
  startRefreshInterval: () => void;
  stopRefreshInterval: () => void;
};

const TaskList: React.FC<TaskListProps> = ({
  fetchFilteredTaskList,
  taskList,
  fallbackText,
  isFetching,
  loadingText,
  showError,
  startRefreshInterval,
  stopRefreshInterval,
}) => {
  return (
    <>
      {isFetching && <p className={classes.center}>{loadingText}</p>}
      {!isFetching && taskList.length === 0 && <p className={classes.center}>{fallbackText}</p>}
      {!isFetching && taskList.length > 0 && (
        <ul className={classes.taskList}>
          {taskList.map((task) => (
            <li key={task.id}>
              <Task
                task={task}
                fetchFilteredTaskList={fetchFilteredTaskList}
                showError={showError}
                startRefreshInterval={startRefreshInterval}
                stopRefreshInterval={stopRefreshInterval}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default React.memo(TaskList);
