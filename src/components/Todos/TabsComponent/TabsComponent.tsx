import React from "react";
import { Tabs } from "antd";
import { Filter, TodoInfo } from "../../../types/todos";

type TabsProps = {
  setFilter: (filter: Filter) => void;
  filter: Filter;
  todoInfo: TodoInfo;
};

const TabsComponent: React.FC<TabsProps> = ({ setFilter, filter, todoInfo }) => {
  const items = [
    {
      label: `Все ${todoInfo.all}`,
      key: Filter.All,
    },
    {
      label: `в работе ${todoInfo.inWork}`,
      key: Filter.InWork,
    },
    {
      label: `сделано ${todoInfo.completed}`,
      key: Filter.Completed,
    },
  ];

  return <Tabs activeKey={filter} onChange={(key) => setFilter(key as Filter)} items={items} />;
};

export default React.memo(TabsComponent);
