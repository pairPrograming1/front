"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import { AuthContext } from "../../context/AuthContext";

export function LogoutButton() {
  const { setAuthData } = useContext(AuthContext);
  const router = useRouter(); // Inicializa el router

  const handleLogout = () => {
    setAuthData(null); // Borra el estado de la sesión
    router.push("/login"); // Redirige a la ruta /login
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export { LogoutButton };
