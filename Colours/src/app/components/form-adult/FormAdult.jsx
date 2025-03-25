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
    <div className="min-h-screen relative overflow-hidden ">
      <header className="flex justify-between items-center p-4 md:p-8 lg:p-10 bg-black/30 backdrop-blur-sm">
        <div className="flex items-center">
          <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
            <span className="text-white">Bienvenido a</span>
            <span className="text-teal-400 ml-2"></span>
          </span>
        </div>
      </header>

      <div className="w-full px-4 sm:px-6 md:px-0 pt-6 pb-20 mt-4 sm:mt-8 md:mt-16">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-none md:rounded-2xl p-6 md:p-10 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto border-t border-b border-teal-400/30 md:border">
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-8 flex items-center">
            <span className="bg-teal-400 w-2 h-8 md:h-10 mr-3 rounded hidden md:block"></span>
            Formulario Adulto
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:gap-6"
          >
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
            </div>

            <div className="mt-2 md:mt-4">
              <SubmitButton text="Asignar Entrada" />
            </div>
          </form>

          <div className="mt-6 md:mt-10">
            <BackButton onClick={handleGoBack} />
          </div>
        </div>
      </div>
    </div>
  );
}
