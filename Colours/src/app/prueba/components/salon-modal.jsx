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
    // Remove non-digits
    const digits = cuit.replace(/\D/g, "");

    // If we have exactly 11 digits, format as XX-XXXXXXXX-X
    if (digits.length === 11) {
      return `${digits.substring(0, 2)}-${digits.substring(
        2,
        10
      )}-${digits.substring(10)}`;
    }

    // Otherwise return as is
    return cuit;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      const requiredFields = ["salon", "nombre", "cuit", "email", "whatsapp"];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error("Todos los campos marcados con * son obligatorios");
      }

      // Format and validate CUIT
      const formattedCUIT = formatCUIT(formData.cuit);
      const cuitPattern = /^\d{2}-\d{8}-\d{1}$/;
      if (!cuitPattern.test(formattedCUIT)) {
        throw new Error("El formato del CUIT debe ser XX-XXXXXXXX-X");
      }

      // Validate email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        throw new Error("El formato del correo electrónico es inválido");
      }

      // Check if salon already exists
      if (await checkSalonExists(formData.salon)) {
        throw new Error("Ya existe un salón con este nombre");
      }

      // Submit with formatted data
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
    <div className="modal-overlay">
      <div className="modal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Agregar Salón</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-4">
            {/* Información Básica */}
            <div className="relative">
              <input
                type="text"
                name="salon"
                placeholder="Nombre del Salón *"
                className="search-input pl-3 w-full"
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
                className="search-input pl-3 w-full"
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
                className="search-input pl-3 w-full"
                value={formData.capacidad}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="cuit"
                placeholder="CUIT (XX-XXXXXXXX-X) *"
                className="search-input pl-3 w-full"
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
                className="search-input pl-3 w-full"
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
                className="search-input pl-3 w-full"
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
                className="search-input pl-3 w-full"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            {/* Datos de MercadoPago */}
            <div className="relative">
              <input
                type="text"
                name="MercadopagoKeyP"
                placeholder="Clave Pública de MercadoPago"
                className="search-input pl-3 w-full"
                value={formData.MercadopagoKeyP}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="Mercadopago"
                placeholder="Token de MercadoPago"
                className="search-input pl-3 w-full"
                value={formData.Mercadopago}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="cbu"
                placeholder="CBU"
                className="search-input pl-3 w-full"
                value={formData.cbu}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="alias"
                placeholder="Alias CBU"
                className="search-input pl-3 w-full"
                value={formData.alias}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2"
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
