"use client";

import Image from "next/image";
import Link from "next/link";

export default function SocialLogin() {
  return (
    <div className="text-center mt-6">
      <span className="text-gray-300">o continuar con Google</span>
      <button
        className="bg-white text-gray-700 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline flex items-center justify-center mt-2 mx-auto"
        type="button"
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px"
          alt="Google Icon"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      </button>

      <p className="mt-4 text-gray-300">
        Si ya tienes cuenta, puedes{" "}
        <Link href="/login" className="text-teal-400 hover:text-teal-300">
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}
