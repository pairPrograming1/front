"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

export function LogoutButton() {
  const { setAuthData } = useContext(AuthContext);
  const { logout } = useAuth0();
  const router = useRouter();

  // const handleLogout = () => {
  //   setAuthData(null); // Borra el estado de la sesión
  //   localStorage.removeItem("authData"); // Borra los datos del localStorage
  //   logout({ returnTo: window.location.origin }); // Cierra la sesión de Auth0
  //   setTimeout(() => {
  //     router.push("/login"); // Redirige a la ruta /login después de un breve retraso
  //   }, 500); // Retraso de 500ms
  // };
  const handleLogout = () => {
    // Determine the current URL (works in both local and deployed environments)
    const currentOrigin = window.location.origin;
    
    // Clear local state first
    setAuthData(null);
    localStorage.removeItem("authData");
    
    // Use the current origin as the returnTo URL
    logout({ 
      logoutParams: { 
        returnTo: currentOrigin 
      } 
    });
    
    // Note: No need for router.push here as Auth0 will handle the redirect
  };

 

  return <button onClick={handleLogout}>Logout</button>;
}
