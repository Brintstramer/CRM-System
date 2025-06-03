import classes from "./Auth.module.css";
import authLogo from "../../assets/authLogo.svg";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  ConfigProvider,
  notification,
} from "antd";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { authActions } from "../../store/auth-slice";
import { api } from "../../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Token } from "../../types/types";

interface AuthData {
  login: string;
  password: string;
  remember: boolean;
}

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notificationApi, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const showRegistrationHandler = () => {
    dispatch(uiActions.showRegistration());
  };

  const onFinish = async (values: AuthData): Promise<void> => {
    try {
      setLoading(true);

      notificationApi.info({
        message: "Авторизация",
        description: "Проверка данных...",
        duration: 2,
      });

      const response = await api.post<Token>("/auth/signin", values);

      dispatch(authActions.login(response.data));

      const { accessToken, refreshToken } = response.data;

      if (values.remember) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
      } else {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }

      notificationApi.success({
        message: "Успешно!",
        description: "Авторизация прошла успешно.",
        duration: 5,
      });

      setTimeout(() => navigate("/todo"), 2000);

      setLoading(false);
    } catch (error) {
      let errorMessage: string = "Ошибка входа. Проверьте логин или пароль.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }

      notificationApi.error({
        message: "Ошибка",
        description: errorMessage,
        duration: 5,
      });

      setLoading(false);
    }
  };

  return (
    <div className={classes.auth}>
      {contextHolder}
      <header className={classes.header}>
        <img src={authLogo} alt="logo" className={classes.logo} />
        <h1>Войдите в личный кабинет</h1>
      </header>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7f265b",
            colorBorder: "#d1d1d1",
            colorText: "#828282",
            colorLink: "#7f265b",
            fontWeightStrong: 600,
          },
          components: {
            Input: {
              controlHeight: 50,
            },
            Button: {
              controlHeight: 50,
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
          name="login"
          initialValues={{ remember: false }}
          requiredMark={false}
          className={classes.form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Логин"
            layout="vertical"
            name="login"
            rules={[{ required: true, message: "Введите логин!" }]}
            style={{ marginBottom: "5rem" }}
          >
            <Input prefix={<UserOutlined />} placeholder="Логин" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            layout="vertical"
            name="password"
            rules={[{ required: true, message: "Введите пароль!" }]}
            style={{ marginBottom: "2.5rem" }}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="*******"
            />
          </Form.Item>
          <Form.Item>
            <Flex
              justify="space-between"
              align="center"
              style={{ marginTop: "2rem" }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ fontWeight: "500" }}>Запомнить</Checkbox>
              </Form.Item>
              {/* <a className={classes.a} href="">
                Не помню пароль
              </a> */}
            </Flex>
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              style={{ marginTop: "1rem" }}
              block
              type="primary"
              htmlType="submit"
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
      <footer className={classes.footer}>
        <span>Еще не зарегистрированы? </span>
        <a onClick={showRegistrationHandler} className={classes.a}>
          Создать личный кабинет
        </a>
      </footer>
    </div>
  );
};

export default Auth;
