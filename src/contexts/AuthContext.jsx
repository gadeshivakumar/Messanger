import { createContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setIsLoading(false);
          return;
        }

        const res = await authAPI.checkLogin();
        if (!res.ok) throw new Error("Not logged in");

        const data = await res.json();
        setUser({
          username: data.username,
          phone: data.phone,
          token: data.token
        });

        // Store token in localStorage
        localStorage.setItem('authToken', data.token);
      } catch {
        setUser(null);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  const login = async (phone, password) => {
    try {
      const response = await authAPI.login(phone, password);
      if (response.ok) {
        const data = await response.json();
        const userData = {
          username: data.user.username,
          phone: data.user.phone,
          token: data.user.token
        };
        setUser(userData);
        localStorage.setItem('authToken', data.user.token);
        return { success: true };
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
        return { success: false, message: errorData.message || 'Login failed' };
      }
    } catch {
      return { success: false, message: 'Network error occurred' };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('authToken');
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;