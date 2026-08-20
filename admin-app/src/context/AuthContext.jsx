import { createContext, useContext, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('adminUser');
    return saved ? JSON.parse(saved) : null;
  });

  async function login(email, password) {
    const res = await api.post('/auth/login', { email, password });

    // Reject non-admin accounts right here on the client for a quick UX response —
    // the backend's adminOnly middleware is still the real enforcement layer.
    if (res.data.user.role !== 'admin') {
      throw new Error('This account does not have admin access');
    }

    localStorage.setItem('adminToken', res.data.token);
    localStorage.setItem('adminUser', JSON.stringify(res.data.user));
    setAdmin(res.data.user);
  }

  function logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
