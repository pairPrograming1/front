import React, { useState, useEffect } from "react";
import Link from "next/link";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(25, 119, 97, 0.85), transparent 80%),rgb(5, 34, 62)`,
      }}
    >
      <h1>Bienvenido a la página principal</h1>
      <Link href="/login" legacyBehavior>
        <a>Ir a la página de inicio de sesión</a>
      </Link>
      <div className="mt-4 text-center">
        <Link href="/profile" legacyBehavior>
          <a className="text-white hover:text-blue-700">Ir a Perfil</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
