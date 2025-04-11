"use client";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(() => {
    // Verificar si estamos en el cliente antes de acceder a localStorage
    if (typeof window !== "undefined") {
      const storedAuthData = localStorage.getItem("authData");
      return storedAuthData ? JSON.parse(storedAuthData) : null;
    }
    return null;
  });

  useEffect(() => {
    // Guardar authData en localStorage cuando cambie, solo en el cliente
    if (typeof window !== "undefined") {
      if (authData) {
        localStorage.setItem("authData", JSON.stringify(authData));
      } else {
        localStorage.removeItem("authData");
      }
    }
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}
