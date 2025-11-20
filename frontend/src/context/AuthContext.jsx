import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { authApi, setAuthToken } from '../services/api';

const AuthContext = createContext();

const storageKey = 'recipehub-user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setTokenState] = useState(() => localStorage.getItem('recipehub-token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  const persistSession = useCallback(({ user: nextUser, token: nextToken }) => {
    setUser(nextUser);
    setTokenState(nextToken);
    localStorage.setItem(storageKey, JSON.stringify(nextUser));
    setAuthToken(nextToken);
  }, []);

  const clearSession = useCallback(() => {
    setUser(null);
    setTokenState(null);
    setAuthToken(null);
    localStorage.removeItem(storageKey);
  }, []);

  const handleAction = useCallback(async (action) => {
    setLoading(true);
    setError(null);
    try {
      const result = await action();
      if (result?.user && result?.token) {
        persistSession(result);
      }
      return result;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [persistSession]);

  const login = useCallback(
    (payload) => handleAction(() => authApi.login(payload)),
    [handleAction]
  );

  const register = useCallback(
    (payload) => handleAction(() => authApi.register(payload)),
    [handleAction]
  );

  const updateProfile = useCallback(
    (payload) => handleAction(() => authApi.update(payload)),
    [handleAction]
  );

  const logout = useCallback(() => clearSession(), [clearSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      authenticated: Boolean(token),
      login,
      register,
      updateProfile,
      logout,
      clearError: () => setError(null),
    }),
    [user, token, loading, error, login, register, updateProfile, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

