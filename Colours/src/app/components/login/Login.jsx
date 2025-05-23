"use client";

import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 px-4 py-12">
      <div className="w-full max-w-md bg-[#1E2330]/70 p-6 rounded-xl shadow-lg">
        <div className="mb-8">
          <h1 className="text-[#FFFFFF] text-3xl font-bold">Bienvenido</h1>
          <h2 className="text-[#FFFFFF] text-3xl font-bold mb-4">
            a ColourApp
          </h2>
          <p className="text-[#EDEEF0] text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            bibendum ultricies dui, laoreet commodo nunc dictum nec.
          </p>
        </div>
        <LoginForm />

        
      </div>
    </div>
  );
}
