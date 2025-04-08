"use client";

import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // Importar SweetAlert2

export default function OAuthButton() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      Swal.fire({
        title: "¡Inicio de sesión exitoso!",
        text: `Bienvenido, ${user.name}`,
        icon: "success",
        confirmButtonText: "Continuar",
      }).then(() => {
        router.push("/users");
      });
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="text-center mt-4">
      <p className="text-[#EDEEF0] text-sm mb-2">o continuar con Google</p>
      <button
        className="transparent flex items-center justify-center mx-auto border-0"
        type="button"
        onClick={() => {
          loginWithRedirect({ connection: "google-oauth2" });
        }}
      >
        <Image
          src="/google-icon.svg"
          alt="Google Icon"
          width={40}
          height={40}
        />
      </button>
    </div>
  );
}
