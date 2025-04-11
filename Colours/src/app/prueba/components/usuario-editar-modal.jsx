"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function UsuarioEditarModal({ usuario, onClose, onSave }) {
  const [formData, setFormData] = useState({
    usuario: "",
    nombre: "",
    apellido: "",
    direccion: "",
    email: "",
    whatsapp: "",
    dni: "", // Add dni to the formData state
  });

  useEffect(() => {
    if (usuario) {
      setFormData({
        usuario: usuario.usuario || "",
        nombre: usuario.nombre || "",
        apellido: usuario.apellido || "",
        direccion: usuario.direccion || "",
        email: usuario.email || "",
        whatsapp: usuario.whatsapp || "",
        dni: usuario.dni || "", // Ensure dni is populated if present
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(usuario.id, formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Editar Usuario</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            className="input"
            value={formData.usuario}
            onChange={handleChange}
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="input"
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            className="input"
            value={formData.apellido}
            onChange={handleChange}
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            className="input"
            value={formData.direccion}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="input"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp"
            className="input"
            value={formData.whatsapp}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            className="input"
            value={formData.dni}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary w-full mt-4">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}
