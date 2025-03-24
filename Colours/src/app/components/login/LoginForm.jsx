"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import OAuthButton from "./OAuthButton";
import BackLink from "./BackLink";
import Link from "next/link";

export default function LoginForm() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await axios.post(
        "https://YOUR_AUTH0_DOMAIN/oauth/token",
        {
          grant_type: "password",
          username,
          password,
          audience: "YOUR_API_IDENTIFIER",
          scope: "openid",
          client_id: "YOUR_CLIENT_ID",
          client_secret: "YOUR_CLIENT_SECRET",
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col gap-6">
      <InputField id="username" type="text" label="Usuario" />
      <InputField id="password" type="password" label="Contraseña" />

      <div className="text-right">
        <Link
          href="/forgot-password"
          className="text-white hover:text-teal-400 text-sm transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <SubmitButton text="Ingresar" onClick={handleLogin} />
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
