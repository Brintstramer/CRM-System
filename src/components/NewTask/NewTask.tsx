import { Button, Form, Input } from "antd";

import { useState } from "react";
import classes from "../NewTask/NewTask.module.css";
import { addNewTask } from "../../api/http";
import { ErrorMessage, ErrorType } from "../../types/types";

type NewTaskProps = {
  fetchFilteredTaskList: () => Promise<void>;
  setError: (error: ErrorType) => void;
};

const NewTask: React.FC<NewTaskProps> = ({
  fetchFilteredTaskList,
  setError,
}) => {
  const [valueTask, setValueTask] = useState("");
  // const [isInvalidTask, setIsInvalidTask] = useState(false);

  const handleAddNewTask = async (event: React.FormEvent) => {
    event.preventDefault();

    // if (valueTask.trim().length < 2 || valueTask.trim().length > 64) {
    //   setIsInvalidTask(true);
    //   return;
    // }

    try {
      await addNewTask(valueTask);
      await fetchFilteredTaskList();
      setValueTask("");
      // setIsInvalidTask(false);
    } catch (error: unknown) {
      setError({
        message:
          error instanceof Error ? error.message : ErrorMessage.FailedNewTask,
      });
    }
  };

  return (
    <>
      <Form
        name="newTask"
        className={classes.newTask}
        onFinish={handleAddNewTask}
      >
        <Form.Item>
          <Input
            placeholder="Напишите задачу..."
            value={valueTask}
            onChange={(event) => setValueTask(event.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Создать</Button>
        </Form.Item>
      </Form>
      {/* {isInvalidTask && (
        <p className={classes.invalidText}>
          Введите не менее 2 и не более 64 символов
        </p>
      )} */}
    </>
  );
};

export default NewTask;
