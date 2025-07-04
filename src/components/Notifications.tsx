import React from "react";
import { notification, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { clearError, resetSuccess } from "../store/auth-slice";
import { LoadingOutlined } from "@ant-design/icons";

const Notifications: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Ошибка",
        description: error,
        duration: 3,
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      notification.success({
        message: "Успешно",
        description: "Операция выполнена успешно.",
        duration: 3,
      });
      dispatch(resetSuccess());
    }
  }, [success, dispatch]);

  return (
    <>
      {loading && (
        <Spin
          style={{ position: "fixed", zIndex: "1000" }}
          indicator={<LoadingOutlined spin />}
          size="large"
        />
      )}
    </>
  );
};

export default Notifications;
