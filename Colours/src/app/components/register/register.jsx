"use client";

import RegisterForm from "./RegisterForm";
import OAuthButton from "../../components/login/OAuthButton";
import BackButton from "./BackButton";
import TermsAndConditions from "./TermsAndCondition";

export default function Register() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 px-4">
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl bg-[#1E2330]/70 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-lg">
        <h1 className="text-white text-2xl md:text-3xl font-bold text-center mb-6">
          Registro
        </h1>

        <RegisterForm />
        <TermsAndConditions />
        <OAuthButton />
        <BackButton />
      </div>
    </div>
  );
}
