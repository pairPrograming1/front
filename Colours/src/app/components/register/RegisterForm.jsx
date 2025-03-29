"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter
import axios from "axios";
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
  const router = useRouter(); // Inicializar useRouter

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleRegister = async () => {
    let domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

    if (!domain || !clientId) {
      console.error("Las variables de entorno de Auth0 no están configuradas.");
      setError("Error interno. Por favor, contacta al administrador.");
      return;
    }

    // Asegúrate de que el dominio no tenga un prefijo `https://`
    domain = domain.replace(/^https?:\/\//, "");

    const { username, password, confirmPassword } = formData;

    // Validar que el username tenga un formato de correo electrónico válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Validar que la contraseña cumpla con los requisitos de seguridad
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, incluyendo letras mayúsculas, minúsculas, números y caracteres especiales."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `https://${domain}/dbconnections/signup`,
        {
          client_id: clientId,
          email: username,
          password,
          connection: "Username-Password-Authentication",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Registro exitoso:", response.data);
      setSuccess("Registro exitoso. ¡Bienvenido!");
      router.push("/"); // Redirigir a la ruta `/`
    } catch (err) {
      console.error("Error de registro:", err.response?.data || err.message);
      setError(
        err.response?.data?.error_description ||
          "Error al registrarse. Por favor, inténtalo de nuevo."
      );
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
        onClick={handleRegister}
        disabled={loading}
        className={`btn ${loading ? "btn-disabled" : "btn-primary"}`}
      >
        {loading ? "Cargando..." : "Registrarse"}
      </button>
    </form>
  );
}
