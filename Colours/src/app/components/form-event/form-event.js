"use client";

import { useState } from "react";

export default function FormularioEvento() {
  const [formData, setFormData] = useState({
    dni: "",
    nombreApellido: "",
    direccion: "",
    email: "",
    whatsapp: "",
    usuario: "",
    contrasena: "",
    repetirContrasena: "",
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
    console.log("Datos del formulario:", formData);
    // Aquí puedes agregar la lógica para enviar los datos
  };

  const handleGoBack = () => {
    window.history.back(); // Navegar atrás en el historial
  };

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-4">
        <header className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold">COLOUR</div>
        </header>

        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            Formulario de pedido de evento
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="dni"
              placeholder="DNI"
              value={formData.dni}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded-full text-white placeholder:text-gray-300 px-4 py-2"
            />

            <input
              type="text"
              name="nombreApellido"
              placeholder="Nombre y Apellido"
              value={formData.nombreApellido}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded-full text-white placeholder:text-gray-300 px-4 py-2"
            />

            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded-full text-white placeholder:text-gray-300 px-4 py-2"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded-full text-white placeholder:text-gray-300 px-4 py-2"
            />

            <input
              type="text"
              name="whatsapp"
              placeholder="WhatsApp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded-full text-white placeholder:text-gray-300 px-4 py-2"
            />

            <input
              type="text"
              name="usuario"
              placeholder="Usuario"
              value={formData.usuario}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded-full text-white placeholder:text-gray-300 px-4 py-2"
            />

            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={formData.contrasena}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded-full text-white placeholder:text-gray-300 px-4 py-2"
            />

            <input
              type="password"
              name="repetirContrasena"
              placeholder="Repetir Contraseña"
              value={formData.repetirContrasena}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded-full text-white placeholder:text-gray-300 px-4 py-2"
            />

            <button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-700 text-white rounded-full py-2 mt-6"
            >
              Registrarme
            </button>
          </form>

          <div className="mt-6 text-left">
            <a
              href="/no-events"
              onClick={handleGoBack}
              className="text-white-500 hover:underline"
            >
              Volver atrás
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
