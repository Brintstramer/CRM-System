import { useDispatch, useSelector } from "react-redux";
import {
  MAX_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from "../../constants";
import classes from "./Registration.module.css";
import { Form, Input, Button, ConfigProvider, notification } from "antd";
import { selectAuthLinkIsVisible, uiActions } from "../../store/ui-slice";
import { api } from "../../api/api";
import axios from "axios";
import { useState } from "react";

interface UserRegistration {
  username: string;
  login: string;
  password: string;
  email: string;
  phoneNumber?: string;
}

const Registration: React.FC = () => {
  const dispatch = useDispatch();
  const authLink = useSelector(selectAuthLinkIsVisible);

  const [notificationApi, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const showAuthHandler = (): void => {
    dispatch(uiActions.showAuth());
    dispatch(uiActions.hideAuthLink());
  };

  const onFinish = async (values: UserRegistration): Promise<void> => {
    try {
      setLoading(true);

      notificationApi.info({
        message: "Регистрация",
        description: "Создание личного кабинета...",
        duration: 2,
      });

      await api.post("/auth/signup", values);

      notificationApi.success({
        message: "Успешно!",
        description:
          "Регистрация прошла успешно. Теперь вы можете войти в личный кабинет.",
        duration: 5,
      });

      dispatch(uiActions.showAuthLink());

      setLoading(false);
    } catch (error) {
      let errorMessage: string = "Ошибка регистрации!";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }

      notificationApi.error({
        message: "Ошибка",
        description: errorMessage,
        duration: 5,
      });
    }
    setLoading(false);
  };

  return (
    <div className={classes.registration}>
      {contextHolder}
      <header className={classes.header}>
        <h1>Пройдите регистрацию</h1>
      </header>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7f265b",
            colorBorder: "#d1d1d1",
            colorText: "#828282",
            colorLink: "#7f265b",
          },
          components: {
            Input: {
              controlHeight: 32,
            },
            Button: {
              controlHeight: 40,
              fontSize: 18,
              fontWeight: 600,
              colorPrimary: "#7f265b",
              colorPrimaryHover: "#6a1f4d",
              colorPrimaryActive: "#55193f",
            },
          },
        }}
      >
        <Form
          className={classes.form}
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label="Имя пользователя"
            rules={[
              {
                required: true,
                whitespace: true,
                min: MIN_USERNAME_LENGTH,
                max: MAX_LENGTH,
                pattern: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
                message:
                  "Введите от 1 до 60 символов русского/латинского алфавита!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="login"
            label="Логин"
            rules={[
              {
                required: true,
                whitespace: true,
                min: MIN_LOGIN_LENGTH,
                max: MAX_LENGTH,
                pattern: /^[a-zA-Z\s]+$/,
                message: "Введите от 2 до 60 символов латинского алфавита!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              {
                required: true,
                min: MIN_PASSWORD_LENGTH,
                max: MAX_LENGTH,
                message: "Введите от 6 до 60 символов!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Повторите пароль!"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Пароли не совпадают!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Пароли не совпадают! Попробуйте ещё раз.")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="email"
            label="Почтовый адрес"
            rules={[
              {
                required: true,
                type: "email",
                message: "Введите корректный email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Телефон"
            rules={[
              {
                pattern: /^([0-9]{10})$/,
                message: "Введите корректный номер телефона!",
              },
            ]}
          >
            <Input addonBefore="+7" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              style={{ marginTop: "0.5rem" }}
              type="primary"
              block
              htmlType="submit"
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
      {authLink && (
        <a onClick={showAuthHandler} className={classes.a}>
          Перейти на страницу авторизации для входа в систему
        </a>
      )}
      {!authLink && (
        <footer className={classes.footer}>
          <span>Уже зарегистрированы?</span>
          <a onClick={showAuthHandler} className={classes.a}>
            Войти в личный кабинет
          </a>
        </footer>
      )}
    </div>
  );
};

export default Registration;
