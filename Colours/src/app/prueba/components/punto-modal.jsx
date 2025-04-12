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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Agregar Punto</h2>
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

          <button type="submit" className="btn btn-primary w-full mt-4">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}
