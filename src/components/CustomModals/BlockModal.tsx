import { Modal } from "antd";
import { User } from "../../types/users";
import { FC } from "react";

interface BlockModalProps {
  user: User;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const BlockModal: FC<BlockModalProps> = ({ user, open, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Блокировка пользователя"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Заблокировать"
      cancelText="Отмена"
      okType="primary"
      okButtonProps={{ size: "large" }}
      cancelButtonProps={{ size: "large" }}
    >
      {`Вы уверены, что хотите заблокировать пользователя "${user.username}"?`}
    </Modal>
  );
};

export default BlockModal;
