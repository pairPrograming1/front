"use client";

import { X, Check } from "lucide-react";
import { useState, useEffect } from "react";

export default function SalonEditarModal({ salon, onClose, API_URL }) {
  const [formData, setFormData] = useState({
    salon: salon?.salon || "",
    nombre: salon?.nombre || "",
    capacidad: salon?.capacidad || "",
    cuit: salon?.cuit || "",
    email: salon?.email || "",
    whatsapp: salon?.whatsapp || "",
    MercadopagoKeyP: salon?.MercadopagoKeyP || "",
    Mercadopago: salon?.Mercadopago || "",
    cbu: salon?.cbu || "",
    alias: salon?.alias || "",
    estatus: salon?.estatus ? true : false,
  });

  const [initialSalonName, setInitialSalonName] = useState(salon?.salon || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (salon) {
      setFormData({
        salon: salon.salon || "",
        nombre: salon.nombre || "",
        capacidad: salon.capacidad || "",
        cuit: salon.cuit || "",
        email: salon.email || "",
        whatsapp: salon.whatsapp || "",
        MercadopagoKeyP: salon.MercadopagoKeyP || "",
        Mercadopago: salon.Mercadopago || "",
        cbu: salon.cbu || "",
        alias: salon.alias || "",
        estatus: salon.estatus === true,
      });
      setInitialSalonName(salon.salon || "");
    }
  }, [salon]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Validación especial para WhatsApp
    if (name === "whatsapp") {
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

  const checkSalonExists = async (name) => {
    if (name.toLowerCase() === initialSalonName.toLowerCase()) {
      return false;
    }

    try {
      const response = await fetch(`${API_URL}?search=${name}`);
      if (!response.ok) {
        throw new Error("Error al verificar disponibilidad del nombre");
      }
      const data = await response.json();
      const salones = data.data || [];

      return salones.some(
        (s) => s.salon && s.salon.toLowerCase() === name.toLowerCase()
      );
    } catch (error) {
      console.error("Error checking salon:", error);
      throw new Error("Error al verificar disponibilidad del nombre");
    }
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
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const requiredFields = ["salon", "nombre", "cuit", "email", "whatsapp"];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error("Todos los campos marcados con * son obligatorios");
      }

      // Validación de WhatsApp
      if (formData.whatsapp && !/^\+?\d+$/.test(formData.whatsapp)) {
        throw new Error(
          "El WhatsApp solo puede contener números y un + al inicio"
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

      if (formData.salon !== initialSalonName) {
        const exists = await checkSalonExists(formData.salon);
        if (exists) {
          throw new Error("Ya existe un salón con este nombre");
        }
      }

      const submissionData = {
        ...formData,
        cuit: formattedCUIT,
        capacidad: formData.capacidad ? parseInt(formData.capacidad) : null,
      };

      const response = await fetch(`${API_URL}/${salon.Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error al actualizar la información del salón"
        );
      }

      const result = await response.json();
      setSuccessMessage(result.message || "Salón actualizado correctamente");

      setTimeout(() => {
        onClose(true);
      }, 1500);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg border-2 border-yellow-600 p-6 w-full max-w-md shadow-lg shadow-yellow-800/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Editar Salón</h2>
          <button
            onClick={() => onClose(false)}
            className="text-yellow-500 hover:text-yellow-300 transition-colors"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-300 text-sm rounded-lg border border-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-900/50 text-green-300 text-sm rounded-lg border border-green-700">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                name="salon"
                placeholder="Nombre del Salón *"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.salon}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del Contacto *"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <input
                type="number"
                name="capacidad"
                placeholder="Capacidad"
                min="1"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.capacidad}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="cuit"
                placeholder="CUIT (11 dígitos) *"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.cuit}
                onChange={handleChange}
                maxLength="11"
                required
              />
              {formData.cuit.length === 11 && (
                <span className="absolute right-3 top-3 text-green-400 text-sm">
                  {formatCUIT(formData.cuit)}
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email *"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <input
                type="tel"
                name="whatsapp"
                placeholder="WhatsApp (solo números, + opcional) *"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.whatsapp}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative flex items-center gap-2">
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  name="estatus"
                  checked={formData.estatus}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 text-yellow-600 bg-gray-700 border-yellow-600 rounded focus:ring-yellow-500"
                />
                <span>Salón Activo</span>
              </label>
            </div>

            <div className="mt-6 mb-2">
              <h3 className="text-md font-medium text-yellow-500">
                Datos de Pago
              </h3>
            </div>

            <div className="relative">
              <input
                type="text"
                name="MercadopagoKeyP"
                placeholder="Clave Pública de MercadoPago"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.MercadopagoKeyP}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="Mercadopago"
                placeholder="Token de MercadoPago"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.Mercadopago}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="cbu"
                placeholder="CBU"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.cbu}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="alias"
                placeholder="Alias CBU"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.alias}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg border border-yellow-600 transition-colors duration-300 flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Actualizando..."
            ) : (
              <>
                <Check className="h-4 w-4" />
                <span>Actualizar Salón</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
