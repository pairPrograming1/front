import Image from "next/image";

export default function GoogleLogin() {
  return (
    <div className="mt-4 text-center">
      <span className="text-gray-300">o continuar con Google</span>
      <button
        className="bg-white text-gray-700 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline flex items-center justify-center mt-2 mx-auto"
        type="button"
      >
        <Image
          src="https://w7.pngwing.com/pngs/882/225/png-transparent-google-logo-google-logo-google-search-icon-google-text-logo-business-thumbnail.png"
          alt="Google Icon"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}
