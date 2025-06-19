import { useDispatch, useSelector } from "react-redux";
import {
  MAX_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from "../../constants";
import classes from "./Registration.module.css";
import { Form, Input, Button, ConfigProvider } from "antd";
import { registerUser } from "../../store/thunks";
import { AppDispatch, RootState } from "../../store";
import { UserRegistration } from "../../types/types";
import {
  hideAuthLink,
  setProfileView,
  showAuthLink,
} from "../../store/ui-slice";

const Registration: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authLink = useSelector(
    (state: RootState) => state.ui.authLinkIsVisible
  );
  const loading = useSelector((state: RootState) => state.auth.loading);
  const [form] = Form.useForm();

  const showAuthHandler = (): void => {
    dispatch(setProfileView("auth"));
    dispatch(hideAuthLink());
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
    <div className={classes.registration}>
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
