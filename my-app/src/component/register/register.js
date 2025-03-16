import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Register() {
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

  return (
    <div>
      <div className="bg-gray-0 p-8 rounded-lg shadow-md w-full max-w-sm ">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Registro
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="dni"
            >
              DNI
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              id="dni"
              type="text"
              placeholder="DNI"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nombre y Apellido
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              id="name"
              type="text"
              placeholder="Nombre y Apellido"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Dirección
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              id="address"
              type="text"
              placeholder="Dirección"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              id="email"
              type="email"
              placeholder="Correo Electrónico"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="whatsapp"
            >
              WhatsApp
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              id="whatsapp"
              type="text"
              placeholder="WhatsApp"
            />
          </div>
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
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              id="password"
              type="password"
              placeholder="Contraseña"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Repetir Contraseña
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              id="confirmPassword"
              type="password"
              placeholder="Repetir Contraseña"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-gray-800 border border-gray-800 text-white font-bold py-2 px-3 rounded-full w-full focus:outline-none focus:shadow-outline hover:bg-gray-700"
              type="button"
            >
              Registrarme
            </button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-300">
              Al registrarte aceptas nuestros{" "}
              <Link href="/terms" legacyBehavior>
                <a className="text-blue-500 hover:text-blue-700">
                  términos, condiciones y políticas de privacidad
                </a>
              </Link>
            </span>
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-300">o continuar con Google</span>
            <button
              className="bg-white text-gray-700 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline flex items-center justify-center mt-2 mx-auto"
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
            <Link href="/login" legacyBehavior>
              <a className="text-blue-500 hover:text-blue-700">
                Iniciar sesión
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
