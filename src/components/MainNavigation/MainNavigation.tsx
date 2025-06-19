import classes from "./MainNavigation.module.css";
import { Menu, ConfigProvider, MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { setProfileView } from "../../store/ui-slice";
import { RootState } from "../../store";
import { logout } from "../../store/auth-slice";
import { useCallback } from "react";

const MainNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const location = useLocation();
  const selectedKey = location.pathname === "/" ? "/todo" : location.pathname;

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(setProfileView("auth"));
    navigate("/profile");
  }, [dispatch, navigate]);

  const items: MenuProps["items"] = accessToken
    ? [
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
      ]
    : [];

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#7f265b" },
        components: {
          Menu: {
            itemSelectedBg: "#7f265b20",
            itemSelectedColor: "#7f265b",
            itemHoverBg: "#7f265b10",
          },
        },
      }}
    >
      <Menu
        className={classes.menu}
        mode="vertical"
        selectedKeys={[selectedKey]}
        items={items}
      />
    </ConfigProvider>
  );
};

export default MainNavigation;
