import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";

const MainNavigation = () => {
  const location = useLocation();
  const selectedKey = location.pathname === "/" ? "/todo" : location.pathname;

  const items = [
    {
      key: "/profile",
      label: <NavLink to="/profile">Профиль</NavLink>,
    },
    {
      key: "/todo",
      label: <NavLink to="/todo">Список задач</NavLink>,
    },
  ];

  return (
    <Menu
      mode="vertical"
      selectedKeys={[selectedKey]}
      style={{ background: "none", border: "none" }}
      items={items}
    />
  );
};

export default MainNavigation;
