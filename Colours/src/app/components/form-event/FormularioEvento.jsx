"use client";

import { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import BackButton from "./BackButton";

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
  };

  const handleGoBack = () => {
    window.history.back();
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
            <InputField
              type="text"
              name="dni"
              placeholder="DNI"
              value={formData.dni}
              onChange={handleChange}
            />
            <InputField
              type="text"
              name="nombreApellido"
              placeholder="Nombre y Apellido"
              value={formData.nombreApellido}
              onChange={handleChange}
            />
            <InputField
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleChange}
            />
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              type="text"
              name="whatsapp"
              placeholder="WhatsApp"
              value={formData.whatsapp}
              onChange={handleChange}
            />
            <InputField
              type="text"
              name="usuario"
              placeholder="Usuario"
              value={formData.usuario}
              onChange={handleChange}
            />
            <InputField
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={formData.contrasena}
              onChange={handleChange}
            />
            <InputField
              type="password"
              name="repetirContrasena"
              placeholder="Repetir Contraseña"
              value={formData.repetirContrasena}
              onChange={handleChange}
            />

            <SubmitButton text="Registrarme" />
          </form>

          <BackButton onClick={handleGoBack} />
        </div>
      </div>
    </div>
  );
}
