import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import UserManagementPage from './pages/UserManagementPage.tsx';
import AuthProvider from './context/AuthContext.tsx';
import UserProvider from './context/UserContext.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';




const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/users" element={<UserManagementPage />} />
            </Route>
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
