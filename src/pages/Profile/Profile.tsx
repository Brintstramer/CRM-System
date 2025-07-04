import React from "react";
import classes from "../Profile/Profile.module.css";
import Promo from "../../components/Promo/Promo";
import Auth from "../../components/Auth/Auth";
import { useSelector } from "react-redux";
import Registration from "../../components/Registration/Registration";
import UserData from "../../components/UserData/UserData";
import { RootState } from "../../store";
import Notifications from "../../components/Notifications";

const ProfilePage: React.FC = () => {
  const { profileView } = useSelector((state: RootState) => state.ui);

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
