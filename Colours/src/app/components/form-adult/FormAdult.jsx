"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "./InputFields";
import SubmitButton from "./SubmitButton";
import BackButton from "./BackButton";

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

          <InputField
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            type="tel"
            name="whatsapp"
            placeholder="WhatsApp"
            value={formData.whatsapp}
            onChange={handleChange}
          />

          <SubmitButton text="Asignar Entrada" />
        </form>

        <BackButton onClick={handleGoBack} />
      </div>
    </div>
  );
}
