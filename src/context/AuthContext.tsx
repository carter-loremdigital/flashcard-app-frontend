// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
// import { logoutUser } from "../api/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // On mount, check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string, refreshToken: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    setIsAuthenticated(true);
  };

  // Use logoutUser function created in auth.tsx
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false); // This update should trigger a re-render in the header
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
