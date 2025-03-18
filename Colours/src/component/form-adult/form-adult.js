"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormAdult() {
  const [formData, setFormData] = useState({
    nombreApellido: "",
    dni: "",
    email: "",
    whatsapp: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <span className="text-white text-2xl font-bold">
            <span className="text-white">Bienvenido a</span>
          </span>
        </div>
      </header>

      <div className="px-6 pt-4 pb-20 mt-20">
        <h1 className="text-white text-2xl font-bold mb-6">Adulto</h1>

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

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-transparent text-white border border-teal-400 rounded-full py-3 px-4 focus:outline-none focus:ring-1 focus:ring-teal-300"
          />

          <input
            type="tel"
            name="whatsapp"
            placeholder="WhatsApp"
            value={formData.whatsapp}
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
        <button
          onClick={handleGoBack}
          className="mt-6 text-teal-300 hover:text-teal-400 text-lg"
        >
          Volver Atrás
        </button>
      </div>
    </div>
  );
}
