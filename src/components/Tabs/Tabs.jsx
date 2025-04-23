import classes from "../Tabs/Tabs.module.css";

export default function Tabs({ setFilter, filter, tasksNumber }) {
  return (
    <nav className={classes.tabs}>
      <a
        className={filter === "all" ? classes.active : classes.tab}
        onClick={() => setFilter("all")}
      >
        {`Все (${tasksNumber.all})`}
      </a>
      <a
        className={filter === "inWork" ? classes.active : classes.tab}
        onClick={() => setFilter("inWork")}
      >{`в работе (${tasksNumber.inWork})`}</a>
      <a
        className={filter === "completed" ? classes.active : classes.tab}
        onClick={() => setFilter("completed")}
      >{`сделано (${tasksNumber.completed})`}</a>
    </nav>
  );
}
