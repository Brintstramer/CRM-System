import React from "react";
import classes from "./Auth.module.css";
import authLogo from "../../assets/authLogo.svg";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  // Checkbox,
  Form,
  Input,
  // Flex,
  ConfigProvider,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../types/types";
import { AppDispatch, RootState } from "../../store";
import { loginUser} from "../../store/thunks";
import { setProfileView } from "../../store/ui-slice";

const Auth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const showRegistrationHandler = () =>
    dispatch(setProfileView("registration"));

  const onFinish = async (values: AuthData) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      navigate("/todo");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.auth}>
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
            {/* <Flex
              justify="space-between"
              align="center"
              style={{ marginTop: "2rem" }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ fontWeight: "500" }}>Запомнить</Checkbox>
              </Form.Item>
              <a className={classes.a} href="">
                Не помню пароль
              </a>
            </Flex> */}
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
