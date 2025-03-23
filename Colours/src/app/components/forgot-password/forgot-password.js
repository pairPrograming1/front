import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component

export default function ForgotPassword() {
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

  const handleForgotPassword = () => {
    console.log("Recuperar contraseña");
  };

  return (
    <div>
      <div className="bg-gray-0 p-8 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Recupero de contraseña
        </h2>
        <form>
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
              htmlFor="new-password"
            >
              Nueva Contraseña
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              id="new-password"
              type="password"
              placeholder="Nueva Contraseña"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="repeat-password"
            >
              Repetir Nueva Contraseña
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              id="repeat-password"
              type="password"
              placeholder="Repetir Nueva Contraseña"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleForgotPassword}
            >
              Resetear Contraseña
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
              <Image
                src="https://w7.pngwing.com/pngs/882/225/png-transparent-google-logo-google-logo-google-search-icon-google-text-logo-business-thumbnail.png"
                alt="Google Icon"
                width={20}
                height={20}
              />
            </button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-300"> Si ya tenés cuenta podes </span>
            <Link href="/login" legacyBehavior>
              <a className="text-blue-500 hover:text-blue-700">Inicia sesión</a>
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link href="/login" legacyBehavior>
              <a className="text-white-500 hover:underline">Volver atrás</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
