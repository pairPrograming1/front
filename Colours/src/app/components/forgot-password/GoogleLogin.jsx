"use client";

import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";

export default function GoogleLogin() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="text-center">
      <span className="text-gray-300 text-sm">o continuar con Google</span>
      <button
        className="bg-white text-gray-700 font-bold py-2 px-4 rounded-xl md:rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center mt-2 mx-auto hover:bg-gray-100 transition-colors"
        type="button"
        onClick={() => loginWithRedirect({ connection: "google-oauth2" })}
      >
        <Image
          src="https://w7.pngwing.com/pngs/612/285/png-transparent-logo-google-g-google-s-logo-icon-thumbnail.png"
          alt="Google Icon"
          width={20}
          height={20}
          unoptimized
        />
        <span className="ml-2">Google</span>
      </button>
    </div>
  );
}
