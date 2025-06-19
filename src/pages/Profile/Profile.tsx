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

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profileView = useSelector((state: RootState) => state.ui.profileView);
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    const fetchUserData = async () => {
      if (
        !localStorage.getItem("accessToken") &&
        !localStorage.getItem("refreshToken")
      ) {
        return;
      }

      if (!accessToken && refreshToken) {
        try {
          const token = await dispatch(refreshAccessToken()).unwrap();
          if (token && profileView === "auth") {
            await dispatch(getUserData()).unwrap();
            dispatch(setProfileView("userData"));
            return;
          }
        } catch {
          dispatch(logout());
          dispatch(setProfileView("auth"));
          return;
        }
        return;
      }

      if (!accessToken && !refreshToken) {
        dispatch(logout());
        dispatch(setProfileView("auth"));
        return;
      }

      if (accessToken) {
        try {
          await dispatch(getUserData()).unwrap();
          dispatch(setProfileView("userData"));
        } catch {
          dispatch(logout());
          dispatch(setProfileView("auth"));
        }
      }
    };

    fetchUserData();
  }, [accessToken, refreshToken, dispatch]);

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
