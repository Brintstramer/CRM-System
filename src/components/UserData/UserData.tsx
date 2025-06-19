import classes from "./UserData.module.css";
import { List, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/api";
import axios from "axios";
import { useEffect } from "react";
import { notification } from "antd";
import {
  selectEmail,
  selectPhoneNumber,
  selectUsername,
  userActions,
} from "../../store/user-slice";

const UserData: React.FC = () => {
  const dispatch = useDispatch();

  const username = useSelector(selectUsername);
  const email = useSelector(selectEmail);
  const phoneNumber = useSelector(selectPhoneNumber);

  const data = [
    { label: "Username", value: username },
    { label: "Email", value: email },
    { label: "Phone number", value: phoneNumber },
  ];

  const [notificationApi, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user/profile");
        dispatch(userActions.getUserData(response.data));
      } catch (error) {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data.message ||
            "Ошибка при получении данных пользователя"
          : "Неизвестная ошибка";

        notificationApi.error({
          message: "Ошибка",
          description: errorMessage,
          duration: 5,
        });
      }
    };

    fetchUserData();
  }, [dispatch, notificationApi]);

  // useEffect(() => {
  //   const fetchAndSetUserData = async () => {
  //     const userData = await fetchUserData();
  //     if (!userData) return;

  //     dispatch(userActions.getUserData(userData));
  //   };

  //   fetchAndSetUserData();
  // }, [dispatch]);

  return (
    <div className={classes.userData}>
      {contextHolder}
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
