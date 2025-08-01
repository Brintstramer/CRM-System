import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { FC, useEffect, useState } from "react";
import { blockUser, deleteUser, fetchUsers, unblockUser } from "../../store/thunks/users-thunk";
import Table from "antd/es/table";
import { ModalAction, User } from "../../types/users";
import { Flex, Input } from "antd";
import { setFilters } from "../../store/slices/users-slice";
import { FilterValue, SorterResult, TablePaginationConfig } from "antd/es/table/interface";
import { useDebounce } from "../../hooks/useDebounce";
import { SearchOutlined } from "@ant-design/icons";
import CustomModal from "../../components/CustomModal/CustomModal";
import { closeModal, openModal } from "../../store/slices/modal-slice";
import BlockingFilter from "../../components/UsersTable/BlockingFilter/BlockingFilter";
import { getUsersTableColumns } from "../../components/UsersTable/Columns/сolumns";
import { useEditRoles } from "../../hooks/useEditRoles";

const UsersTablePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, filters, loading, total } = useSelector((state: RootState) => state.users);
  const { open, action, user } = useSelector((state: RootState) => state.modal);

  const [searchTerm, setSearchTerm] = useState(filters.search);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    editingUserId,
    editingRoles,
    setEditingRoles,
    startEditingRoles,
    cancelEditingRoles,
    saveRoles,
  } = useEditRoles();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchUsers(filters)).unwrap();
      } catch (error) {
        console.error("Ошибка загрузки пользователей", error);
      }
    })();
  }, [filters, dispatch]);

  useEffect(() => {
    if (filters.search !== debouncedSearch) {
      dispatch(setFilters({ search: debouncedSearch, offset: 0 }));
    }
  }, [debouncedSearch, filters.search, dispatch]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _tableFilters: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[],
  ) => {
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;
    const limit = pagination.pageSize;
    const offset = (pagination.current ?? 1) - 1;
    dispatch(
      setFilters({
        sortBy: typeof singleSorter.field === "string" ? singleSorter.field : undefined,
        sortOrder:
          singleSorter.order === "ascend"
            ? "asc"
            : singleSorter.order === "descend"
              ? "desc"
              : undefined,
        limit,
        offset,
      }),
    );
  };

  const handleOpenModal = (user: User, action: ModalAction) => {
    dispatch(openModal({ user, action }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleModalConfirm = async () => {
    if (!user || !action) return;

    try {
      switch (action) {
        case "delete":
          await dispatch(deleteUser(user.id)).unwrap();
          const currentPage = filters.offset ?? 0;
          if (users.length === 1 && currentPage > 0) {
            dispatch(setFilters({ offset: filters.offset! - 1 }));
          }
          break;
        case "block":
          await dispatch(blockUser(user.id)).unwrap();
          break;
        case "unblock":
          await dispatch(unblockUser(user.id)).unwrap();
          break;
        case "changeRole":
          if (!editingRoles) break;
          await saveRoles(user);
          break;
      }
    } catch (error) {
      console.error("Ошибка!", error);
    } finally {
      handleCloseModal();
    }
  };

  const columns = getUsersTableColumns(
    editingUserId,
    editingRoles,
    startEditingRoles,
    cancelEditingRoles,
    setEditingRoles,
    handleOpenModal,
  );

  return (
    <div style={{ margin: "1rem" }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <h2 style={{ color: "rgb(82, 82, 82)", fontSize: 24 }}>Пользователи ({total})</h2>
        <Flex align="center" gap={10}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Поиск по имени или email"
            onChange={(event) => setSearchTerm(event.target.value)}
            value={searchTerm}
            allowClear
            size="large"
            style={{ width: 350 }}
          />
          <BlockingFilter filters={filters} />
        </Flex>
      </Flex>
      <Table<User>
        rowKey="id"
        columns={columns}
        dataSource={users}
        loading={loading}
        onChange={handleTableChange}
        pagination={{
          total,
          pageSize: filters.limit ?? 20,
          current: (filters.offset ?? 0) + 1,
        }}
      />
      <CustomModal
        user={user}
        action={action}
        open={open}
        onConfirm={handleModalConfirm}
        onCancel={handleCloseModal}
        newRoles={editingRoles}
      />
    </div>
  );
};

export default UsersTablePage;
