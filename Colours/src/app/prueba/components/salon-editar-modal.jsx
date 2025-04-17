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
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const checkSalonExists = async (name) => {
    // Solo verificar si el nombre del salón cambió
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
    // Remover caracteres no numéricos
    const digits = cuit.replace(/\D/g, "");

    // Si tenemos exactamente 11 dígitos, formatear como XX-XXXXXXXX-X
    if (digits.length === 11) {
      return `${digits.substring(0, 2)}-${digits.substring(
        2,
        10
      )}-${digits.substring(10)}`;
    }

    // De lo contrario devolver como está
    return cuit;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Validar campos requeridos
      const requiredFields = ["salon", "nombre", "cuit", "email", "whatsapp"];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error("Todos los campos marcados con * son obligatorios");
      }

      // Formatear y validar CUIT
      const formattedCUIT = formatCUIT(formData.cuit);
      const cuitPattern = /^\d{2}-\d{8}-\d{1}$/;
      if (!cuitPattern.test(formattedCUIT)) {
        throw new Error("El formato del CUIT debe ser XX-XXXXXXXX-X");
      }

      // Validar formato de email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        throw new Error("El formato del correo electrónico es inválido");
      }

      // Verificar si el nombre del salón ya existe (si fue cambiado)
      if (formData.salon !== initialSalonName) {
        const exists = await checkSalonExists(formData.salon);
        if (exists) {
          throw new Error("Ya existe un salón con este nombre");
        }
      }

      // Preparar datos para envío
      const submissionData = {
        ...formData,
        cuit: formattedCUIT,
        capacidad: formData.capacidad ? parseInt(formData.capacidad) : null,
      };

      // Realizar la petición PUT a la API
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

      // Cerrar modal después de 1.5 segundos para mostrar mensaje de éxito
      setTimeout(() => {
        onClose(true); // Pasar true para indicar que hubo una actualización exitosa
      }, 1500);
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
          <h2 className="text-xl font-semibold">Editar Salón</h2>
          <button
            onClick={() => onClose(false)}
            className="text-gray-400 hover:text-gray-600"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded border border-red-200">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 text-sm rounded border border-green-200">
            {successMessage}
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

            <div className="relative flex items-center gap-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="estatus"
                  checked={formData.estatus}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4"
                />
                <span>Salón Activo</span>
              </label>
            </div>

            {/* Datos de MercadoPago */}
            <div className="mt-6 mb-2">
              <h3 className="text-md font-medium">Datos de Pago</h3>
            </div>

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
