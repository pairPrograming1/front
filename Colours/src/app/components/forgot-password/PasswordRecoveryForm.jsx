import { useState } from "react";
import InputField from "./InputField";
import ResetButton from "./ResetButton";
import TermsAndConditions from "./TermsAndCondition";
import GoogleLogin from "./GoogleLogin";
import BackLink from "./BackLink";
import Link from "next/link";

export default function PasswordRecoveryForm() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleForgotPassword = () => {
    console.log("Recuperar contraseña");
  };

  return (
    <div className="bg-gray-0 p-8 rounded-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        Recupero de contraseña
      </h2>
      <form>
        <InputField
          label="WhatsApp"
          id="whatsapp"
          type="text"
          placeholder="WhatsApp"
        />
        <InputField
          label="Nueva Contraseña"
          id="new-password"
          type="password"
          placeholder="Nueva Contraseña"
        />
        <InputField
          label="Repetir Nueva Contraseña"
          id="repeat-password"
          type="password"
          placeholder="Repetir Nueva Contraseña"
        />

        <ResetButton onClick={handleForgotPassword} />

        <TermsAndConditions />

        <div className="mt-4 text-center">
          <span className="text-gray-300"> Si ya tenés cuenta podes </span>
          <Link href="/login" legacyBehavior>
            <a className="text-blue-500 hover:text-blue-700">Inicia sesión</a>
          </Link>
        </div>

        <GoogleLogin />

        <BackLink />
      </form>
    </div>
  );
}
