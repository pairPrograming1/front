"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function UsuarioModal({ onClose, onSave, userData }) {
  const [formData, setFormData] = useState({
    id: "",
    auth0Id: null,
    usuario: "",
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    whatsapp: "",
    password: "",
    dni: "",
    roleId: null, // solo si aplica para admin
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        id: userData.id || "",
        auth0Id: userData.auth0Id || "",
        usuario: userData.usuario || "",
        nombre: userData.nombre || "",
        apellido: userData.apellido || "",
        email: userData.email || "",
        direccion: userData.direccion || "",
        whatsapp: userData.whatsapp || "",
        password: "", // seguridad
        dni: userData.dni || "",
        roleId: userData.roleId || "", // por si el admin lo edita
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
    onClose();
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
            name="dni"
            placeholder="DNI"
            className="input"
            value={formData.dni}
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
            name="direccion"
            placeholder="Dirección"
            className="input"
            value={formData.direccion}
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
          {/* Campo opcional para admins */}
          <input
            type="text"
            name="roleId"
            placeholder="Rol ID (opcional)"
            className="input"
            value={formData.roleId}
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
