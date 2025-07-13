import React from "react";
import { App as AntdApp, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/index";
import { useEffect } from "react";
import { clearError, resetSuccess } from "../../../store/slices/auth-slice";
import { LoadingOutlined } from "@ant-design/icons";

const Notifications: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { success, error, loading } = useSelector((state: RootState) => state.auth);
  const { notification } = AntdApp.useApp();

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Ошибка",
        description: error,
        duration: 3,
      });
      dispatch(clearError());
    }
  }, [error, dispatch, notification]);

  useEffect(() => {
    if (success) {
      notification.success({
        message: "Успешно",
        description: "Операция выполнена успешно.",
        duration: 3,
      });
      dispatch(resetSuccess());
    }
  }, [success, dispatch, notification]);

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
