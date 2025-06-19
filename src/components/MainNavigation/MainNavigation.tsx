import classes from "./MainNavigation.module.css";
import { Menu, ConfigProvider, MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { authActions, selectAccessToken } from "../../store/auth-slice";
import { uiActions } from "../../store/ui-slice";

const MainNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(selectAccessToken);

  const location = useLocation();
  const selectedKey = location.pathname === "/" ? "/todo" : location.pathname;

  const handleLogout = (): void => {
    dispatch(authActions.logout());
    dispatch(uiActions.setProfileView("auth"));
    navigate("/profile");
  };

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
        ...(accessToken
          ? [
              {
                key: "logout",
                label: "Выйти",
                onClick: handleLogout,
                style: { color: "#c45c5e" },
              },
            ]
          : []),
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
