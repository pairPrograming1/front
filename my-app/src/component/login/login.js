import React, { useState, useEffect } from "react";
import Link from "next/link";

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

  const handleLogin = () => {
    console.log("Iniciar sesión");
  };

  return (
    <div>
      <div className="bg-gray-0 p-8 rounded-lg shadow-md w-full max-w-sm">
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
              <img
                src="https://w7.pngwing.com/pngs/882/225/png-transparent-google-logo-google-logo-google-search-icon-google-text-logo-business-thumbnail.png"
                alt="Google Icon"
                className="w-5 h-5"
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
        </form>
      </div>
    </div>
  );
}
