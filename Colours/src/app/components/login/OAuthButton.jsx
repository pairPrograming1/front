"use client";

import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";

export default function OAuthButton() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  return (
    <div className="text-center mt-4">
      <p className="text-[#EDEEF0] text-sm mb-2">o continuar con Google</p>
      <button
        className="transparent flex items-center justify-center mx-auto border-0"
        type="button"
        onClick={() => {
          loginWithRedirect({ connection: "google-oauth2" });
          if (isAuthenticated) {
            console.log("Login exitoso:", user);
          } else {
            console.log("Login fallido");
          }
        }}
      >
        <Image
          src="/google-icon.svg"
          alt="Google Icon"
          width={40}
          height={40}
        />
      </button>
    </div>
  );
}
