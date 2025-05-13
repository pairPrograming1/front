"use client";
import { useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import OAuthButton from "./OAuthButton";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import apiUrls from "../utils/apiConfig";

const API_URL = apiUrls;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setAuthData } = useContext(AuthContext);

  const handleLogin = async () => {
    const userIdentifier = document.getElementById("userIdentifier").value;
    const password = document.getElementById("password").value;

    if (!userIdentifier || !password) {
      setError("Por favor, complete todos los campos");
      return;
    }

    const datosLogin = {
      userIdentifier: userIdentifier,
      password: password,
    };

    try {
      setLoading(true);
      // Primer paso: autenticación del usuario
      const respuesta = await axios.post(`${API_URL}/api/auth`, datosLogin);

      // Segundo paso: verificar el usuario para obtener su información completa incluyendo el rol
      const verificarResponse = await axios.post(
        `${API_URL}/api/users/verificar`,
        {
          usuario: userIdentifier.includes("@") ? undefined : userIdentifier,
          email: userIdentifier.includes("@") ? userIdentifier : undefined,
        }
      );

      if (!verificarResponse.data.registrado) {
        throw new Error("No se pudo verificar la información del usuario");
      }

      // Obtener el usuario desde la respuesta de verificación
      const userData = verificarResponse.data.usuario;

      // Validar si la cuenta está activa
      if (userData.isActive === false) {
        Swal.fire({
          icon: "error",
          title: "Cuenta inactiva",
          text: "Tu cuenta ha sido desactivada. Por favor contacta con soporte para más información.",
          confirmButtonColor: "#BF8D6B",
        });
        setLoading(false);
        setAuthData(null); // Limpiar contexto en caso de cuenta inactiva
        return;
      }

      // ESTRUCTURA ESTANDARIZADA PARA EL CONTEXTO
      const standardAuthData = {
        user: userData,
        token: respuesta.data.token || null,
        auth: {
          provider: "credentials",
          // Cualquier información específica adicional del inicio de sesión
          loginTime: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      // Guardar datos en el contexto con formato estandarizado
      setAuthData(standardAuthData);

      // Mostrar mensaje de éxito solo si la cuenta está activa
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: "Redirigiendo...",
        timer: 2000,
        showConfirmButton: false,
      });

      // Redireccionar según el rol
      if (userData.rol === "admin") {
        router.push("/prueba");
      } else if (userData.rol === "vendor") {
        router.push("/vendor");
      } else {
        // Si es un usuario común u otro rol
        router.push("/wellcome");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      let errorMessage =
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.";

      // Si hay un mensaje de error específico del servidor, mostrarlo
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
      setError(errorMessage);
      setAuthData(null); // Limpiamos el contexto en caso de error
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <div className="mb-2">
        <input
          id="userIdentifier"
          type="text"
          placeholder="Usuario o Email"
          className="w-full bg-transparent text-[#FFFFFF] border border-[#BF8D6B] rounded-md py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#BF8D6B] placeholder-[#EDEEF0]/70"
        />
      </div>

      <div className="mb-2 relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          className="w-full bg-transparent text-[#FFFFFF] border border-[#BF8D6B] rounded-md py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#BF8D6B] placeholder-[#EDEEF0]/70"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#BF8D6B]"
        >
          {showPassword ? (
            <EyeIcon className="h-5 w-5" />
          ) : (
            <EyeOffIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="text-right">
        <Link
          href="/forgot-password"
          className="text-[#EDEEF0] hover:text-[#BF8D6B] text-xs transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#BF8D6B] hover:bg-[#BF8D6B]/90 text-white font-medium py-3 px-4 rounded-md transition-all duration-300 mt-2"
      >
        {loading ? "Cargando..." : "Ingresar"}
      </button>

      <OAuthButton />

      <div className="text-center mt-4">
        <span className="text-[#EDEEF0] text-sm">
          Si aún no tienes cuenta puedes{" "}
        </span>
        <Link
          href="/register"
          className="text-[#FFFFFF] hover:underline text-sm font-medium"
        >
          Registrarte
        </Link>
      </div>
    </form>
  );
}
