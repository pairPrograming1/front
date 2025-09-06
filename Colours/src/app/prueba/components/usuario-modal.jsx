"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import apiUrls from "../../components/utils/apiConfig";

const API_URL = apiUrls;

export default function UsuarioModal({ onClose, onSave, userData }) {
  const [formData, setFormData] = useState({
    id: "",
    auth0Id: null,
    usuario: "",
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    whatsapp: "",
    password: "",
    dni: "",
    roleId: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        id: userData.id || "",
        auth0Id: userData.auth0Id || "",
        usuario: userData.usuario || "",
        nombre: userData.nombre || "",
        apellido: userData.apellido || "",
        email: userData.email || "",
        direccion: userData.direccion || "",
        whatsapp: userData.whatsapp || "",
        password: "",
        dni: userData.dni || "",
        roleId: userData.roleId || "",
      });
    }
  }, [userData]);

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Validación especial para WhatsApp al perder el foco
    if (name === "whatsapp") {
      const numericValue = value.replace(/\D/g, "");
      if (
        numericValue.length > 0 &&
        (numericValue.length < 9 || numericValue.length > 14)
      ) {
        Swal.fire({
          icon: "warning",
          title: "Advertencia",
          text: "El WhatsApp debe tener entre 9 y 14 dígitos.",
        });
      }
    }

    // Validación especial para DNI al perder el foco
    if (name === "dni") {
      const numericValue = value.replace(/[MF]/gi, "");
      if (
        numericValue.length > 0 &&
        (numericValue.length < 9 || numericValue.length > 14)
      ) {
        Swal.fire({
          icon: "warning",
          title: "Advertencia",
          text: "El DNI debe tener entre 9 y 14 caracteres.",
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación especial para DNI
    if (name === "dni") {
      const sanitizedValue = value.replace(/[^0-9MF]/gi, "");
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    }
    // Validación especial para WhatsApp
    else if (name === "whatsapp") {
      const sanitizedValue = value.replace(/[^0-9+]/g, "");
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.usuario ||
      (!userData && !formData.password)
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Los campos marcados como obligatorios son requeridos.",
      });
      return;
    }

    // Validación específica del DNI solo si se proporciona
    if (formData.dni) {
      const dniRegex = /^[0-9]+[MF]?$/;
      if (!dniRegex.test(formData.dni)) {
        Swal.fire({
          icon: "warning",
          title: "DNI inválido",
          text: "El DNI debe contener solo números, opcionalmente seguido por la letra M o F.",
        });
        return;
      }
    }

    // Validación de email solo si se proporciona
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        Swal.fire({
          icon: "warning",
          title: "Correo inválido",
          text: "Por favor, ingresa un correo electrónico válido.",
        });
        return;
      }
    }

    // Validación de contraseña para nuevos usuarios
    if (!userData) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        Swal.fire({
          icon: "warning",
          title: "Contraseña inválida",
          text: "La contraseña debe tener al menos 8 caracteres, incluyendo letras mayúsculas, minúsculas, números y caracteres especiales.",
        });
        return;
      }
    }

    setLoading(true);

    try {
      // Si es un nuevo usuario, registrar en Auth0 primero
      let auth0Id = formData.auth0Id;

      if (!userData) {
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
            email: formData.email || `${formData.usuario}@temp.com`,
            password: formData.password,
            connection: "Username-Password-Authentication",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        auth0Id = auth0Response.data._id;

        if (!auth0Id) {
          throw new Error("El ID de Auth0 es nulo o no válido.");
        }
      }

      // Preparar datos para guardar
      const userToSave = {
        ...formData,
        auth0Id,
        // No enviar la contraseña en caso de edición
        password: userData ? undefined : formData.password,
      };

      await onSave(userToSave);
      onClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          "Error al guardar el usuario. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg border-2 border-yellow-600 p-6 w-full max-w-2xl shadow-lg shadow-yellow-800/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            {userData ? "Editar Usuario" : "Agregar Usuario"}
          </h2>
          <button
            onClick={onClose}
            className="text-yellow-500 hover:text-yellow-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Usuario field - full width in all screen sizes */}
          <div className="w-full">
            <label htmlFor="usuario" className="block text-white mb-1">
              Usuario *
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Ingrese el nombre de usuario"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
              value={formData.usuario}
              onChange={handleChange}
              required
            />
          </div>

          {/* Two-column grid for larger screens, single column for mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First column */}
            <div className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-white mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ingrese el nombre"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="dni" className="block text-white mb-1">
                  DNI (Opcional)
                </label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  placeholder="Solo números y M/F al final"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                  value={formData.dni}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <label htmlFor="direccion" className="block text-white mb-1">
                  Dirección (Opcional)
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder="Ingrese la dirección"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                  value={formData.direccion}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-white mb-1">
                  WhatsApp (Opcional)
                </label>
                <input
                  type="text"
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="Solo números, + al inicio"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* Second column */}
            <div className="space-y-4">
              <div>
                <label htmlFor="apellido" className="block text-white mb-1">
                  Apellido *
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  placeholder="Ingrese el apellido"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-1">
                  E-mail (Opcional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ingrese el correo electrónico"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {!userData && (
                <div>
                  <label htmlFor="password" className="block text-white mb-1">
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Ingrese la contraseña"
                    className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 text-white font-bold py-3 px-4 rounded-lg border border-yellow-600 transition-colors duration-300 ${
              loading
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-yellow-700 hover:bg-yellow-600"
            }`}
          >
            {loading ? "Cargando..." : userData ? "Guardar Cambios" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}
