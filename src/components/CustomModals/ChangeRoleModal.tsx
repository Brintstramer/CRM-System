import { Modal } from "antd";
import { Roles, User } from "../../types/users";
import { FC } from "react";

interface ChangeRoleModalProps {
  user: User;
  newRoles: Roles[] | null;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ChangeRoleModal: FC<ChangeRoleModalProps> = ({
  user,
  newRoles,
  open,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      title="Изменение роли пользователя"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Сохранить"
      cancelText="Отмена"
      okType="primary"
      okButtonProps={{ size: "large" }}
      cancelButtonProps={{ size: "large" }}
    >
      {`Вы уверены, что хотите изменить роль пользователя "${user.username}" на ${newRoles?.join(", ")}?`}
    </Modal>
  );
};

export default ChangeRoleModal;
