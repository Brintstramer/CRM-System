export default function Tabs({
  filterTaskList,
  setFilter,
  filter,
  tasksNumber,
}) {
  return (
    <nav className="app__tabs">
      <a
        className={`app__tabs__tab ${
          filter === "all" && "app__tabs__tab_active"
        }`}
        onClick={() => {
          setFilter("all");
          filterTaskList("all");
        }}
      >
        {`Все (${tasksNumber.all})`}
      </a>
      <a
        className={`app__tabs__tab ${
          filter === "inWork" && "app__tabs__tab_active"
        }`}
        onClick={() => {
          setFilter("inWork");
          filterTaskList("inWork");
        }}
      >{`в работе (${tasksNumber.inWork})`}</a>
      <a
        className={`app__tabs__tab ${
          filter === "completed" && "app__tabs__tab_active"
        }`}
        onClick={() => {
          setFilter("completed");
          filterTaskList("completed");
        }}
      >{`сделано (${tasksNumber.completed})`}</a>
    </nav>
  );
}
