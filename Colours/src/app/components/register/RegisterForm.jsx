"use client";

import { useState } from "react";
import InputField from "./InputField";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    dni: "",
    name: "",
    address: "",
    email: "",
    whatsapp: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://YOUR_AUTH0_DOMAIN/dbconnections/signup",
        {
          client_id: "YOUR_CLIENT_ID",
          email: formData.email,
          password: formData.password,
          connection: "Username-Password-Authentication",
          user_metadata: {
            dni: formData.dni,
            name: formData.name,
            address: formData.address,
            whatsapp: formData.whatsapp,
            username: formData.username,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Registro exitoso:", response.data);
      setSuccess("Usuario registrado exitosamente.");
    } catch (err) {
      console.error("Error en el registro:", err.response?.data || err.message);
      setError("Error al registrar el usuario. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6">
      {/* Distribución en 2 columnas para pantallas grandes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="DNI"
          type="text"
          id="dni"
          value={formData.dni}
          onChange={handleChange}
        />
        <InputField
          label="Nombre y Apellido"
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          label="Dirección"
          type="text"
          id="address"
          value={formData.address}
          onChange={handleChange}
        />
        <InputField
          label="Correo Electrónico"
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="WhatsApp"
          type="text"
          id="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
        />
        <InputField
          label="Usuario"
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <InputField
          label="Contraseña"
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <InputField
          label="Repetir Contraseña"
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white font-medium py-3 px-4 rounded-xl md:rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base shadow-lg hover:shadow-xl flex items-center justify-center mb-4"
      >
        {loading ? "Registrando..." : "Registrarme"}
      </button>
    </form>
  );
}
