"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function UsuarioModal({ onClose, onSave, userData }) {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    apellido: "",
    email: "",
    address: "",
    whatsapp: "",
    password: "", // Nuevo campo
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.usuario || "",
        name: userData.nombre || "",
        apellido: userData.apellido || "",
        email: userData.email || "",
        address: userData.direccion || "",
        whatsapp: userData.whatsapp || "",
        password: "", // Dejar vacío por seguridad
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Llamar a la función onSave con los datos actualizados
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {userData ? "Editar Usuario" : "Agregar Usuario"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            className="input"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            className="input"
            value={formData.name}
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
            type="email"
            name="email"
            placeholder="E-mail"
            className="input"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            className="input"
            value={formData.address}
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
            type="password"
            name="password"
            placeholder="Contraseña"
            className="input"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary w-full mt-4">
            {userData ? "Guardar Cambios" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}
