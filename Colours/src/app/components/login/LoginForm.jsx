"use client";
import { useState } from "react";
import axios from "axios";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import OAuthButton from "./OAuthButton";
import BackLink from "./BackLink";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importar useRouter

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokenDeAcceso, setTokenDeAcceso] = useState("");
  const router = useRouter(); // Inicializar useRouter

  const clientId = "LQZvjXTatV5t7VzdekZ7sSYZYdoAyndN";
  const clientSecret =
    "9h4oAvPgxyky-4cLGLDlhsi_VXbUvI8XmZ5KlOhwJDJtAUEQrl3m_6BBsBBmtHHC";
  const dominioAuth0 = "pabloelleproso.us.auth0.com";

  const handleLogin = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const datosLogin = {
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      username,
      password,
      audience: `https://${dominioAuth0}/api/v2/`,
      realm: "Username-Password-Authentication",
    };

    try {
      setLoading(true);
      const respuesta = await axios.post(
        `https://${dominioAuth0}/oauth/token`,
        datosLogin
      );
      const tokenDeAcceso = respuesta.data.access_token;
      setTokenDeAcceso(tokenDeAcceso);

      console.log("Inicio de sesión exitoso.");

      router.push("/");
    } catch (error) {
      console.error("Error en la solicitud:", error);

      if (error.response) {
        console.error("Detalles del error:", error.response.data);
        setError(
          error.response.data.error_description ||
            "Ocurrió un error inesperado. Por favor, inténtalo de nuevo."
        );
      } else {
        setError("Error de red. Por favor, verifica tu conexión.");
      }
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
