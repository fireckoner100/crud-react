import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import UserManagementPage from './pages/UserManagementPage.tsx';
import AuthProvider from './context/AuthContext.tsx';
import UserProvider from './context/UserContext.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';




const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/users" element={<UserManagementPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
