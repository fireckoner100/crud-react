import React, { useContext } from 'react';
import UserList from '../components/UserList.tsx';
import { AuthContext } from '../context/AuthContext.tsx';
import Navbar from '../components/Navbar.tsx';

const UserManagementPage: React.FC = () => {
  const { user, logout } = useContext(AuthContext)!;

  return (
    <>
    <Navbar user={user} logout={logout} />
    <div className="p-4">
      <UserList />
    </div>
    </>
  );
};

export default UserManagementPage;
