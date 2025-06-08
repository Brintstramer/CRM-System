import classes from "../Profile/Profile.module.css";
import Promo from "../../components/Promo/Promo";
import Auth from "../../components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import Registration from "../../components/Registration/Registration";
import { selectProfileView, uiActions } from "../../store/ui-slice";
import UserData from "../../components/UserData/UserData";
import { selectAccessToken } from "../../store/auth-slice";
import { useEffect, useRef } from "react";
import { notification } from "antd";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const profileView = useSelector(selectProfileView);
  const accessToken = useSelector(selectAccessToken);
  const [notificationApi, contextHolder] = notification.useNotification();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (accessToken && profileView !== "userData") {
      dispatch(uiActions.setProfileView("userData"));
    }

    if (!accessToken && profileView !== "registration") {
      notificationApi.info({
        message: "Пройдите авторизацию",
        key: "auth-notification",
        duration: 3,
      });
    }
  }, [accessToken, dispatch, profileView]);

  return (
    <div className={classes.profile}>
      <aside className={classes.aside}>
        <Promo />
      </aside>
      <section className={classes.section}>
        {contextHolder}
        {profileView === "registration" && <Registration />}
        {profileView === "auth" && <Auth />}
        {profileView === "userData" && <UserData />}
      </section>
    </div>
  );
};

export default ProfilePage;
