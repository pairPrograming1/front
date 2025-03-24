"use client";

import Image from "next/image";

export default function OAuthButton() {
  return (
    <div className="text-center">
      <span className="text-gray-300 text-sm">o continuar con Google</span>
      <button
        className="bg-white text-gray-700 font-bold py-2 px-4 rounded-xl md:rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center mt-2 mx-auto hover:bg-gray-100 transition-colors"
        type="button"
      >
        <Image
          src="https://img.freepik.com/premium-psd/google-icon-3d-render_68185-1080.jpg?semt=ais_hybrid"
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
