import { useState } from "react";
import classes from "../NewTask/NewTask.module.css";
import { addNewTask } from "../../api/http";

export default function NewTask({ fetchFilteredTaskList, setError }) {
  const [valueTask, setValueTask] = useState("");
  const [isInvalidTask, setIsInvalidTask] = useState(false);

  async function handleAddNewTask(event) {
    event.preventDefault();

    try {
      if (valueTask.trim().length < 2 || valueTask.trim().length > 64) {
        setIsInvalidTask(true);
        return;
      }
      await addNewTask(valueTask);
      await fetchFilteredTaskList();
      setValueTask("");
      setIsInvalidTask(false);
    } catch (error) {
      setError({
        message: error.message || "Не получилось создать задачу.",
      });
    }
  }

  return (
    <>
      <form
        name="newTask"
        className={classes.newTask}
        onSubmit={handleAddNewTask}
      >
        <input
          type="text"
          className={classes.input}
          placeholder="Напишите задачу..."
          value={valueTask}
          onChange={(event) => setValueTask(event.target.value)}
        />
        <button className={classes.button}>Создать</button>
      </form>
      {isInvalidTask && (
        <p className={classes.invalidText}>
          Введите не менее 2 и не более 64 символов
        </p>
      )}
    </>
  );
}
