import React from "react";
import classes from "../Profile/Profile.module.css";
import Promo from "../../components/Promo/Promo";
import Auth from "../../components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import Registration from "../../components/Registration/Registration";
import UserData from "../../components/UserData/UserData";
import { useEffect } from "react";
import { getUserData, refreshAccessToken } from "../../store/thunks";
import { AppDispatch, RootState } from "../../store";
import Notifications from "../../components/Notifications";
import { setProfileView } from "../../store/ui-slice";
import { logout } from "../../store/auth-slice";
import { ProfileView } from "../../types/types.ts";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profileView: ProfileView = useSelector((state: RootState) => state.ui.profileView);
  const accessToken: string | null = localStorage.getItem("accessToken");
  const refreshToken: string | null = localStorage.getItem("refreshToken");

  const fetchUserData = async () => {
    if (!accessToken && !refreshToken) {
      dispatch(logout());
      dispatch(setProfileView("auth"));
      return;
    }

    if (!accessToken && refreshToken) {
      try {
        await dispatch(refreshAccessToken()).unwrap();
      } catch {
        dispatch(logout());
        dispatch(setProfileView("auth"));
        return;
      }
    }

    try {
      await dispatch(getUserData()).unwrap();
      dispatch(setProfileView("userData"));
    } catch {
      dispatch(logout());
      dispatch(setProfileView("auth"));
    }
  };

  useEffect(() => {
    fetchUserData().catch((error) => {
      console.error("Ошибка при получении данных пользователя:", error);
    });
  }, []);

  return (
    <div className={classes.profile}>
      <aside className={classes.aside}>
        <Promo />
      </aside>
      <section className={classes.section}>
        <Notifications />
        {profileView === "registration" && <Registration />}
        {profileView === "auth" && <Auth />}
        {profileView === "userData" && <UserData />}
      </section>
    </div>
  );
};

export default ProfilePage;
