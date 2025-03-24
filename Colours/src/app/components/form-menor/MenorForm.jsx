"use client";

import { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import BackLink from "./BackLink";

export default function MenorForm() {
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
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-0">
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <span className="text-white text-2xl font-bold">
            <span className="text-white">Bienvenido a</span>
          </span>
        </div>
      </header>

      <div className="px-6 pt-4 pb-20 mt-20">
        <h1 className="text-white text-2xl font-bold mb-6">Menores</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            type="text"
            name="nombreApellido"
            placeholder="Nombre y Apellido"
            value={formData.nombreApellido}
            onChange={handleChange}
          />
          <InputField
            type="text"
            name="dni"
            placeholder="DNI"
            value={formData.dni}
            onChange={handleChange}
          />
          <SubmitButton text="Asignar Entrada" />
        </form>

        <BackLink href="/" text="Volver atrás" />
      </div>
    </div>
  );
}
