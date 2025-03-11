"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-4">Home</h1>
      <button
        onClick={handleLoginClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Iniciar sesion
      </button>
      <button
        onClick={handleRegisterClick}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Registrarse
      </button>
    </div>
  );
}
