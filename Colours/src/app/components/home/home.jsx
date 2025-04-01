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
    <div>
      <h1>Bienvenido a la página principal</h1>
      <Link href="/login" legacyBehavior>
        <a>hola Ir a la página de inicio de sesión</a>
      </Link>
      <div className="mt-4 text-center">
        <Link href="/profile" legacyBehavior>
          <a className="text-white hover:text-blue-700">Ir a Perfil</a>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Link href="/my-entries" legacyBehavior>
          <a className="text-white hover:text-blue-700">Ir a Mis Entradas</a>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Link href="/form-adult" legacyBehavior>
          <a className="text-white hover:text-blue-700">Ir formulario adulto</a>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Link href="/form-menor" legacyBehavior>
          <a className="text-white hover:text-blue-700">
            Ir formulario menores
          </a>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Link href="/no-events" legacyBehavior>
          <a className="text-white hover:text-blue-700">Ir no hay eventos</a>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Link href="/form-event" legacyBehavior>
          <a className="text-white hover:text-blue-700">
            Ir a pedido de eventos
          </a>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Link href="/event-ticket-selector" legacyBehavior>
          <a className="text-white hover:text-blue-700">
            Ir a selector de eventos
          </a>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Link href="/payment" legacyBehavior>
          <a className="text-white hover:text-blue-700">Ir a pagar</a>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Link href="/collection" legacyBehavior>
          <a className="text-white hover:text-blue-700">Ir a cobros</a>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Link href="/event" legacyBehavior>
          <a className="text-white hover:text-blue-700">Ir a eventos</a>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Link href="/start-salons" legacyBehavior>
          <a className="text-white hover:text-blue-700">Ir a inicio salones</a>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Link href="/admin" legacyBehavior>
          <a className="text-white hover:text-blue-700">Ir a dashboard admin</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
