import { createContext, useContext, useEffect, useState } from 'react';
import api, { setAuthToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('journalToken');
    if (saved) {
      setAuthToken(saved);
      setToken(saved);
      try {
        const payload = JSON.parse(atob(saved.split('.')[1]));
        if (payload?.username) setUser({ username: payload.username });
      } catch {}
    }
    setLoading(false);
  }, []);

  const signup = async (username, password) => {
    await api.post('/auth/signup', { username, password });
  };

  const login = async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password });
    setAuthToken(data.token);
    setToken(data.token);
    setUser({ username });
  };

  const logout = () => {
    setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}