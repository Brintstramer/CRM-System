import React from "react";
import classes from "./Authorization.module.css";
import authLogo from "../../assets/authLogo.svg";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  // Checkbox,
  Form,
  Input,
  // Flex,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../types/auth";
import { AppDispatch, RootState } from "../../store";
import { getUserData, loginUser } from "../../store/thunks/auth-thunk";
import Promo from "../../components/Auth/Promo/Promo";
import Notifications from "../../components/Auth/Notifications/Notifications";

const AuthorizationPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  const onFinish = async (values: AuthData) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      await dispatch(getUserData()).unwrap();
      navigate("/todo");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.authPage}>
      <aside className={classes.aside}>
        <Promo />
      </aside>
      <section className={classes.section}>
        <Notifications />
        <div className={classes.auth}>
          <header className={classes.header}>
            <img src={authLogo} alt="logo" className={classes.logo} />
            <h1>Войдите в личный кабинет</h1>
          </header>
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
              <Input prefix={<LockOutlined />} type="password" placeholder="*******" />
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
          <footer className={classes.footer}>
            <span>Еще не зарегистрированы? </span>
            <a onClick={() => navigate("/registration")} className={classes.a}>
              Создать личный кабинет
            </a>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default AuthorizationPage;
