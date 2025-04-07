"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function SocialLogin() {
  const { loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    if (user) {
      console.log("Datos del usuario:", user);

      // Realizar el POST a la API
      const registerUser = async () => {
        try {
          const response = await fetch(
            "http://localhost:4000/api/users/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                auth0Id: user.sub,
                email: user.email,
              }),
            }
          );

          if (!response.ok) {
            console.error(
              "Error al registrar el usuario:",
              response.statusText
            );
          } else {
            console.log("Usuario registrado exitosamente");
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
      };

      registerUser();
    }
  }, [user]);

  return (
    <div className="text-center mt-6">
      <span className="text-gray-300">o continuar con Google</span>
      <button
        className="transparent flex items-center justify-center mt-2 mx-auto"
        type="button"
        onClick={() => loginWithRedirect({ connection: "google-oauth2" })}
      >
        <Image
          src="/google-icon.svg"
          alt="Google Icon"
          width={40}
          height={40}
        />
      </button>

      <p className="mt-4 text-gray-300">
        Si ya tienes cuenta, puedes{" "}
        <Link href="/login" className="text-teal-400 hover:text-teal-300 mb-4">
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}
