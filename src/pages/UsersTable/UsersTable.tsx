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
import BlockingFilter from "../../components/UsersTable/BlockingFilter/BlockingFilter";
import { getUsersTableColumns } from "../../components/UsersTable/Columns/сolumns";
import { useEditRoles } from "../../hooks/useEditRoles";
import DeleteModal from "../../components/CustomModals/DeleteModal";
import BlockModal from "../../components/CustomModals/BlockModal";
import UnblockModal from "../../components/CustomModals/UnblockModal";
import ChangeRoleModal from "../../components/CustomModals/ChangeRoleModal";

const UsersTablePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, filters, loading, total } = useSelector((state: RootState) => state.users);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<ModalAction | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(filters.search);
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
        sortBy:
          singleSorter.field === "username" || singleSorter.field === "email"
            ? singleSorter.field
            : undefined,
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
    setSelectedUser(user);
    setModalAction(action);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setModalAction(null);
  };

  const handleModalConfirm = async () => {
    if (!selectedUser || !modalAction) {
      return;
    }

    try {
      switch (modalAction) {
        case "delete":
          await dispatch(deleteUser(selectedUser.id)).unwrap();
          const currentPage = filters.offset ?? 0;
          if (users.length === 1 && currentPage > 0) {
            dispatch(setFilters({ offset: filters.offset! - 1 }));
          }
          break;
        case "block":
          await dispatch(blockUser(selectedUser.id)).unwrap();
          break;
        case "unblock":
          await dispatch(unblockUser(selectedUser.id)).unwrap();
          break;
        case "changeRole":
          if (!editingRoles) break;
          await saveRoles(selectedUser);
          break;
        default:
          console.error(`Неизвестное действие: ${modalAction}`);
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
      {modalAction === "block" && selectedUser && (
        <BlockModal
          user={selectedUser}
          open={modalOpen}
          onConfirm={handleModalConfirm}
          onCancel={handleCloseModal}
        />
      )}
      {modalAction === "unblock" && selectedUser && (
        <UnblockModal
          user={selectedUser}
          open={modalOpen}
          onConfirm={handleModalConfirm}
          onCancel={handleCloseModal}
        />
      )}
      {modalAction === "changeRole" && selectedUser && (
        <ChangeRoleModal
          user={selectedUser}
          newRoles={editingRoles}
          open={modalOpen}
          onConfirm={handleModalConfirm}
          onCancel={handleCloseModal}
        />
      )}
      {modalAction === "delete" && selectedUser && (
        <DeleteModal
          user={selectedUser}
          open={modalOpen}
          onConfirm={handleModalConfirm}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UsersTablePage;
