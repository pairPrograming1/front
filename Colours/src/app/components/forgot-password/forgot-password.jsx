"use client";
import PasswordRecoveryForm from "./PasswordRecoveryForm";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center ">
      <div className="flex-1 flex justify-center">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-10 w-full max-w-sm md:max-w-md border border-teal-400/30 shadow-xl">
          <h1 className="text-white text-2xl md:text-3xl font-bold text-center mb-6">
            Recuperar Contraseña
          </h1>
          <PasswordRecoveryForm />
        </div>
      </div>
    </div>
  );
}
