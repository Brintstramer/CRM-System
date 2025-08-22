import { useState } from "react";
import { Roles, User } from "../types/users";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { updateRole } from "../store/thunks/users-thunk";

export const useEditRoles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editingRoles, setEditingRoles] = useState<Roles[] | null>(null);

  const startEditingRoles = (user: User) => {
    setEditingUserId(user.id);
    setEditingRoles(user.roles);
  };

  const cancelEditingRoles = () => {
    setEditingUserId(null);
    setEditingRoles(null);
  };

  const saveRoles = async (user: User) => {
    if (!editingRoles) return;

    try {
      const newRoles = Array.from(new Set(editingRoles)); // удаляем дубликаты
      await dispatch(updateRole({ id: user.id, data: { roles: newRoles } })).unwrap();
    } catch (error) {
      console.error("Ошибка изменения роли пользователя", error);
    } finally {
      cancelEditingRoles();
    }
  };

  return {
    editingUserId,
    editingRoles,
    setEditingRoles,
    startEditingRoles,
    cancelEditingRoles,
    saveRoles,
  };
};
