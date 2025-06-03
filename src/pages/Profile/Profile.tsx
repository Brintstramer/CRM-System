import classes from "../Profile/Profile.module.css";
import Promo from "../../components/Promo/Promo";
import Auth from "../../components/Auth/Auth";
import { useSelector } from "react-redux";
import Registration from "../../components/Registration/Registration";
import { selectAuthView } from "../../store/ui-slice";

const ProfilePage: React.FC = () => {
  const authView = useSelector(selectAuthView);

  return (
    <div className={classes.profile}>
      <aside className={classes.aside}>
        <Promo />
      </aside>
      <section className={classes.section}>
        {authView === "registration" ? <Registration /> : <Auth />}
      </section>
    </div>
  );
};

export default ProfilePage;
