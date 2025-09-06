"use client";

import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center  px-4">
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl  backdrop-blur-sm rounded-2xl p-8 md:p-10 ">
        <RegisterForm />
      </div>
    </div>
  );
}
