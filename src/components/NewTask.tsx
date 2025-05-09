import { Button, Form, Input } from "antd";
import { addNewTask } from "../api/http";
import { ErrorMessage, ErrorType } from "../types/types";

type NewTaskProps = {
  fetchFilteredTaskList: () => Promise<void>;
  setError: (error: ErrorType) => void;
};

const NewTask: React.FC<NewTaskProps> = ({
  fetchFilteredTaskList,
  setError,
}) => {
  const [form] = Form.useForm();

  const handleAddNewTask = async (value: { taskTitle: string }) => {
    try {
      await addNewTask(value.taskTitle);
      await fetchFilteredTaskList();
      form.resetFields();
    } catch (error: unknown) {
      setError({
        message:
          error instanceof Error ? error.message : ErrorMessage.FailedNewTask,
      });
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
        name="taskTitle"
        rules={[
          {
            required: true,
            message: "Введите не менее 2 и не более 64 символов",
          },
          {
            min: 2,
            max: 64,
            message: "Введите не менее 2 и не более 64 символов",
          },
        ]}
      >
        <Input placeholder="Напишите задачу..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewTask;
