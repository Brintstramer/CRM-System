import { Button, Form, Input } from "antd";
import { api } from "../api/api";
import { MAX_TITLE_LENGTH, MIN_TITLE_LENGTH } from "../constants";
import { useState } from "react";

type NewTaskProps = {
  fetchFilteredTaskList: () => Promise<void>;
  showError: (error: string) => void;
};

const NewTask: React.FC<NewTaskProps> = ({
  fetchFilteredTaskList,
  showError,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddNewTask = async ({ title }: { title: string }) => {
    try {
      setLoading(true);
      await api.post("", { title });
      await fetchFilteredTaskList();
      form.resetFields();
    } catch (error: unknown) {
      showError(
        error instanceof Error ? error.message : "Не получилось создать задачу."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleAddNewTask}
      autoComplete="off"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <Form.Item
        name="title"
        rules={[
          {
            required: true,
            message: `Введите не менее ${MIN_TITLE_LENGTH} и не более ${MAX_TITLE_LENGTH} символов`,
          },
          {
            min: MIN_TITLE_LENGTH,
            max: MAX_TITLE_LENGTH,
            message: `Введите не менее ${MIN_TITLE_LENGTH} и не более ${MAX_TITLE_LENGTH} символов`,
          },
        ]}
      >
        <Input placeholder="Напишите задачу..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewTask;
