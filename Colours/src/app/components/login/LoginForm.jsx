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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleLogin = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await axios.post(
        "https://YOUR_AUTH0_DOMAIN/oauth/token",
        {
          grant_type: "password",
          username: username,
          password: password,
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
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-0">
      <div className="bg-gray-0 p-6 sm:p-8 rounded-lg w-full max-w-sm  ">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Bienvenido a
        </h2>

        <form>
          <InputField
            id="username"
            type="text"
            placeholder="Usuario"
            label="Usuario"
          />
          <InputField
            id="password"
            type="password"
            placeholder="******************"
            label="Contraseña"
          />

          <div className="mt-6 text-right">
            <Link
              href="/forgot-password"
              className="text-white hover:text-blue-400 text-sm transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <div className="flex items-center justify-center mt-6">
            <SubmitButton text="Ingresar" onClick={handleLogin} />
          </div>

          <OAuthButton />

          <div className="mt-6 text-center">
            <span className="text-gray-300 text-sm">
              Si aun no tenes cuenta podes{" "}
            </span>
            <Link
              href="/register"
              className="text-white hover:text-blue-400 text-sm transition-colors"
            >
              Regístrate
            </Link>
          </div>

          <BackLink href="/" text="Volver atrás" />
        </form>
      </div>
    </div>
  );
}
