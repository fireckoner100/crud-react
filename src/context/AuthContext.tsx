import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
  email: string;
  name: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Recuperar el usuario del localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      if (location.pathname === '/' || location.pathname === '/login') {
        navigate('/users', { replace: true });
      }
    } else {
      if (location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
    }
  }, [user, location.pathname, navigate]);

  const login = (email: string, password: string) => {
    // Validación simple login
    if (email === 'admin@example.com' && password === 'password') {
      const user = { email, name: 'Admin' };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user)); // Guardar en localStorage
      navigate('/users'); // Redirigir a la página de gestión de usuarios
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Eliminar del localStorage
    navigate('/login'); // Redirigir al login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
