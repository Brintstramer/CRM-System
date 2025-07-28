import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MAX_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from "../../constants";
import classes from "./Registration.module.css";
import { Form, Input, Button, ConfigProvider } from "antd";
import { registerUser } from "../../store/thunks/auth-thunk";
import { AppDispatch, RootState } from "../../store";
import { UserRegistration } from "../../types/auth";
import { showAuthLink } from "../../store/slices/ui-slice";
import Promo from "../../components/Promo/Promo";
import { useNavigate } from "react-router-dom";

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { authLinkIsVisible } = useSelector((state: RootState) => state.ui);
  const { loading } = useSelector((state: RootState) => state.auth);
  const [form] = Form.useForm();

  const showAuthHandler = (): void => {
    navigate("/authorization");
  };

  const onFinish = async (values: UserRegistration): Promise<void> => {
    const formData = {
      ...values,
      phoneNumber: values.phoneNumber ? `+7${values.phoneNumber}` : "",
    };

    await dispatch(registerUser(formData)).unwrap();
    form.resetFields();

    dispatch(showAuthLink());
  };

  return (
    <div className={classes.regPage}>
      <aside className={classes.aside}>
        <Promo />
      </aside>
      <section className={classes.section}>
        <div className={classes.registration}>
          <header className={classes.header}>
            <h1>Пройдите регистрацию</h1>
          </header>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  controlHeight: 32,
                },
                Button: {
                  controlHeight: 40,
                },
              },
            }}
          >
            <Form
              form={form}
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
                    message: "Введите от 1 до 60 символов русского/латинского алфавита!",
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
                      return Promise.reject(new Error("Пароли не совпадают! Попробуйте ещё раз."));
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
          {authLinkIsVisible && (
            <footer className={classes.footer}>
              <a onClick={showAuthHandler} className={classes.a}>
                Перейти на страницу авторизации для входа в систему
              </a>
            </footer>
          )}
          {!authLinkIsVisible && (
            <footer className={classes.footer}>
              <span>Уже зарегистрированы?</span>
              <a onClick={showAuthHandler} className={classes.a}>
                Войти в личный кабинет
              </a>
            </footer>
          )}
        </div>
      </section>
    </div>
  );
};

export default RegistrationPage;
