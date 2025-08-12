import classes from "./User.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { fetchUser, updateUser } from "../../store/thunks/users-thunk";
import { Button, Flex, Form, Input, List, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import {
  MAX_LENGTH,
  MIN_USERNAME_LENGTH,
  PHONE_NUMBER_PATTERN,
  USERNAME_PATTERN,
} from "../../constants";
import { UserRequest } from "../../types/users";

const UserPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { user } = useSelector((state: RootState) => state.users);
  const [isEditing, setIsEditing] = useState<boolean>(false);
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

  const getChangedFields = <T extends UserRequest>(
    original: T,
    updated: Partial<T>,
  ): Partial<T> => {
    const changedFields: Partial<T> = {};
    for (const key in updated) {
      if (updated[key] !== original[key]) {
        changedFields[key] = updated[key];
      }
    }
    return changedFields;
  };

  const onSave = async (values: UserRequest) => {
    try {
      if (!user || !id) {
        return;
      }

      const changedFields = getChangedFields(user, values);

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
              message: "Имя пользователя обязательно",
            },
            {
              min: MIN_USERNAME_LENGTH,
              max: MAX_LENGTH,
              message: `Введите от ${MIN_USERNAME_LENGTH} до ${MAX_LENGTH} символов!`,
            },
            {
              pattern: USERNAME_PATTERN,
              message: "Допустимы только буквы русского и латинского алфавита",
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
              pattern: PHONE_NUMBER_PATTERN,
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
