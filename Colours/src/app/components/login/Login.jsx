"use client";

import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-10 w-full max-w-sm md:max-w-md lg:max-w-lg border border-teal-400/30 shadow-xl">
        <h1 className="text-white text-2xl md:text-3xl font-bold text-center mb-6">
          Iniciar Sesión
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
