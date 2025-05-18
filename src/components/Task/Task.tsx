import "../Task/Task.css";
import { useState } from "react";
import { api } from "../../api/api";
import { Todo } from "../../types/types";
import { Form, Space, Button, Checkbox, Typography, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";
import { MAX_TITLE_LENGTH, MIN_TITLE_LENGTH } from "../../constants";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

type TaskProps = {
  task: Todo;
  fetchFilteredTaskList: () => Promise<void>;
  showError: (error: string) => void;
  startRefreshInterval: () => void;
  stopRefreshInterval: () => void;
};

const Task: React.FC<TaskProps> = ({
  task,
  fetchFilteredTaskList,
  showError,
  startRefreshInterval,
  stopRefreshInterval,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const { Text } = Typography;

  const handleEditClick = () => {
    form.setFieldsValue({ title: task.title });
    setIsEditing(true);
    stopRefreshInterval();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    startRefreshInterval();
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await api.delete(`/${id}`);
      await fetchFilteredTaskList();
    } catch (error: unknown) {
      showError(
        error instanceof Error ? error.message : "Не получилсь удалить задачу."
      );
    }
  };

  const handleChangeTaskStatus = async (id: number, status: boolean) => {
    try {
      await api.put(`/${id}`, { isDone: !status });
      await fetchFilteredTaskList();
    } catch (error: unknown) {
      showError(
        error instanceof Error
          ? error.message
          : "Не получилось изменить статус задачи."
      );
    }
  };

  const handleChangeTaskTitle = async (
    id: number,
    { title }: { title: string }
  ) => {
    try {
      setLoading(true);
      await api.put(`/${id}`, { title });
      await fetchFilteredTaskList();
      setIsEditing(false);
      startRefreshInterval();
    } catch (error: unknown) {
      showError(
        error instanceof Error
          ? error.message
          : "Не получилось изменить задачу."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <Form
        form={form}
        onFinish={(values) => handleChangeTaskTitle(task.id, values)}
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
          <TextArea autoFocus rows={3} />
        </Form.Item>
        <Space>
          <Button
            color="orange"
            variant="solid"
            htmlType="submit"
            loading={loading}
          >
            Cохранить
          </Button>
          <Button color="orange" variant="outlined" onClick={handleCancelEdit}>
            Отмена
          </Button>
        </Space>
      </Form>
    );
  }

  return (
    <div className="task">
      <Checkbox
        checked={task.isDone}
        onChange={() => handleChangeTaskStatus(task.id, task.isDone)}
      >
        <Text delete={task.isDone}>{task.title}</Text>
      </Checkbox>
      <Space>
        <Tooltip title="Редактировать">
          <Button
            style={{ height: "2.7rem", width: "3rem" }}
            type="primary"
            icon={<EditFilled />}
            aria-label="Редактировать задачу"
            disabled={task.isDone && true}
            onClick={handleEditClick}
          ></Button>
        </Tooltip>
        <Tooltip title="Удалить">
          <Button
            style={{ height: "2.7rem", width: "3rem" }}
            type="primary"
            icon={<DeleteFilled />}
            aria-label="Удалить задачу"
            danger
            onClick={() => handleDeleteTask(task.id)}
          ></Button>
        </Tooltip>
      </Space>
    </div>
  );
};

export default Task;
