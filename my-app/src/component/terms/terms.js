"use client";
import { useState } from "react";

const TermsAndConditions = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div
      className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center relative"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(25, 119, 97, 0.85), transparent 80%), rgb(5, 34, 62)`,
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="bg-transparent p-8 rounded-lg shadow-md w-full max-w-2xl text-white">
        <h1 className="text-2xl font-bold mb-4">Términos y Condiciones</h1>
        <p className="mb-4">
          Bienvenido a nuestra aplicación. Al usar esta aplicación, usted acepta
          cumplir con los siguientes términos y condiciones:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            Condición 1: Usted no debe usar la aplicación para ningún propósito
            ilegal.
          </li>
          <li className="mb-2">
            Condición 2: Usted es responsable de mantener la confidencialidad de
            su cuenta y contraseña.
          </li>
          <li className="mb-2">
            Condición 3: La aplicación se proporciona "tal cual" y "según
            disponibilidad".
          </li>
          <li className="mb-2">
            Condición 4: Nos reservamos el derecho de modificar o descontinuar
            la aplicación en cualquier momento.
          </li>
          <li className="mb-2">
            Condición 5: Usted acepta indemnizar y eximir de responsabilidad a
            la empresa por cualquier reclamo relacionado con su uso de la
            aplicación.
          </li>
          {/* ...agregar más condiciones según sea necesario... */}
        </ul>
        <p>
          Si no está de acuerdo con estos términos y condiciones, por favor no
          use nuestra aplicación.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
