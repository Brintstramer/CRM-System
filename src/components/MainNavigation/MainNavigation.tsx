import React from "react";
import classes from "./MainNavigation.module.css";
import { Menu, MenuProps } from "antd";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../store/auth-slice";
import { useCallback } from "react";

const MainNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const selectedKey = location.pathname === "/" ? "/todo" : location.pathname;

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/authorization");
  }, [dispatch, navigate]);

  const items: MenuProps["items"] = [
    {
      key: "/profile",
      label: <NavLink to="/profile">Профиль</NavLink>,
    },
    {
      key: "/todo",
      label: <NavLink to="/todo">Список задач</NavLink>,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Выйти",
      onClick: handleLogout,
      style: { color: "#c45c5e" },
    },
  ];
  return (
    <Menu className={classes.menu} mode="vertical" selectedKeys={[selectedKey]} items={items} />
  );
};

export default MainNavigation;
