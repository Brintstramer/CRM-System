import { tasks } from "../data/tasks";

export default function Tabs({
  checkedTasks,
  onHandleTabAll,
  onHandleTabInWork,
  onHandleTabDone,
}) {
  return (
    <nav className="app__tabs">
      <a className="app__tabs__tab" onClick={(event) => onHandleTabAll(event)}>
        {"Все"} <span>(12)</span>
      </a>
      <a
        className="app__tabs__tab"
        onClick={() => onHandleTabInWork()}
      >{`в работе (${tasks.length - checkedTasks})`}</a>
      <a
        className="app__tabs__tab"
        onClick={(event) => onHandleTabDone(event)}
      >{`сделано (${checkedTasks})`}</a>
    </nav>
  );
}
