import editIcon from "../assets/editIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import "../assets/checkbox.css";

export default function Task({ taskText, onCheckboxChange, taskList, index }) {
  let checkboxLabelClasses = "checkbox-label";

  if (taskList[index].state) {
    checkboxLabelClasses += " checked";
  }

  return (
    <div className="app__task-list__task">
      <div className="checkbox">
        <input
          className="checkbox-input"
          type="checkbox"
          id={taskText}
          onChange={(event) => onCheckboxChange(event, index)}
        />
        <label className={checkboxLabelClasses} htmlFor={taskText}>
          {taskText}
        </label>
      </div>
      <div className="task-buttons">
        <button className="app__task-list__task__button button-edit">
          <img src={editIcon} alt="editing icon" width="21px" height="21px" />
        </button>
        <button className="app__task-list__task__button button-delete">
          <img
            src={deleteIcon}
            alt="deletion icon"
            width="16px"
            height="16px"
          />
        </button>
      </div>
    </div>
  );
}
