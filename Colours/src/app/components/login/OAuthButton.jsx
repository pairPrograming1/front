import Image from "next/image";

export default function OAuthButton() {
  return (
    <div className="mt-4 text-center">
      <span className="text-gray-300">o continuar con Google</span>
      <button
        className="bg-white text-gray-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center mt-2 mx-auto"
        type="button"
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google Icon"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}
