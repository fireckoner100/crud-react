import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { UserContext } from '../context/UserContext.tsx';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
        

interface UserFormProps {
  initialUser?: { id: number; name: string; email: string } | null;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
}

const UserForm: React.FC<UserFormProps> = ({ initialUser, onClose }) => {
  const { addUser, updateUser } = useContext(UserContext)!;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: initialUser?.name || '',
      email: initialUser?.email || '',
    },
  });

  const onSubmit = (data: FormData) => {
    if (initialUser) {
      updateUser(initialUser.id, { id: initialUser.id, ...data });
    } else {
      const newUser = { id: Date.now(), ...data };
      addUser(newUser);
    }
    onClose();
  };

  return (
    <Card title={initialUser ? 'Edit User' : 'Add User'}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      {/* Nombre */}
        <div className='mb-5'>
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Name is required',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Name must not contain numbers',
              },
            }}
            render={({ field }) => (
              <InputText
                id="name"
                {...field}
                className={`w-full ${errors.name ? 'p-invalid' : ''}`}
                placeholder="Enter name"
              />
            )}
          />
          {errors.name && (
            <small className="p-error block mb-4">{errors.name.message}</small>
          )}
        </div>

      {/* Email */}
        <div className='mb-5'>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            }}
            render={({ field }) => (
              <InputText
                id="email"
                {...field}
                className={`w-full ${errors.email ? 'p-invalid' : ''}`}
                placeholder="Enter email"
              />
            )}
          />
          {errors.email && (
            <small className="p-error block mb-4">{errors.email.message}</small>
          )}
        </div>

      {/* Botones */}
      <div className="flex justify-center gap-2">
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-secondary"
          onClick={onClose}
          type="button"
        />
        <Button
          label={initialUser ? 'Update' : 'Add'}
          icon="pi pi-check"
          className="p-button-primary"
          type="submit"
        />
      </div>
    </form>
    </Card>
  );
};

export default UserForm;
