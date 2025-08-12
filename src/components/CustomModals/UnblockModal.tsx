import { Modal } from "antd";
import { User } from "../../types/users";
import { FC } from "react";

interface UnblockModalProps {
  user: User;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const UnblockModal: FC<UnblockModalProps> = ({ user, open, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Разблокировка пользователя"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Разблокировать"
      cancelText="Отмена"
      okType="primary"
      okButtonProps={{ size: "large" }}
      cancelButtonProps={{ size: "large" }}
    >
      {`Вы уверены, что хотите разблокировать пользователя "${user.username}"?`}
    </Modal>
  );
};

export default UnblockModal;
