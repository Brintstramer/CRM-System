import { useState } from "react";

export default function NewTask({
  children,
  handleAddNewTask,
  valueTask,
  setValueTask,
}) {
  const [isInvalidTask, setIsInvalidTask] = useState(false);

  return (
    <>
      <section className="app__new-task">
        <input
          type="text"
          className="app__new-task__input"
          placeholder="Напишите задачу..."
          value={valueTask}
          onChange={(event) => setValueTask(event.target.value)}
        />
        <button
          className="app__new-task__button"
          onClick={() => {
            if (valueTask.trim().length < 2 || valueTask.trim().length > 64) {
              setIsInvalidTask(true);
            } else {
              handleAddNewTask(valueTask);
              setIsInvalidTask(false);
            }
          }}
        >
          {children}
        </button>
      </section>
      {isInvalidTask && (
        <p className="invalid-text">
          Введите не менее 2 и не более 64 символов
        </p>
      )}
    </>
  );
}
