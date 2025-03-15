"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center relative"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 0, 0.2), transparent 80%),rgb(5, 34, 62)`,
      }}
    >
      <h1 className="text-4xl mb-4">Home</h1>
      <button
        onClick={handleLoginClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 hover:shadow-lg hover:shadow-green-500/50"
      >
        Iniciar sesion
      </button>
      <button
        onClick={handleRegisterClick}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded hover:shadow-lg hover:shadow-green-500/50"
      >
        Registrarse
      </button>
    </div>
  );
}
