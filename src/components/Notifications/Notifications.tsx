import classes from "./Notifications.module.css";
import { App as AntdApp, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/index";
import { FC, useEffect } from "react";
import {
  resetSuccess as resetAuthSuccess,
  clearError as clearAuthError,
} from "../../store/slices/auth-slice";
import {
  resetSuccess as resetUsersSuccess,
  clearError as clearUsersError,
} from "../../store/slices/users-slice";

const Notifications: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notification } = AntdApp.useApp();
  const {
    success: authSuccess,
    error: authError,
    loading: authLoading,
  } = useSelector((state: RootState) => state.auth);

  const {
    success: usersSuccess,
    error: usersError,
    loading: usersLoading,
  } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const error = authError || usersError;

    if (error) {
      notification.error({
        message: "Ошибка",
        description: error,
        duration: 3,
      });

      if (usersError) dispatch(clearUsersError());
      if (authError) dispatch(clearAuthError());
    }
  }, [usersError, authError, notification, dispatch]);

  useEffect(() => {
    const success = authSuccess || usersSuccess;

    if (success) {
      notification.success({
        message: "Успешно",
        description: "Операция выполнена успешно.",
        duration: 3,
      });

      if (authSuccess) dispatch(resetAuthSuccess());
      if (usersSuccess) dispatch(resetUsersSuccess());
    }
  }, [authSuccess, usersSuccess, notification, dispatch]);

  const loading = authLoading || usersLoading;

  return (
    loading && (
      <div className={classes.notifications}>
        <Spin size="large" />
      </div>
    )
  );
};

export default Notifications;
