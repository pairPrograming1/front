"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { X } from "lucide-react";
import apiUrls from "@/app/components/utils/apiConfig";

const API_URL = apiUrls.production;

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Validación especial para teléfono
    if (name === "telefono") {
      // Permite solo números y el símbolo + al inicio
      const validatedValue = value.replace(/[^0-9+]/g, "");
      // Si contiene +, debe estar al inicio y solo una vez
      if (validatedValue.includes("+")) {
        const parts = validatedValue.split("+");
        if (parts.length > 2 || (parts.length === 2 && parts[0] !== "")) {
          // Si hay más de un + o no está al inicio, no actualizamos
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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg border-2 border-yellow-600 p-6 w-full max-w-3xl shadow-lg shadow-yellow-800/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Editar Punto</h2>
          <button
            onClick={onClose}
            className="text-yellow-500 hover:text-yellow-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-300 text-sm rounded-lg border border-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid container for two columns on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Column 1 */}
            <div className="space-y-4">
              <input
                type="text"
                name="razon"
                value={formData.razon}
                onChange={handleChange}
                placeholder="Razón Social *"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                required
              />

              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre *"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                required
              />

              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Dirección *"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                required
              />
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Teléfono (solo números, + opcional) *"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="cuit"
                  value={formData.cuit}
                  onChange={handleChange}
                  placeholder="CUIT (11 dígitos) *"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                  maxLength="11"
                  required
                />
                {formData.cuit.length === 11 && (
                  <span className="absolute right-3 top-3 text-green-400 text-sm">
                    {formatCUIT(formData.cuit)}
                  </span>
                )}
              </div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail *"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Checkbox outside of the grid - full width */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="es_online"
              checked={formData.es_online}
              onChange={handleChange}
              className="mr-2 h-4 w-4 text-yellow-600 bg-gray-700 border-yellow-600 rounded focus:ring-yellow-500"
              id="es_online"
            />
            <label htmlFor="es_online" className="text-white">
              Punto Online
            </label>
          </div>

          {/* Buttons - full width */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg border border-gray-500 transition-colors duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-700 hover:bg-yellow-600 text-white rounded-lg border border-yellow-600 transition-colors duration-300"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
