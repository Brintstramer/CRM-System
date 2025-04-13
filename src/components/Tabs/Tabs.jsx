import classes from "../Tabs/Tabs.module.css";

export default function Tabs({
  fetchFilteredTaskList,
  setFilter,
  filter,
  tasksNumber,
}) {
  function handleTab(filter) {
    setFilter(filter);
    fetchFilteredTaskList(filter);
    console.log("Push");
  }

  return (
    <nav className={classes.tabs}>
      <a
        className={filter === "all" ? classes.active : classes.tab}
        onClick={() => handleTab("all")}
      >
        {`Все (${tasksNumber.all})`}
      </a>
      <a
        className={filter === "inWork" ? classes.active : classes.tab}
        onClick={() => handleTab("inWork")}
      >{`в работе (${tasksNumber.inWork})`}</a>
      <a
        className={filter === "completed" ? classes.active : classes.tab}
        onClick={() => handleTab("completed")}
      >{`сделано (${tasksNumber.completed})`}</a>
    </nav>
  );
}
