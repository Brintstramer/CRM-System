import React from "react";
import { Tabs } from "antd";
import { TasksNumber } from "../types/types";

type TabsProps = {
  setFilter: (filter: string) => void;
  filter: string;
  tasksNumber: TasksNumber;
};

const TabsComponent: React.FC<TabsProps> = ({
  setFilter,
  filter,
  tasksNumber,
}) => {
  const items = [
    {
      label: `Все ${tasksNumber.all}`,
      key: "all",
    },
    {
      label: `в работе ${tasksNumber.inWork}`,
      key: "inWork",
    },
    {
      label: `сделано ${tasksNumber.completed}`,
      key: "completed",
    },
  ];

  return (
    <Tabs
      activeKey={filter}
      onChange={(key: string) => setFilter(key)}
      items={items}
    />
  );
};

export default React.memo(TabsComponent);
