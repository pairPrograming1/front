"use client";

import { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import BackLink from "./BackLink";
import FormContainer from "./FormContainer";

export default function MenorForm() {
  const [formData, setFormData] = useState({
    nombreApellido: "",
    dni: "",
    // Puedes agregar más campos si necesitas
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
    <FormContainer title="Menores">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
        </div>

        <div className="mt-2 md:mt-4">
          <SubmitButton text="Asignar Entrada" />
        </div>
      </form>

      <div className="mt-6 md:mt-10">
        <BackLink href="/" />
      </div>
    </FormContainer>
  );
}
