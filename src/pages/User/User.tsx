import classes from "./User.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { fetchUser, updateUser } from "../../store/thunks/users-thunk";
import { Button, Flex, Form, Input, List, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { MAX_LENGTH, MIN_USERNAME_LENGTH } from "../../constants";
import { UserRequest } from "../../types/users";

const UserPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { user } = useSelector((state: RootState) => state.users);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = useForm<UserRequest>();

  const data = [
    { label: "Имя пользователя", value: user?.username },
    { label: "Email пользователя", value: user?.email },
    { label: "Номер телефона", value: user?.phoneNumber },
  ];

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          await dispatch(fetchUser(id)).unwrap();
        }
      } catch (error) {
        console.error("Ошибка загрузки данных пользователя", error);
      }
    })();
  }, [id, dispatch]);

  useEffect(() => {
    if (user) {
      const { username, email, phoneNumber } = user;

      form.setFieldsValue({ username, email, phoneNumber });
    }
  }, [user, form]);

  const onSave = async () => {
    try {
      if (!user || !id) return;

      const values = await form.validateFields();
      const changedFields: Partial<UserRequest> = {};

      for (const key in values) {
        const typedKey = key as keyof UserRequest;
        if (values[typedKey] !== user[typedKey]) {
          changedFields[typedKey] = values[typedKey];
        }
      }

      if (Object.keys(changedFields).length === 0) {
        setIsEditing(false);
        return;
      }

      await dispatch(updateUser({ id, data: changedFields })).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка обновления данных пользователя", error);
    }
  };

  return (
    <div className={classes.user}>
      <Typography.Title level={2} style={{ color: "#525252", fontWeight: "700" }}>
        Профиль пользователя
      </Typography.Title>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text strong>{item.label}: </Typography.Text>
            <Typography.Text>{item.value || "данные отсутствуют"} </Typography.Text>
          </List.Item>
        )}
        style={{ display: isEditing ? "none" : "block" }}
      />
      {!isEditing && (
        <>
          <Flex justify="center" gap={20}>
            <Button type="default" onClick={() => navigate(-1)}>
              Вернуться
            </Button>
            <Button type="primary" onClick={() => setIsEditing(true)}>
              Редактировать
            </Button>
          </Flex>
        </>
      )}
      <Form
        form={form}
        onFinish={onSave}
        requiredMark={false}
        style={{ display: !isEditing ? "none" : "block" }}
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
          <Input className={classes.input} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email пользователя"
          rules={[
            {
              required: true,
              type: "email",
              message: "Введите корректный email!",
            },
          ]}
        >
          <Input className={classes.input} />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Номер телефона"
          rules={[
            {
              required: true,
              pattern: /^(\+7[0-9]{10})$/,
              message: "Введите корректный номер телефона!",
            },
          ]}
        >
          <Input className={classes.input} />
        </Form.Item>
        <Form.Item>
          <Flex justify="center" gap={20}>
            <Button type="default" onClick={() => setIsEditing(false)}>
              Отмена
            </Button>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserPage;
