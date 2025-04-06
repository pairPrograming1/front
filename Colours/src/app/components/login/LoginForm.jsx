"use client";
import { useState } from "react";
import axios from "axios"; // Importar axios
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import OAuthButton from "./OAuthButton";
import BackLink from "./BackLink";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importar useRouter

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // Inicializar useRouter

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
      router.push("/");
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6">
      <InputField id="username" type="text" label="Usuario" />
      <InputField id="password" type="password" label="Contraseña" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="text-right">
        <Link
          href="/forgot-password"
          className="text-white hover:text-teal-400 text-sm transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      <SubmitButton
        text={loading ? "Cargando..." : "Ingresar"}
        onClick={handleLogin}
        disabled={loading}
      />
      <OAuthButton />
      <div className="text-center">
        <span className="text-gray-300 text-sm">¿Aún no tienes cuenta?</span>
        <Link
          href="/register"
          className="text-white hover:text-teal-400 text-sm transition-colors ml-1"
        >
          Regístrate
        </Link>
      </div>
      <BackLink href="/" text="Volver atrás" />
    </form>
  );
}
