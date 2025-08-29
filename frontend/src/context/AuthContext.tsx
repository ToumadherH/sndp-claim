import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

type AuthContextType = {
  token: string | null;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token); else localStorage.removeItem("token");
    if (role) localStorage.setItem("role", role); else localStorage.removeItem("role");
  }, [token, role]);

  const login = async (email: string, password: string) => {
    const res = await API.post("/auth/login", { email, password });
    setToken(res.data.token);
    setRole(res.data.role);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
