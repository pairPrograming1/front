"use client";

import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

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
      }).then(async () => {
        try {
          const verifyResponse = await fetch(
            "http://localhost:4000/api/users/verificar",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user.email,
              }),
            }
          );

          const verifyData = await verifyResponse.json();
          console.log("Respuesta de verificación:", verifyData);

          if (!verifyResponse.ok || !verifyData.registered) {
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
                      apellido: user.family_name,
                      nombre: user.given_name,
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

            await registerUser();
          }
        } catch (error) {
          console.error("Error en la solicitud de verificación:", error);
        }

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
