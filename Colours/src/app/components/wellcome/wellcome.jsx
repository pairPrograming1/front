"use client";
import { AlertCircle } from "lucide-react";
import { LogoutButton } from "../logout/LogoutButton"; // Ajustá el path si es necesario

export default function BienvenidaSinRol() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 text-white px-4 py-8">
      <div className="bg-gray-900/50 p-6 sm:p-10 rounded-2xl w-full max-w-3xl shadow-xl backdrop-blur-sm border border-teal-400/20 text-center">
        <div className="flex justify-center mb-6 text-yellow-400">
          <AlertCircle size={48} />
        </div>

        <h1 className="text-3xl font-bold mb-4">¡Bienvenido/a!</h1>

        <p className="text-white text-lg mb-2">
          Tu cuenta ha sido registrada correctamente.
        </p>

        <p className="text-gray-300 mb-6">
          Por favor, aguardá a que un administrador te asigne un rol para poder
          continuar usando la plataforma.
        </p>

        <div className="flex justify-center">
          <LogoutButtonStyled />
        </div>
      </div>
    </main>
  );
}

// Estilo visual coherente para el botón
function LogoutButtonStyled() {
  return (
    <LogoutButtonWrapper>
      <LogoutButton />
    </LogoutButtonWrapper>
  );
}

// Estilos aplicados al botón logout
function LogoutButtonWrapper({ children }) {
  return (
    <div className="inline-block">
      <div className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition duration-300 cursor-pointer">
        {children}
      </div>
    </div>
  );
}
