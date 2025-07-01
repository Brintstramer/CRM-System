import React, { useEffect, useRef } from "react";
import classes from "../Profile/Profile.module.css";
import Promo from "../../components/Promo/Promo";
import Auth from "../../components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import Registration from "../../components/Registration/Registration";
import UserData from "../../components/UserData/UserData";
import { AppDispatch, RootState } from "../../store";
import Notifications from "../../components/Notifications";
import { logout } from "../../store/auth-slice.ts";
import { setProfileView } from "../../store/ui-slice.ts";
import { getUserData, refreshAccessToken } from "../../store/thunks.ts";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profileView } = useSelector((state: RootState) => state.ui);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const initAuth = async () => {
      const refreshToken: string | null = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        dispatch(logout());
        dispatch(setProfileView("auth"));
        return;
      }

      try {
        await dispatch(refreshAccessToken({ refreshToken })).unwrap();
        await dispatch(getUserData()).unwrap();
        dispatch(setProfileView("userData"));
      } catch (error) {
        dispatch(logout());
        dispatch(setProfileView("auth"));
      }
    };

    initAuth();
  }, [dispatch]);

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
