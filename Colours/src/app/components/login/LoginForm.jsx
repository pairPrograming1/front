"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import OAuthButton from "./OAuthButton";
import Swal from "sweetalert2";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const datosLogin = {
      usuario: username,
      password: password,
    };

    try {
      setLoading(true);
      const respuesta = await axios.post(
        "http://localhost:4000/api/auth",
        datosLogin
      );
      console.log("Inicio de sesión exitoso:", respuesta.data);
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: "Redirigiendo...",
        timer: 2000,
        showConfirmButton: false,
      });
      router.push("/users");
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="flex flex-col gap-4">
      <div className="mb-2">
        <input
          id="username"
          type="text"
          placeholder="Usuario"
          className="w-full bg-transparent text-[#FFFFFF] border border-[#BF8D6B] rounded-md py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#BF8D6B] placeholder-[#EDEEF0]/70"
        />
      </div>

      <div className="mb-2 relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          className="w-full bg-transparent text-[#FFFFFF] border border-[#BF8D6B] rounded-md py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#BF8D6B] placeholder-[#EDEEF0]/70"
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
        type="button"
        onClick={handleLogin}
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
          className="text-[#BF8D6B] hover:underline text-sm font-medium"
        >
          Registrarte
        </Link>
      </div>
    </form>
  );
}
