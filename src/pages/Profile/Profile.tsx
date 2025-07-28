import React, { useEffect } from "react";
import classes from "../Profile/Profile.module.css";
import Promo from "../../components/Promo/Promo";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { List, Typography } from "antd";
import { getUserData } from "../../store/thunks/auth-thunk";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.auth);

  const data = [
    { label: "Имя пользователя", value: userData?.username },
    { label: "Электропочта", value: userData?.email },
    { label: "Номер телефона", value: userData?.phoneNumber },
  ];

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getUserData()).unwrap();
      } catch (error) {
        console.error("Не удалось загрузить профиль пользователя", error);
      }
    })();
  }, [dispatch]);

  return (
    <div className={classes.profile}>
      <aside className={classes.aside}>
        <Promo />
      </aside>
      <section className={classes.section}>
        <div className={classes.userData}>
          <Typography.Title level={2} style={{ color: "#525252", fontWeight: "700" }}>
            Личные данные
          </Typography.Title>
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text strong>{item.label}: </Typography.Text>
                <Typography.Text>{item.value || "не заполнено"} </Typography.Text>
              </List.Item>
            )}
          />
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
