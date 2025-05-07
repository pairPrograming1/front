"use client";

import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useContext } from "react"; // Añade useContext
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUserData } from "@/lib/slices/profileSlice";
import apiUrls from "../utils/apiConfig";
import { AuthContext } from "../../context/AuthContext"; // Importa el contexto

const API_URL = apiUrls;
const STORAGE_KEY = "app_session_ref";

export default function OAuthButton() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const router = useRouter();
  const dispatch = useDispatch();
  const { setAuthData } = useContext(AuthContext); // Accede al contexto

  useEffect(() => {
    if (isAuthenticated && user) {
      Swal.fire({
        title: "¡Inicio de sesión exitoso!",
        text: `Bienvenido, ${user.name}`,
        icon: "success",
        confirmButtonText: "Continuar",
      }).then(async () => {
        try {
          const verifyResponse = await fetch(`${API_URL}/api/users/verificar`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (!verifyResponse.ok || !verifyData.registrado) {
            const registerUser = async () => {
              try {
                const response = await fetch(`${API_URL}/api/users/register`, {
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
                });

                if (!response.ok) {
                  console.error(
                    "Error al registrar el usuario:",
                    response.statusText
                  );
                } else {
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

          // GUARDADO EN CONTEXTO (Aquí la modificación clave)
          if (verifyData.usuario) {
            const userData = verifyData.usuario;
            const combinedAuthData = {
              user: userData,
              auth0User: user,
              timestamp: new Date().toISOString(), // Opcional: marca temporal
            };

            // 1. Guardar en contexto (que automáticamente persiste en localStorage)
            setAuthData(combinedAuthData);

            // 2. Guardar en Redux (mantén esto si lo necesitas para otras partes)
            dispatch(setUserData(combinedAuthData));

            // Redirección según rol
            const redirectPath =
              userData.rol === "admin"
                ? "/prueba"
                : userData.rol === "vendor"
                ? "/vendor"
                : "/wellcome";

            router.push(redirectPath);
          } else {
            setAuthData(null); // Limpiar contexto si falla
            dispatch(setUserData({ user: null, auth0User: user }));
            router.push("/users");
          }
        } catch (error) {
          console.error("Error en la solicitud de verificación:", error);
          setAuthData(null); // Limpiar contexto en errores
          router.push("/users");
        }
      });
    }
  }, [isAuthenticated, user, router, dispatch, setAuthData]);

  return (
    <div className="text-center mt-4">
      <p className="text-[#EDEEF0] text-sm mb-2">o continuar con Google</p>
      <button
        className="transparent flex items-center justify-center mx-auto border-0 hover:opacity-80 transition-opacity cursor-pointer"
        type="button"
        onClick={() => loginWithRedirect({ connection: "google-oauth2" })}
      >
        <Image
          src="/google-icon.svg"
          alt="Google Icon"
          width={40}
          height={40}
          className="hover:scale-110 transition-transform duration-200"
        />
      </button>
    </div>
  );
}
