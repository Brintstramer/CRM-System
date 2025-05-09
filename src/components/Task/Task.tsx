import "../Task/Task.css";
import editIcon from "../../assets/editIcon.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import { useState } from "react";
import { deleteTask, changeTaskStatus, changeTaskTitle } from "../../api/http";
import { TaskType, ErrorType, ErrorMessage } from "../../types/types";
import { Form, Space, Button, Checkbox, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";
import { useRefresh } from "../../store/RefreshContext";

type TaskProps = {
  task: TaskType;
  fetchFilteredTaskList: () => Promise<void>;
  setError: (error: ErrorType) => void;
};

const Task: React.FC<TaskProps> = ({
  task,
  fetchFilteredTaskList,
  setError,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form] = useForm();
  const { Text } = Typography;
  const { pauseRefresh, resumeRefresh } = useRefresh();

  const handleEditClick = () => {
    form.setFieldsValue({ editingTask: task.title });
    setIsEditing(true);
    pauseRefresh();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    resumeRefresh();
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task.id);
      await fetchFilteredTaskList();
    } catch (error: unknown) {
      setError({
        message:
          error instanceof Error
            ? error.message
            : ErrorMessage.FailedDeleteTask,
      });
    }
  };

  const handleChangeTaskStatus = async () => {
    try {
      await changeTaskStatus(task.id, task.isDone);
      await fetchFilteredTaskList();
    } catch (error: unknown) {
      setError({
        message:
          error instanceof Error
            ? error.message
            : ErrorMessage.FailedChangeStatusTask,
      });
    }
  };

  const handleChangeTaskTitle = async () => {
    try {
      const title = form.getFieldValue("editingTask");
      await changeTaskTitle(task.id, title);
      await fetchFilteredTaskList();
      setIsEditing(false);
      resumeRefresh();
    } catch (error: unknown) {
      setError({
        message:
          error instanceof Error
            ? error.message
            : ErrorMessage.FailedChangeTask,
      });
    }
  };

  if (isEditing) {
    return (
      <Form
        form={form}
        onFinish={handleChangeTaskTitle}
        style={{ marginTop: "1rem" }}
      >
        <Form.Item
          name="editingTask"
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
          <TextArea autoFocus rows={3} />
        </Form.Item>
        <Space>
          <Button color="orange" variant="solid" htmlType="submit">
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
      <Checkbox checked={task.isDone} onChange={handleChangeTaskStatus}>
        <Text delete={task.isDone}>{task.title}</Text>
      </Checkbox>
      <Space>
        <Button
          style={{ height: "2.7rem", width: "3rem" }}
          type="primary"
          disabled={task.isDone && true}
          onClick={handleEditClick}
        >
          <img src={editIcon} alt="editing icon" width="21px" height="21px" />
        </Button>
        <Button
          style={{ height: "2.7rem", width: "3rem" }}
          type="primary"
          danger
          onClick={handleDeleteTask}
        >
          <img
            src={deleteIcon}
            alt="deletion icon"
            width="16px"
            height="16px"
          />
        </Button>
      </Space>
    </div>
  );
};

export default Task;
