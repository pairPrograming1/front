"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { X } from "lucide-react";
import apiUrls from "@/app/components/utils/apiConfig";

const API_URL = apiUrls.production

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

  useEffect(() => {
    if (punto) {
      setFormData({
        razon: punto.razon,
        nombre: punto.nombre,
        direccion: punto.direccion,
        telefono: punto.telefono,
        cuit: punto.cuit,
        email: punto.email,
        es_online: punto.es_online,
      });
    }
  }, [punto]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_URL}/api/puntodeventa/${punto.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

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
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  if (!punto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Editar Punto</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="razon"
            value={formData.razon}
            onChange={handleChange}
            placeholder="Razón Social"
            className="input"
            required
          />

          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="input"
            required
          />

          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Dirección"
            className="input"
            required
          />

          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            className="input"
            required
          />

          <input
            type="text"
            name="cuit"
            value={formData.cuit}
            onChange={handleChange}
            placeholder="CUIT"
            className="input"
            required
            pattern="\d{2}-\d{8}-\d{1}"
            title="Formato de CUIT: 20-12345678-9"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="input"
            required
          />

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="es_online"
              checked={formData.es_online}
              onChange={handleChange}
              className="mr-2"
              id="es_online"
            />
            <label htmlFor="es_online">Punto Online</label>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
