import { Modal } from "antd";
import { User } from "../../types/users";
import { FC } from "react";

interface DeleteModalProps {
  user: User;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ user, open, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Удаление пользователя"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Удалить"
      cancelText="Отмена"
      okType="danger"
      okButtonProps={{ size: "large" }}
      cancelButtonProps={{ size: "large" }}
    >
      {`Вы уверены, что хотите удалить пользователя "${user.username}"?`}
    </Modal>
  );
};

export default DeleteModal;
