"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import InputField from "./InputField";
import Swal from "sweetalert2"; // Importar SweetAlert

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    dni: "",
    name: "",
    apellido: "",
    address: "",
    email: "",
    whatsapp: "",
    username: "",
    password: "",
    confirmPassword: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleRegister = async () => {
    const {
      dni,
      name,
      apellido,
      address,
      email,
      whatsapp,
      username,
      password,
      confirmPassword,
      isActive,
    } = formData;

    // Validar que todos los campos estén completos
    if (
      !dni ||
      !name ||
      !apellido ||
      !address ||
      !email ||
      !whatsapp ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

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
      // Registro en Auth0
      let domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

      if (!domain || !clientId) {
        console.error(
          "Las variables de entorno de Auth0 no están configuradas."
        );
        setError("Error interno. Por favor, contacta al administrador.");
        return;
      }

      domain = domain.replace(/^https?:\/\//, "");

      const auth0Response = await axios.post(
        `https://${domain}/dbconnections/signup`,
        {
          client_id: clientId,
          email,
          password,
          connection: "Username-Password-Authentication",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Registro exitoso en Auth0:", auth0Response.data);

      const auth0Id = auth0Response.data._id;

      if (!auth0Id) {
        throw new Error("El ID de Auth0 es nulo o no válido.");
      }

      // Registro en el backend
      const backendData = {
        dni,
        nombre: name,
        apellido,
        direccion: address,
        email,
        whatsapp,
        usuario: username,
        password,
        isActive,
        auth0Id, // Incluir el ID de Auth0
      };

      console.log("Datos enviados al backend:", backendData);

      const backendResponse = await axios.post(
        "http://localhost:4000/api/users/register",
        backendData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Registro exitoso en el backend:", backendResponse.data);
      setSuccess("Registro exitoso. ¡Bienvenido!");
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "¡Bienvenido!",
      }); // Mostrar alerta de éxito
      router.push("/");
    } catch (err) {
      console.error("Error de registro:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Error al registrarse. Por favor, inténtalo de nuevo."
      );
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          "Error al registrarse. Por favor, inténtalo de nuevo.",
      }); // Mostrar alerta de error
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Nombre"
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          label="Apellido"
          type="text"
          id="apellido"
          value={formData.apellido}
          onChange={handleChange}
        />
        <InputField
          label="DNI"
          type="text"
          id="dni"
          value={formData.dni}
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
          label="Usuario"
          type="text"
          id="username"
          value={formData.username}
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
          label="WhatsApp"
          type="text"
          id="whatsapp"
          value={formData.whatsapp}
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
