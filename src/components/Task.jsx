import editIcon from "../assets/editIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import "../assets/checkbox.css";
import { useState } from "react";

export default function Task({ taskList, taskText, onCheckboxChange, index }) {
  const [editingTaskText, setEditingTaskText] = useState(taskText);
  const [isEditing, setIsEditing] = useState(false);

  let checkboxLabelClasses = "checkbox-label";

  if (taskList[index].state) {
    checkboxLabelClasses += " checked";
  }

  function handleEditClick() {
    setIsEditing(true);
    // if (isEditing) {
    // }
  }

  function handleSaveClick() {
    taskText = editingTaskText;
    setIsEditing(false);
  }

  function handleChangeTaskText(event) {
    setEditingTaskText(event.target.value);
  }

  let editableTaskText = (
    <label className={checkboxLabelClasses} htmlFor={taskText}>
      {taskText}
    </label>
  );
  let taskButtons = (
    <div className="task-buttons">
      <button
        className="app__task-list__task__button button_blue"
        onClick={handleEditClick}
      >
        <img src={editIcon} alt="editing icon" width="21px" height="21px" />
      </button>
      <button
        className="app__task-list__task__button button_red"
        onClick={handleDeleteTask}
      >
        <img src={deleteIcon} alt="deletion icon" width="16px" height="16px" />
      </button>
    </div>
  );

  if (isEditing) {
    editableTaskText = (
      <input
        className="editable-input"
        type="text"
        value={editingTaskText}
        onChange={handleChangeTaskText}
        autoFocus
      />
    );
    taskButtons = (
      <div className="task-buttons">
        <button
          className="app__task-list__task__button button_blue save-cancel-buttons"
          onClick={handleSaveClick}
        >
          Cохранить
        </button>
        <button className="app__task-list__task__button button_red save-cancel-buttons">
          Отмена
        </button>
      </div>
    );
  }

  function handleDeleteTask() {}

  return (
    <div className="app__task-list__task">
      <div className="checkbox">
        <input
          className="checkbox-input"
          type="checkbox"
          id={taskText}
          onChange={(event) => onCheckboxChange(event, index)}
        />
        {editableTaskText}
      </div>
      {taskButtons}
    </div>
  );
}
