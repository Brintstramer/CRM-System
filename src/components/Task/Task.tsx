import classes from "../Task/Task.module.css";
import editIcon from "../../assets/editIcon.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import { useState } from "react";
import Button from "../Button/Button";
import { deleteTask, changeTaskStatus, changeTaskTitle } from "../../api/http";
import { TaskType, ErrorType, ErrorMessage } from "../../types/types";

type TaskProps = {
  task: TaskType;
  fetchFilteredTaskList: () => Promise<void>;
  setError: (error: ErrorType) => void;
};

const Task: React.FC<TaskProps> = ({
  task,
  fetchFilteredTaskList,
  setError,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");
  const [isInvalidEditingTask, setIsInvalidEditingTask] = useState(false);

  const handleEditClick = () => {
    setEditingTaskTitle(task.title);
    setIsEditing(true);
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task.id);
      await fetchFilteredTaskList();
    } catch (error: unknown) {
      setError({
        message:
          error instanceof Error
            ? error.message
            : ErrorMessage.FailedDeleteTask,
      });
    }
  };

  const handleChangeTaskStatus = async () => {
    try {
      await changeTaskStatus(task.id, task.isDone);
      await fetchFilteredTaskList();
    } catch (error: unknown) {
      setError({
        message:
          error instanceof Error
            ? error.message
            : ErrorMessage.FailedChangeStatusTask,
      });
    }
  };

  const handleChangeTaskTitle = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (editingTaskTitle.length < 2 || editingTaskTitle.length > 64) {
        setIsInvalidEditingTask(true);
        return;
      }
      await changeTaskTitle(task.id, editingTaskTitle);
      await fetchFilteredTaskList();
      setIsInvalidEditingTask(false);
      setIsEditing(false);
    } catch (error: unknown) {
      setError({
        message:
          error instanceof Error
            ? error.message
            : ErrorMessage.FailedChangeTask,
      });
    }
  };

  return !isEditing ? (
    <div className={classes.task}>
      <div className={classes.checkbox}>
        <input
          className={classes.input}
          type="checkbox"
          checked={task.isDone}
          id={typeof task.id === "number" ? String(task.id) : undefined}
          onChange={handleChangeTaskStatus}
        />
        <label
          className={task.isDone ? classes.checkedLabel : classes.label}
          htmlFor={typeof task.id === "number" ? String(task.id) : undefined}
        >
          {task.title}
        </label>
      </div>
      <div className={classes.editDeleteButtons}>
        <Button
          disabled={task.isDone && true}
          className={classes.editButton}
          onClick={handleEditClick}
        >
          <img src={editIcon} alt="editing icon" width="21px" height="21px" />
        </Button>
        <Button className={classes.deleteButton} onClick={handleDeleteTask}>
          <img
            src={deleteIcon}
            alt="deletion icon"
            width="16px"
            height="16px"
          />
        </Button>
      </div>
    </div>
  ) : (
    <form
      name="editingTask"
      className={classes.form}
      onSubmit={handleChangeTaskTitle}
    >
      <textarea
        className={classes.textarea}
        autoFocus
        value={editingTaskTitle}
        onChange={(event) => setEditingTaskTitle(event.target.value)}
      ></textarea>
      {isInvalidEditingTask && (
        <p className={classes.invalidText}>
          Введите не менее 2 и не более 64 символов
        </p>
      )}
      <div className={classes.saveCancelButtons}>
        <Button className={classes.saveButton}>Cохранить</Button>
        <Button
          className={classes.cancelButton}
          onClick={() => setIsEditing(false)}
        >
          Отмена
        </Button>
      </div>
    </form>
  );
};

export default Task;
