import React, { createContext, useState, useEffect, ReactNode, useRef } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api.ts';
import { Toast } from 'primereact/toast';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextProps {
  users: User[];
  addUser: (user: { name: string; email: string }) => Promise<void>;
  updateUser: (id: number, updatedUser: { name: string; email: string }) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const toast = useRef<Toast>(null); // Referencia para el Toast

  // Mostrar Toast de error
  const showErrorToast = (message: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
    });
  };

  // Mostrar Toast de éxito
  const showSuccessToast = (message: string) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000,
    });
  };

  // Cargar usuarios al inicio
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error: any) {
        console.error('Error fetching users:', error);
        showErrorToast(error.message || 'Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  // Agregar usuario
  const addUser = async (user: { name: string; email: string }) => {
    try {
      const newUser = await createUser(user);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      showSuccessToast('User added successfully!');
    } catch (error: any) {
      console.error('Error creating user:', error);
      showErrorToast(error.message || 'Error creating user');
    }
  };

  // Actualizar usuario
  const updateUserById = async (id: number, updatedUser: { name: string; email: string }) => {
    try {
      const updated = await updateUser(id, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? updated : user))
      );
      showSuccessToast('User updated successfully!');
    } catch (error: any) {
      console.error('Error updating user:', error);
      showErrorToast(error.message || 'Error updating user');
    }
  };

  // Eliminar usuario
  const deleteUserById = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      showSuccessToast('User deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting user:', error);
      showErrorToast(error.message || 'Error deleting user');
    }
  };

  return (
    <>
      {/* Toast para mostrar notificaciones */}
      <Toast ref={toast} position={'top-center'} />

      {/* Context Provider */}
      <UserContext.Provider
        value={{
          users,
          addUser,
          updateUser: updateUserById,
          deleteUser: deleteUserById,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};

export default UserProvider;
