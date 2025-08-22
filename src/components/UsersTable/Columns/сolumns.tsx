import { ColumnsType } from "antd/es/table";
import { ModalAction, Roles, User } from "../../../types/users";
import { format } from "date-fns";
import { Flex, Tag } from "antd";
import UserActions from "../UserActions/UserActions";

export const getUsersTableColumns = (
  editingUserId: number | null,
  editingRoles: Roles[] | null,
  startEditingRoles: (user: User) => void,
  cancelEditingRoles: () => void,
  setEditingRoles: (roles: Roles[]) => void,
  handleOpenModal: (user: User, action: ModalAction) => void,
): ColumnsType<User> => [
  {
    title: "Имя",
    dataIndex: "username",
    key: "username",
    sorter: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: true,
  },
  {
    title: "Номер телефона",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Дата регистрации",
    dataIndex: "date",
    key: "date",
    render: (data: string) => format(new Date(data), "dd.MM.yyyy"),
  },
  {
    title: "Статус блокировки",
    dataIndex: "isBlocked",
    key: "isBlocked",
    render: (_, record) => (
      <Flex align="center" gap={12}>
        {record.isBlocked ? <Tag color="red">Blocked</Tag> : <Tag color="green">Active</Tag>}
      </Flex>
    ),
  },
  {
    title: "Роли",
    dataIndex: "roles",
    key: "roles",
    render: (roles: Roles[]) => (
      <>
        {roles.map((role) => (
          <Tag
            color={
              (role === Roles.ADMIN && "blue") ||
              (role === Roles.USER && "purple") ||
              (role === Roles.MODERATOR && "orange") ||
              "gray"
            }
            key={role}
          >
            {role}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: "Действия",
    key: "actions",
    render: (_, record) => {
      return (
        <UserActions
          user={record}
          isEditing={editingUserId === record.id}
          editingRoles={editingRoles}
          onStartEdit={() => startEditingRoles(record)}
          onCancelEdit={cancelEditingRoles}
          onChangeRoles={(roles) => setEditingRoles(roles)}
          onOpenModal={handleOpenModal}
        />
      );
    },
  },
];
