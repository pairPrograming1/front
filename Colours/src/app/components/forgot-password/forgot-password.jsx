"use client";

import PasswordRecoveryForm from "./PasswordRecoveryForm";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 px-4">
      <div className="w-full max-w-sm md:max-w-md bg-[#1E2330]/70 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-lg">
        <h1 className="text-white text-2xl md:text-3xl font-bold text-center mb-6">
          Recuperar Contraseña
        </h1>
        <PasswordRecoveryForm />
      </div>
    </div>
  );
}
