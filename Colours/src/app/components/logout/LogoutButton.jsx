"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export function LogoutButton() {
  const { setAuthData } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    setAuthData(null); // Borra el estado de la sesión
    localStorage.removeItem("authData"); // Borra los datos del localStorage
    router.push("/login"); // Redirige a la ruta /login
  };

  return <button onClick={handleLogout}>Logout</button>;
}
