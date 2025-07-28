import { Button, Flex, Select, Tooltip } from "antd";
import { ModalAction, Roles, User } from "../../../types/users";
import { FC } from "react";
import { Link } from "react-router-dom";
import {
  CheckOutlined,
  CloseOutlined,
  LockOutlined,
  SwapOutlined,
  UnlockOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";

interface UserActionsProps {
  user: User;
  isEditing: boolean;
  editingRoles: Roles[] | null;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onChangeRoles: (roles: Roles[]) => void;
  onOpenModal: (user: User, action: ModalAction) => void;
}

const roleOptions = Object.values(Roles).map((role) => ({
  label: role,
  value: role,
}));

const UserActions: FC<UserActionsProps> = ({
  user,
  isEditing,
  editingRoles,
  onStartEdit,
  onCancelEdit,
  onChangeRoles,
  onOpenModal,
}) => {
  const handleChangeRole = (role: Roles[]) => {
    if (role.length === 0) return;
    onChangeRoles(role);
  };

  return (
    <Flex align="center" gap={16}>
      <Tooltip title="Перейти к профилю">
        <Link to={`/users/${user.id}`}>
          <Button type="text" icon={<UserOutlined />} size="small" aria-label="Перейти к профилю" />
        </Link>
      </Tooltip>

      <Tooltip title={user.isBlocked ? "Разблокировать" : "Заблокировать"}>
        <Button
          type="text"
          icon={user.isBlocked ? <UnlockOutlined /> : <LockOutlined />}
          size="small"
          aria-label={user.isBlocked ? "Разблокировать" : "Заблокировать"}
          onClick={() => onOpenModal(user, user.isBlocked ? "unblock" : "block")}
        />
      </Tooltip>

      {isEditing ? (
        <Flex align="center" gap={8}>
          <Select
            mode="multiple"
            size="small"
            placeholder="Роли"
            style={{ minWidth: 120 }}
            value={editingRoles ?? []}
            options={roleOptions}
            onChange={handleChangeRole}
          />
          <Button
            type="text"
            icon={<CheckOutlined />}
            size="small"
            style={{ color: "green" }}
            aria-label="Сохранить"
            onClick={() => onOpenModal(user, "changeRole")}
          />

          <Button
            type="text"
            icon={<CloseOutlined />}
            size="small"
            style={{ color: "gray" }}
            aria-label="Отменить"
            onClick={onCancelEdit}
          />
        </Flex>
      ) : (
        <Tooltip title="Редактировать роль">
          <Button
            type="text"
            icon={<SwapOutlined />}
            size="small"
            aria-label="Редактировать роль"
            onClick={onStartEdit}
          />
        </Tooltip>
      )}

      <Tooltip title="Удалить">
        <Button
          type="text"
          danger
          icon={<UserDeleteOutlined />}
          size="small"
          aria-label="Удалить пользователя"
          onClick={() => onOpenModal(user, "delete")}
        />
      </Tooltip>
    </Flex>
  );
};

export default UserActions;
