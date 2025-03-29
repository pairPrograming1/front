"use client";

import { useState } from "react";
import axios from "axios";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import OAuthButton from "./OAuthButton";
import BackLink from "./BackLink";
import Link from "next/link";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://YOUR_AUTH0_DOMAIN/oauth/token",
        {
          grant_type: "password",
          username,
          password,
          audience: "YOUR_API_IDENTIFIER",
          scope: "openid profile email",
          client_id: "YOUR_CLIENT_ID",
          client_secret: "YOUR_CLIENT_SECRET",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Login exitoso:", response.data);
      // Aquí puedes manejar el token de acceso (response.data.access_token)
    } catch (err) {
      console.error(
        "Error de autenticación:",
        err.response?.data || err.message
      );
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
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
