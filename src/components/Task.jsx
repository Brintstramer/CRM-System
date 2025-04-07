import editIcon from "../assets/editIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import "../assets/checkbox.css";
import { useState } from "react";

export default function Task({
  task,
  handleChangeTaskStatus,
  handleChangeTaskTitle,
  onDeleteClick,
  filter,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");
  const [isInvalidEditingTask, setIsInvalidEditingTask] = useState(false);

  function handleEditClick() {
    setEditingTaskTitle(task.title);
    setIsEditing(true);
  }

  let editableTaskTitle = (
    <label
      className={`checkbox-label ${task.isDone && "checked"}`}
      htmlFor={task.id}
    >
      {task.title}
    </label>
  );
  let taskButtons = (
    <div className="task-buttons">
      <button
        disabled={task.isDone && true}
        className={`app__task-list__task__button ${
          task.isDone ? "button_blue_disabled" : "button_blue"
        }`}
        onClick={handleEditClick}
      >
        <img src={editIcon} alt="editing icon" width="21px" height="21px" />
      </button>
      <button
        className="app__task-list__task__button button_red"
        onClick={() => onDeleteClick(task.id)}
      >
        <img src={deleteIcon} alt="deletion icon" width="16px" height="16px" />
      </button>
    </div>
  );

  if (isEditing) {
    editableTaskTitle = (
      <input
        className="editable-input"
        type="text"
        autoFocus
        value={editingTaskTitle}
        onChange={(event) => {
          setEditingTaskTitle(event.target.value);
        }}
      />
    );
    taskButtons = (
      <div className="task-buttons">
        <button
          className="app__task-list__task__button button_blue save-cancel-buttons"
          onClick={() => {
            if (editingTaskTitle.length < 2 || editingTaskTitle.length > 64) {
              setIsInvalidEditingTask(true);
            } else {
              handleChangeTaskTitle(task.id, editingTaskTitle, filter);
              setIsInvalidEditingTask(false);
              setIsEditing(false);
            }
          }}
        >
          Cохранить
        </button>
        <button
          className="app__task-list__task__button button_red save-cancel-buttons"
          onClick={() => setIsEditing(false)}
        >
          Отмена
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="app__task-list__task">
        <div className="checkbox">
          <input
            className="checkbox-input"
            type="checkbox"
            checked={task.isDone}
            id={task.id}
            onChange={() => handleChangeTaskStatus(task.id, filter)}
          />
          {editableTaskTitle}
        </div>
        {taskButtons}
      </div>
      {isInvalidEditingTask && (
        <p className="invalid-text">
          Введите не менее 2 и не более 64 символов
        </p>
      )}
    </>
  );
}
