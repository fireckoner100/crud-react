import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext.tsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import UserForm from './UserForm.tsx';

const UserList: React.FC = () => {
  const { users, deleteUser } = useContext(UserContext)!;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: 'contains' },
    name: { value: null, matchMode: 'contains' },
    email: { value: null, matchMode: 'contains' },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  // Actualizar el filtro global
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters({ ...filters, global: { value, matchMode: 'contains' } });
    setGlobalFilterValue(value);
  };

  // Mostrar el diálogo de confirmación para eliminar
  const showDeleteConfirm = (user: any) => {
    confirmDialog({
      message: `Are you sure you want to delete ${user.name}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => handleDelete(user.id),
      reject: () => console.log('Deletion cancelled'),
    });
  };

  // Manejar eliminación del usuario
  const handleDelete = (userId: number) => {
    deleteUser(userId);
  };

  // Renderizar botones de acción (Editar y Eliminar)
  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex gap-2 justify-center">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-button-sm"
          onClick={() => {
            setSelectedUser(rowData);
            setIsFormOpen(true);
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-sm"
          onClick={() => showDeleteConfirm(rowData)}
        />
      </div>
    );
  };

  return (
    <div className="p-4">
      <ConfirmDialog />
      <div>
        <h1 className="text-2xl font-semibold text-center sm:text-left">User Management</h1>
      </div>
      {/* Header con buscador global */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4 gap-4">
  {/* Botón Add User (lado izquierdo en pantallas grandes) */}
  <div className="flex sm:order-1">
    <Button
      label="Add User"
      icon="pi pi-plus"
      outlined
      rounded
      onClick={() => {
        setSelectedUser(null);
        setIsFormOpen(true);
      }}
    />
  </div>

  {/* Contenedor para el input de búsqueda (lado derecho en pantallas grandes) */}
  <div className="relative w-full sm:w-auto sm:order-2">
    <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
    <InputText
      value={globalFilterValue}
      onChange={onGlobalFilterChange}
      placeholder="Search..."
      className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
</div>



      {/* DataTable para mostrar usuarios */}
      <div className="overflow-x-auto">
        <DataTable
          value={users}
          paginator
          rows={10}
          scrollable
          globalFilterFields={['name', 'email']}
          stripedRows
          emptyMessage="No users found."
          className="shadow-lg rounded-lg"
          responsiveLayout="scroll"
        >
          <Column
            field="name"
            header="Name"
            sortable
            filter
            frozen
            filterPlaceholder="Search by name"
          />
          <Column
            field="email"
            header="Email"
            sortable
            filter
            filterPlaceholder="Search by email"
          />
          <Column body={actionBodyTemplate} header="Actions" />
        </DataTable>
      </div>

      {/* Formulario Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <UserForm initialUser={selectedUser} onClose={() => setIsFormOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
