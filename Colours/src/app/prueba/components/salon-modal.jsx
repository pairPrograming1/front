"use client";

import { X, Search, Check } from "lucide-react";
import { useState } from "react";

export default function SalonModal({ onClose, onAddSalon, API_URL }) {
  const [formData, setFormData] = useState({
    salon: "",
    nombre: "",
    capacidad: "",
    cuit: "",
    email: "",
    whatsapp: "",
    MercadopagoKeyP: "",
    Mercadopago: "",
    cbu: "",
    alias: "",
    estatus: "true",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkSalonExists = async (name) => {
    try {
      const response = await fetch(`${API_URL}?search=${name}`);
      if (!response.ok) {
        return false;
      }
      const data = await response.json();
      const salones = Array.isArray(data)
        ? data
        : data.data
        ? data.data
        : data.salones
        ? data.salones
        : [];

      return salones.some(
        (salon) =>
          salon.salon && salon.salon.toLowerCase() === name.toLowerCase()
      );
    } catch (error) {
      console.error("Error checking salon:", error);
      return false;
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
    return cuit;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const requiredFields = ["salon", "nombre", "cuit", "email", "whatsapp"];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error("Todos los campos marcados con * son obligatorios");
      }

      const formattedCUIT = formatCUIT(formData.cuit);
      const cuitPattern = /^\d{2}-\d{8}-\d{1}$/;
      if (!cuitPattern.test(formattedCUIT)) {
        throw new Error("El formato del CUIT debe ser XX-XXXXXXXX-X");
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        throw new Error("El formato del correo electrónico es inválido");
      }

      if (await checkSalonExists(formData.salon)) {
        throw new Error("Ya existe un salón con este nombre");
      }

      const submissionData = {
        ...formData,
        cuit: formattedCUIT,
      };

      await onAddSalon(submissionData);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg border-2 border-yellow-600 p-6 w-full max-w-md shadow-lg shadow-yellow-800/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Agregar Salón</h2>
          <button
            onClick={onClose}
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
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.capacidad}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="cuit"
                placeholder="CUIT (XX-XXXXXXXX-X) *"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.cuit}
                onChange={handleChange}
                required
              />
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
                placeholder="WhatsApp *"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.whatsapp}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <select
                name="estatus"
                value={formData.estatus}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
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
              "Guardando..."
            ) : (
              <>
                <Check className="h-4 w-4" />
                <span>Guardar Salón</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
