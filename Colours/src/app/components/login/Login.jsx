"use client"

import LoginForm from "./LoginForm"

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-[#FFFFFF] text-3xl font-bold">Bienvenido</h1>
          <h2 className="text-[#FFFFFF] text-3xl font-bold mb-4">a ColourApp</h2>
          <p className="text-[#EDEEF0] text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus bibendum ultricies dui, laoreet commodo
            nunc dictum nec.
          </p>
        </div>
        <LoginForm />

        {/* Logo en la parte inferior */}
        
      </div>
    </div>
  )
}



