"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import InputField from "./InputField";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    direccion: "",
    email: "",
    whatsapp: "",
    usuario: "",
    password: "",
    confirmPassword: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleRegister = async () => {
    const {
      dni,
      nombre,
      apellido,
      direccion,
      email,
      whatsapp,
      usuario,
      password,
      confirmPassword,
      isActive,
    } = formData;

    // Validación de campos obligatorios
    if (
      !dni ||
      !nombre ||
      !apellido ||
      !direccion ||
      !email ||
      !whatsapp ||
      !usuario ||
      !password ||
      !confirmPassword
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Todos los campos son obligatorios.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "warning",
        title: "Correo inválido",
        text: "Por favor, ingresa un correo electrónico válido.",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Contraseñas no coinciden",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña inválida",
        text: "La contraseña debe tener al menos 8 caracteres, incluyendo letras mayúsculas, minúsculas, números y caracteres especiales.",
      });
      return;
    }

    setLoading(true);

    try {
      // Registro en Auth0
      let domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

      if (!domain || !clientId) {
        console.error(
          "Las variables de entorno de Auth0 no están configuradas."
        );
        Swal.fire({
          icon: "error",
          title: "Error interno",
          text: "Por favor, contacta al administrador.",
        });
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
        nombre,
        apellido,
        direccion,
        email,
        whatsapp,
        usuario,
        password,
        isActive,
        auth0Id,
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
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "¡Bienvenido!",
      });
      router.push("/");
    } catch (err) {
      console.error("Error de registro:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          "Error al registrarse. Por favor, inténtalo de nuevo.",
      });
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
          id="nombre"
          value={formData.nombre}
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
          id="usuario"
          value={formData.usuario}
          onChange={handleChange}
        />
        <InputField
          label="Dirección"
          type="text"
          id="direccion"
          value={formData.direccion}
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
