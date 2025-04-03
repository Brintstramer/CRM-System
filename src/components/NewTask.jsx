export default function NewTask({
  invalid,
  children,
  onChange,
  onClick,
  enteredNewTask,
}) {
  let inputClasses = "app__new-task__input";
  let inputPlaceholder = "Напишите задачу...";

  if (invalid) {
    inputClasses += " input_invalid";
    inputPlaceholder = "Write a task";
  } else {
    inputClasses += " input_valid";
  }

  return (
    <section className="app__new-task">
      <input
        className={inputClasses}
        placeholder={inputPlaceholder}
        onChange={onChange}
      />
      <button
        className="app__new-task__button"
        onClick={() => onClick(enteredNewTask)}
      >
        {children}
      </button>
    </section>
  );
}
