"use client";

import { useState } from "react";
import InputField from "./InputField";

export default function ProfileForm() {
  const [profileData, setProfileData] = useState({
    dni: "",
    name: "",
    address: "",
    email: "",
    whatsapp: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profileData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="DNI"
          type="text"
          name="dni"
          value={profileData.dni}
          onChange={handleChange}
        />
        <InputField
          label="Nombre y Apellido"
          type="text"
          name="name"
          value={profileData.name}
          onChange={handleChange}
        />
      </div>

      <InputField
        label="Dirección"
        type="text"
        name="address"
        value={profileData.address}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Email"
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
        />
        <InputField
          label="WhatsApp"
          type="text"
          name="whatsapp"
          value={profileData.whatsapp}
          onChange={handleChange}
        />
      </div>

      <InputField
        label="Usuario"
        type="text"
        name="username"
        value={profileData.username}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Contraseña"
          type="password"
          name="password"
          value={profileData.password}
          onChange={handleChange}
        />
        <InputField
          label="Repetir Contraseña"
          type="password"
          name="confirmPassword"
          value={profileData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <button
          className="bg-gray-800 border border-green-500 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline hover:bg-gray-700 transition-colors"
          type="submit"
        >
          Actualizar Perfil
        </button>
      </div>
    </form>
  );
}
