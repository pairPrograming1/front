"use client";

import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";

export default function GoogleLogin() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="text-center ">
      <span className="text-gray-300 text-sm block">
        o continuar con Google
      </span>
      <button
        className="transparent"
        type="button"
        onClick={() => loginWithRedirect({ connection: "google-oauth2" })}
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
