import Image from "next/image";

export default function OAuthButton() {
  return (
    <div className="mt-6 text-center">
      <span className="text-gray-300 text-sm">o continuar con Google</span>
      <button
        className="bg-white text-gray-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center mt-2 mx-auto hover:bg-gray-100 transition-colors"
        type="button"
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google Icon"
          width={20}
          height={20}
        />
        <span className="ml-2">Google</span>
      </button>
    </div>
  );
}
