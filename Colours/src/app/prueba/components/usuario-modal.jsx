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
    roleId: null,
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
        password: "",
        dni: userData.dni || "",
        roleId: userData.roleId || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

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

    // Validación especial para DNI
    if (name === "dni") {
      // Permite solo números y las letras M o F (mayúsculas o minúsculas)
      const validatedValue = value.replace(/[^0-9MFmf]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: validatedValue.toUpperCase(),
      }));
      return;
    }

    // Para los demás campos, actualizamos normalmente
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación adicional antes de guardar
    if (formData.whatsapp && !/^\+?\d+$/.test(formData.whatsapp)) {
      alert(
        "El número de WhatsApp solo puede contener números y un símbolo + al inicio"
      );
      return;
    }

    if (formData.dni && !/^[0-9]+[MF]?$/.test(formData.dni.toUpperCase())) {
      alert("El DNI solo puede contener números y una letra M o F al final");
      return;
    }

    await onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg border-2 border-yellow-600 p-6 w-full max-w-2xl shadow-lg shadow-yellow-800/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            {userData ? "Editar Usuario" : "Agregar Usuario"}
          </h2>
          <button
            onClick={onClose}
            className="text-yellow-500 hover:text-yellow-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Usuario field - full width in all screen sizes */}
          <div className="w-full">
            <input
              type="text"
              name="usuario"
              placeholder="Usuario"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
              value={formData.usuario}
              onChange={handleChange}
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
                placeholder="Nombre"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.nombre}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="dni"
                placeholder="DNI (solo números y M/F al final)"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.dni}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.direccion}
                onChange={handleChange}
              />

              <input
                type="text"
                name="whatsapp"
                placeholder="WhatsApp (solo números, + al inicio)"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.whatsapp}
                onChange={handleChange}
              />
            </div>

            {/* Second column */}
            <div className="space-y-4">
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.apellido}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                value={formData.email}
                onChange={handleChange}
                required
              />

              {!userData && (
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                  value={formData.password}
                  onChange={handleChange}
                  required={!userData}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg border border-yellow-600 transition-colors duration-300"
          >
            {userData ? "Guardar Cambios" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}
