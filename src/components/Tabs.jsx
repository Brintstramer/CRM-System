import { tasks } from "../data/tasks";

export default function Tabs({
  taskList,
  onHandleTabAll,
  onHandleTabInWork,
  onHandleTabDone,
}) {
  return (
    <nav className="app__tabs">
      <a className="app__tabs__tab" onClick={onHandleTabAll}>
        {`Все (${tasks.length})`}
      </a>
      <a
        className="app__tabs__tab"
        onClick={() => onHandleTabInWork()}
      >{`в работе (${tasks.length - taskList.length})`}</a>
      <a
        className="app__tabs__tab"
        onClick={() => onHandleTabDone()}
      >{`сделано (${taskList.length})`}</a>
    </nav>
  );
}
