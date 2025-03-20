import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

export default function Login() {
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
    <div>
      <div className="bg-gray-0 p-8 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Bienvenido a
        </h2>

        <form>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Usuario
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              id="username"
              type="text"
              placeholder="Usuario"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="Contraseña"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="mt-6 text-right">
            <Link href="/forgot-password" legacyBehavior>
              <a className="text-white hover:text-blue-700">
                ¿Olvidaste tu contraseña?
              </a>
            </Link>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              className="bg-gray-800 border border-transparent hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={handleLogin}
            >
              Ingresar
            </button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-300">o continuar con Google</span>
            <button
              className="bg-white text-gray-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center mt-2 mx-auto"
              type="button"
            >
              <Image
                src="https://w7.pngwing.com/pngs/882/225/png-transparent-google-logo-google-logo-google-search-icon-google-text-logo-business-thumbnail.png"
                alt="Google Icon"
                width={20}
                height={20}
              />
            </button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-300">
              {" "}
              Si aun no tenes cuenta podes{" "}
            </span>
            <Link href="/register" legacyBehavior>
              <a className="text-white hover:text-blue-700">Regístrate</a>
            </Link>
          </div>

          <div className="mt-6 text-left">
            <Link href="/" legacyBehavior>
              <a className="text-white-500 hover:underline">Volver atrás</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
