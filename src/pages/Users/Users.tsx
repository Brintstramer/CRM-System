import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { fetchUsers } from "../../store/thunks/users-thunk";
import Table, { ColumnsType } from "antd/es/table";
import { User } from "../../types/users";
import { Input, Tag } from "antd";
import { setFilters } from "../../store/slices/users-slice";
import { SorterResult } from "antd/es/table/interface";

const Users: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, filters, loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(filters));
  }, [filters, dispatch]);

  const columns: ColumnsType<User> = [
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
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      render: (roles: string[]) => (
        <>
          {roles.map((role) => (
            <Tag color="blue" key={role}>
              {role}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Блокировка",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (blocked: boolean) =>
        blocked ? <Tag color="red">Blocked</Tag> : <Tag color="green">Active</Tag>,
    },
  ];

  const handleUsersChange = (filters: any, sorter: SorterResult<User> | SorterResult<User>[]) => {
    const singleSorter = sorter as SorterResult<User>;

    dispatch(
      setFilters({
        ...filters,
        sortBy: typeof singleSorter.field === "string" ? singleSorter.field : undefined,
        sortOrder:
          singleSorter.order === "ascend"
            ? "asc"
            : singleSorter.order === "descend"
              ? "desc"
              : undefined,
      }),
    );
  };

  return (
    <>
      <Input.Search
        placeholder="Поиск по имени или email"
        onSearch={(value) => dispatch(setFilters({ ...filters, search: value }))}
        enterButton
        style={{ marginBottom: 16, width: 300 }}
      />
      <Table<User>
        rowKey="id"
        columns={columns}
        dataSource={users}
        loading={loading}
        onChange={handleUsersChange}
      />
    </>
  );
};

export default Users;
