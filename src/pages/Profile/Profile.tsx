import React from "react";
import classes from "../Profile/Profile.module.css";
import Promo from "../../components/Auth/Promo/Promo";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Notifications from "../../components/Auth/Notifications/Notifications";
import { List, Typography } from "antd";

const ProfilePage: React.FC = () => {
  const { userData } = useSelector((state: RootState) => state.auth);

  const data = [
    { label: "Имя пользователя", value: userData?.username },
    { label: "Электропочта", value: userData?.email },
    { label: "Номер телефона", value: userData?.phoneNumber },
  ];

  return (
    <div className={classes.profile}>
      <aside className={classes.aside}>
        <Promo />
      </aside>
      <section className={classes.section}>
        <Notifications />
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
