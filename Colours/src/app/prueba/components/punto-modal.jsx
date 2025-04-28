"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function PuntoModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    razon: "",
    nombre: "",
    direccion: "",
    telefono: "",
    cuit: "",
    email: "",
    es_online: false,
  });

  const [error, setError] = useState(null);
  const [cuitFormatted, setCuitFormatted] = useState("");

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

    // Validación especial para CUIT
    if (name === "cuit") {
      // Permite solo números y guiones
      const digits = value.replace(/[^\d-]/g, "");

      // Limita a 11 dígitos (sin contar los guiones)
      const digitCount = digits.replace(/-/g, "").length;
      if (digitCount > 11) return;

      setFormData((prev) => ({ ...prev, [name]: digits }));

      // Formatea el CUIT para mostrar
      const cleanDigits = digits.replace(/-/g, "");
      if (cleanDigits.length >= 2 && cleanDigits.length <= 10) {
        setCuitFormatted(
          `${cleanDigits.substring(0, 2)}-${cleanDigits.substring(2)}`
        );
      } else if (cleanDigits.length === 11) {
        setCuitFormatted(
          `${cleanDigits.substring(0, 2)}-${cleanDigits.substring(
            2,
            10
          )}-${cleanDigits.substring(10)}`
        );
      } else {
        setCuitFormatted(cleanDigits);
      }
      return;
    }

    // Validación especial para email (solo cuando está completo)
    if (name === "email") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    // Para los demás campos, actualizamos normalmente
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateCUIT = (cuit) => {
    const digits = cuit.replace(/-/g, "");
    if (digits.length !== 11) return false;

    // Validación básica de formato XX-XXXXXXXX-X
    const cuitPattern = /^\d{2}-?\d{8}-?\d{1}$/;
    return cuitPattern.test(cuit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Validaciones antes de enviar
    if (!formData.razon.trim()) {
      setError("La razón social es requerida");
      return;
    }

    if (!formData.nombre.trim()) {
      setError("El nombre es requerido");
      return;
    }

    if (!formData.direccion.trim()) {
      setError("La dirección es requerida");
      return;
    }

    // Validación de teléfono
    if (!formData.telefono.trim()) {
      setError("El teléfono es requerido");
      return;
    }

    if (!/^\+?\d+$/.test(formData.telefono)) {
      setError("El teléfono solo puede contener números y un + al inicio");
      return;
    }

    // Validación de CUIT
    if (!formData.cuit.trim()) {
      setError("El CUIT es requerido");
      return;
    }

    const cleanCUIT = formData.cuit.replace(/-/g, "");
    if (cleanCUIT.length !== 11) {
      setError("El CUIT debe tener exactamente 11 dígitos");
      return;
    }

    if (!validateCUIT(formData.cuit)) {
      setError("El formato del CUIT es inválido (debe ser XX-XXXXXXXX-X)");
      return;
    }

    // Validación de email
    if (!formData.email.trim()) {
      setError("El email es requerido");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("El formato del correo electrónico es inválido");
      return;
    }

    // Formatear CUIT antes de enviar (XX-XXXXXXXX-X)
    const formattedCUIT = cleanCUIT.replace(
      /(\d{2})(\d{8})(\d{1})/,
      "$1-$2-$3"
    );

    onSubmit({
      ...formData,
      cuit: formattedCUIT,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg border-2 border-yellow-600 p-6 w-full max-w-2xl shadow-lg shadow-yellow-800/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Agregar Punto</h2>
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
          {/* Razón Social - full width in all screen sizes */}
          <div className="w-full">
            <input
              type="text"
              name="razon"
              value={formData.razon}
              onChange={handleChange}
              placeholder="Razón Social *"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
              required
            />
          </div>

          {/* Two-column grid for larger screens, single column for mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First column */}
            <div className="space-y-4">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre *"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                required
              />

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
                {formData.telefono && (
                  <span className="absolute right-3 top-3 text-gray-400 text-xs">
                    {formData.telefono.replace(
                      /(\+\d{2})(\d{4})(\d{4})/,
                      "$1 $2 $3"
                    )}
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

            {/* Second column */}
            <div className="space-y-4">
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Dirección *"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                required
              />

              <div className="relative">
                <input
                  type="text"
                  name="cuit"
                  value={formData.cuit}
                  onChange={handleChange}
                  placeholder="CUIT (11 dígitos) *"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                  maxLength={13} // Permite guiones
                  required
                />
                {formData.cuit.replace(/-/g, "").length === 11 && (
                  <span className="absolute right-3 top-3 text-green-400 text-sm">
                    {cuitFormatted}
                  </span>
                )}
              </div>

              <div className="flex items-center pt-2">
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
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg border border-yellow-600 transition-colors duration-300"
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}
