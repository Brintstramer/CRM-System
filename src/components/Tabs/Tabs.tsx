import { Filter, TasksNumber } from "../../types/types";
import classes from "../Tabs/Tabs.module.css";

type TabsProps = {
  setFilter: (filter: Filter) => void;
  filter: Filter;
  tasksNumber: TasksNumber;
};

const Tabs: React.FC<TabsProps> = ({ setFilter, filter, tasksNumber }) => {
  return (
    <nav className={classes.tabs}>
      <a
        className={filter === "all" ? classes.active : classes.tab}
        onClick={() => setFilter(Filter.All)}
      >
        {`Все (${tasksNumber.all})`}
      </a>
      <a
        className={filter === "inWork" ? classes.active : classes.tab}
        onClick={() => setFilter(Filter.InWork)}
      >{`в работе (${tasksNumber.inWork})`}</a>
      <a
        className={filter === "completed" ? classes.active : classes.tab}
        onClick={() => setFilter(Filter.Completed)}
      >{`сделано (${tasksNumber.completed})`}</a>
    </nav>
  );
};

export default Tabs;
