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
    <form onSubmit={handleSubmit}>
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
      <InputField
        label="Dirección"
        type="text"
        name="address"
        value={profileData.address}
        onChange={handleChange}
      />
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
      <InputField
        label="Usuario"
        type="text"
        name="username"
        value={profileData.username}
        onChange={handleChange}
      />
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

      <button
        className="bg-gray-800 border border-gray-800 text-white font-bold py-2 px-3 rounded-full w-full focus:outline-none focus:shadow-outline hover:bg-gray-700"
        type="submit"
      >
        Actualizar Perfil
      </button>
    </form>
  );
}
