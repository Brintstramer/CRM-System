import { Modal } from "antd";
import { FC } from "react";
import { ModalAction, Roles, User } from "../../types/users";

interface CustomModalPorps {
  user: User | null;
  action: ModalAction | null;
  open: boolean;
  newRoles: Roles[] | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomModal: FC<CustomModalPorps> = ({
  user,
  action,
  open,
  newRoles,
  onConfirm,
  onCancel,
}) => {
  if (!user || !action) return null;

  const getTitle = () => {
    switch (action) {
      case "delete":
        return "Удаление пользователя";
      case "block":
        return "Блокировка пользователя";
      case "unblock":
        return "Разблокировка пользователя";
      case "changeRole":
        return "Изменение роли пользователя";
      default:
        return "";
    }
  };

  const getContent = () => {
    switch (action) {
      case "delete":
        return `Вы уверены, что хотите удалить пользователя "${user.username}"?`;
      case "block":
        return `Вы уверены, что хотите заблокировать пользователя "${user.username}"?`;
      case "unblock":
        return `Вы уверены, что хотите разблокировать пользователя "${user.username}"?`;
      case "changeRole":
        return `Вы уверены, что хотите изменить роль пользователя "${user.username}" на ${newRoles?.join(", ")}?`;
      default:
        return "";
    }
  };

  const getOkText = () => {
    switch (action) {
      case "delete":
        return "Удалить";
      case "block":
        return "Заблокировать";
      case "unblock":
        return "Разблокировать";
      case "changeRole":
        return "Сохранить";
      default:
        return "OK";
    }
  };

  return (
    <Modal
      title={getTitle()}
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={getOkText()}
      cancelText="Отмена"
      okType={action === "delete" ? "danger" : "primary"}
      okButtonProps={{ size: "large" }}
      cancelButtonProps={{ size: "large" }}
    >
      {getContent()}
    </Modal>
  );
};

export default CustomModal;
