"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { X } from "lucide-react";
import apiUrls from "@/app/components/utils/apiConfig";

const API_URL = apiUrls;

export default function EditarModal({ punto, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    razon: "",
    nombre: "",
    direccion: "",
    telefono: "",
    cuit: "",
    email: "",
    es_online: true,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (punto) {
      setFormData({
        razon: punto.razon || "",
        nombre: punto.nombre || "",
        direccion: punto.direccion || "",
        telefono: punto.telefono || "",
        cuit: punto.cuit || "",
        email: punto.email || "",
        es_online: punto.es_online === true,
      });
    }
  }, [punto]);

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Validación especial para teléfono al perder el foco
    if (name === "telefono") {
      const numericValue = value.replace(/\D/g, "");
      if (
        numericValue.length > 0 &&
        (numericValue.length < 9 || numericValue.length > 14)
      ) {
        Swal.fire({
          icon: "warning",
          title: "Advertencia",
          text: "El teléfono debe tener entre 9 y 14 dígitos.",
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Validación especial para teléfono
    if (name === "telefono") {
      const validatedValue = value.replace(/[^0-9+]/g, "");
      if (validatedValue.includes("+")) {
        const parts = validatedValue.split("+");
        if (parts.length > 2 || (parts.length === 2 && parts[0] !== "")) {
          return;
        }
      }
      setFormData((prev) => ({ ...prev, [name]: validatedValue }));
      return;
    }

    // Validación especial para CUIT (solo números, se formatea después)
    if (name === "cuit") {
      const digits = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: digits }));
      return;
    }

    // Para los demás campos, actualizamos normalmente
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const formatCUIT = (cuit) => {
    const digits = cuit.replace(/\D/g, "");
    if (digits.length === 11) {
      return `${digits.substring(0, 2)}-${digits.substring(
        2,
        10
      )}-${digits.substring(10)}`;
    }
    return digits; // Devuelve solo dígitos si no está completo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Validaciones antes de enviar
      if (formData.telefono && !/^\+?\d+$/.test(formData.telefono)) {
        throw new Error(
          "El teléfono solo puede contener números y un + al inicio"
        );
      }

      const formattedCUIT = formatCUIT(formData.cuit);
      const cuitPattern = /^\d{2}-\d{8}-\d{1}$/;
      if (!cuitPattern.test(formattedCUIT)) {
        throw new Error(
          "El CUIT debe tener 11 dígitos con formato XX-XXXXXXXX-X"
        );
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        throw new Error("El formato del correo electrónico es inválido");
      }

      const response = await fetch(`${API_URL}/api/puntodeventa/${punto.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cuit: formattedCUIT,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Error al actualizar el punto de venta"
        );
      }

      onUpdate();
      onClose();
      Swal.fire({
        icon: "success",
        title: "Actualizado",
        text: "Punto de venta actualizado correctamente",
      });
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  if (!punto) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-2 md:p-4 bg-black bg-opacity-70">
      <div className="bg-gray-800 rounded-lg border-2 border-yellow-600 p-3 md:p-6 w-full max-w-xs md:max-w-3xl max-h-[95vh] overflow-y-auto shadow-lg shadow-yellow-800/20">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-base md:text-xl font-semibold text-white">
            Editar Punto
          </h2>
          <button
            onClick={onClose}
            className="text-yellow-500 hover:text-yellow-300 transition-colors p-1 md:p-0"
          >
            <X className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-3 md:mb-4 p-2 md:p-3 bg-red-900/50 text-red-300 text-xs md:text-sm rounded-lg border border-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          {/* Grid container for two columns on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Column 1 */}
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm text-yellow-400 mb-1">
                  Razón Social
                </label>
                <input
                  type="text"
                  name="razon"
                  value={formData.razon}
                  onChange={handleChange}
                  placeholder="Razón Social *"
                  className="w-full p-2 md:p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors text-xs md:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm text-yellow-400 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre *"
                  className="w-full p-2 md:p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors text-xs md:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm text-yellow-400 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Dirección *"
                  className="w-full p-2 md:p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors text-xs md:text-sm"
                  required
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm text-yellow-400 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Teléfono (solo números, + opcional) *"
                  className="w-full p-2 md:p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors text-xs md:text-sm"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-xs md:text-sm text-yellow-400 mb-1">
                  CUIT
                </label>
                <input
                  type="text"
                  name="cuit"
                  value={formData.cuit}
                  onChange={handleChange}
                  placeholder="CUIT (11 dígitos) *"
                  className="w-full p-2 md:p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors text-xs md:text-sm"
                  maxLength="11"
                  required
                />
                {formData.cuit.length === 11 && (
                  <span className="absolute right-2 md:right-3 top-7 md:top-8 text-green-400 text-xs">
                    {formatCUIT(formData.cuit)}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs md:text-sm text-yellow-400 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail *"
                  className="w-full p-2 md:p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors text-xs md:text-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Checkbox outside of the grid - full width */}
          <div className="flex items-center mb-3 md:mb-4">
            <input
              type="checkbox"
              name="es_online"
              checked={formData.es_online}
              onChange={handleChange}
              className="mr-2 h-4 w-4 text-yellow-600 bg-gray-700 border-yellow-600 rounded focus:ring-yellow-500"
              id="es_online"
            />
            <label
              htmlFor="es_online"
              className="text-white text-xs md:text-sm"
            >
              Punto Online
            </label>
          </div>

          {/* Buttons - full width */}
          <div className="flex flex-col-reverse md:flex-row justify-end gap-2 md:gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full md:w-auto px-3 py-1.5 md:px-4 md:py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg border border-gray-500 transition-colors duration-300 text-xs md:text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full md:w-auto px-3 py-1.5 md:px-4 md:py-2 bg-yellow-700 hover:bg-yellow-600 text-white rounded-lg border border-yellow-600 transition-colors duration-300 text-xs md:text-sm"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
