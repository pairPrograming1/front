"use client";

import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext"; // Ajusta la ruta según tu estructura
import apiUrls from "../utils/apiConfig";

const API_URL = apiUrls.production

export default function OAuthButton() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const router = useRouter();
  const { setAuthData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated && user) {
      Swal.fire({
        title: "¡Inicio de sesión exitoso!",
        text: `Bienvenido, ${user.name}`,
        icon: "success",
        confirmButtonText: "Continuar",
      }).then(async () => {
        try {
          // Verificar si el usuario existe en la base de datos
          const verifyResponse = await fetch(
           `${API_URL}/api/users/verificar`,
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

          if (!verifyResponse.ok || !verifyData.registrado) {
            // Si el usuario no existe, registrarlo
            const registerUser = async () => {
              try {
                const response = await fetch(
                  `${API_URL}/api/users/register`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      auth0Id: user.sub,
                      email: user.email,
                      apellido: user.family_name || "",
                      nombre: user.given_name || user.name,
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
                  // Verificar de nuevo para obtener el usuario recién creado
                  const newVerifyResponse = await fetch(
                    `${API_URL}/api/users/verificar`,
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

                  const newVerifyData = await newVerifyResponse.json();

                  if (newVerifyResponse.ok && newVerifyData.registrado) {
                    verifyData.usuario = newVerifyData.usuario;
                  }
                }
              } catch (error) {
                console.error("Error en la solicitud:", error);
              }
            };

            await registerUser();
          }

          // Guardar datos del usuario en el contexto
          if (verifyData.usuario) {
            const userData = verifyData.usuario;
            setAuthData({
              user: userData,
              rol: userData.rol,
              auth0User: user,
              isAuthenticated: true,
            });

            // Redireccionar según el rol
            if (userData.rol === "admin") {
              router.push("/prueba");
            } else if (userData.rol === "vendor") {
              router.push("/vendor");
            } else {
              // Usuario común u otro rol
              router.push("/wellcome");
            }
          } else {
            // Si no se pudo obtener el rol, redirigir a la ruta predeterminada
            setAuthData({
              auth0User: user,
              isAuthenticated: true,
            });
            router.push("/users");
          }
        } catch (error) {
          console.error("Error en la solicitud de verificación:", error);
          // En caso de error, redirigir a la ruta predeterminada
          router.push("/users");
        }
      });
    }
  }, [isAuthenticated, user, router, setAuthData]);

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
