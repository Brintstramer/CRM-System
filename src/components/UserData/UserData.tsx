import classes from "./UserData.module.css";
import { List, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const UserData: React.FC = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);

  const data = [
    { label: "Имя пользователя", value: userData?.username },
    { label: "Электропочта", value: userData?.email },
    { label: "Номер телефона", value: userData?.phoneNumber },
  ];

  return (
    <div className={classes.userData}>
      <Typography.Title level={2}>Личные данные</Typography.Title>
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
  );
};

export default UserData;
