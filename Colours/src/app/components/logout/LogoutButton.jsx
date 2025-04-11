"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

export function LogoutButton() {
  const { setAuthData } = useContext(AuthContext);
  const { logout } = useAuth0();
  const router = useRouter();

  const handleLogout = () => {
    setAuthData(null); // Borra el estado de la sesión
    localStorage.removeItem("authData"); // Borra los datos del localStorage
    logout({ returnTo: window.location.origin }); // Cierra la sesión de Auth0
    setTimeout(() => {
      router.push("/login"); // Redirige a la ruta /login después de un breve retraso
    }, 500); // Retraso de 500ms
  };

  return <button onClick={handleLogout}>Logout</button>;
}
