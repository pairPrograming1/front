"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // Eliminamos el import de Menu

export default function Menor() {
  const [formData, setFormData] = useState({
    nombreApellido: "",
    dni: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Aquí iría la lógica para asignar entrada
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-0">
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <span className="text-white text-2xl font-bold">
            <span className="inline-block mr-1"></span>
            <span className="text-white">Bienvenido a</span>
          </span>
        </div>
      </header>

      <div className="px-6 pt-4 pb-20 mt-20">
        <Link href="/" className="flex items-center text-white mb-6">
          <ArrowLeft size={18} className="mr-1" />
          <span>Volver atrás</span>
        </Link>

        <h1 className="text-white text-2xl font-bold mb-6">Menores</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="nombreApellido"
            placeholder="Nombre y Apellido"
            value={formData.nombreApellido}
            onChange={handleChange}
            className="bg-transparent text-white border border-teal-400 rounded-full py-3 px-4 focus:outline-none focus:ring-1 focus:ring-teal-300"
          />

          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={formData.dni}
            onChange={handleChange}
            className="bg-transparent text-white border border-teal-400 rounded-full py-3 px-4 focus:outline-none focus:ring-1 focus:ring-teal-300"
          />

          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-full mt-4 transition-colors"
          >
            Asignar Entrada
          </button>
        </form>
      </div>
    </div>
  );
}
