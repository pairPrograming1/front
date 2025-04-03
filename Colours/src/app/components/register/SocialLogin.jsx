"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function SocialLogin() {
  const { loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    if (user) {
      console.log("Datos del usuario:", user);
    }
  }, [user]);

  return (
    <div className="text-center mt-6">
      <span className="text-gray-300">o continuar con Google</span>
      <button
        className="bg-white text-gray-700 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline flex items-center justify-center mt-2 mx-auto"
        type="button"
        onClick={() => loginWithRedirect({ connection: "google-oauth2" })}
      >
        <Image
          src="https://w7.pngwing.com/pngs/612/285/png-transparent-logo-google-g-google-s-logo-icon-thumbnail.png"
          alt="Google Icon"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      </button>

      <p className="mt-4 text-gray-300">
        Si ya tienes cuenta, puedes{" "}
        <Link href="/login" className="text-teal-400 hover:text-teal-300 mb-4">
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}
