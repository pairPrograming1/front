"use client";

import RegisterForm from "./RegisterForm";
import SocialLogin from "./SocialLogin";
import BackButton from "./BackButton";
import TermsAndConditions from "./TermsAndCondition";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-gray-800/100 backdrop-blur-sm rounded-2xl p-6 md:p-10 w-full max-w-lg md:max-w-2xl lg:max-w-3xl  ">
        <h1 className="text-white text-2xl md:text-3xl font-bold text-center mb-6">
          Registro
        </h1>

        <RegisterForm />
        <TermsAndConditions />
        <SocialLogin />
        <BackButton />
      </div>
    </div>
  );
}
