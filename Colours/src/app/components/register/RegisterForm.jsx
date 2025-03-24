import { useState } from "react";
import InputField from "./InputField";
import axios from "axios";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
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
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://YOUR_AUTH0_DOMAIN/api/v2/users",
        { ...formData, connection: "Username-Password-Authentication" },
        {
          headers: {
            Authorization: `Bearer YOUR_AUTH0_API_TOKEN`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User registered:", response.data);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form>
      <InputField
        label="DNI"
        type="text"
        id="dni"
        value={formData.dni}
        onChange={handleChange}
      />
      <InputField
        label="Nombre y Apellido"
        type="text"
        id="name"
        value={formData.name}
        onChange={handleChange}
      />
      <InputField
        label="Dirección"
        type="text"
        id="address"
        value={formData.address}
        onChange={handleChange}
      />
      <InputField
        label="Correo Electrónico"
        type="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        label="WhatsApp"
        type="text"
        id="whatsapp"
        value={formData.whatsapp}
        onChange={handleChange}
      />
      <InputField
        label="Usuario"
        type="text"
        id="username"
        value={formData.username}
        onChange={handleChange}
      />
      <InputField
        label="Contraseña"
        type="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />
      <InputField
        label="Repetir Contraseña"
        type="password"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <button
        className="bg-gray-800 border border-gray-800 text-white font-bold py-2 px-3 rounded-full w-full focus:outline-none focus:shadow-outline hover:bg-gray-700"
        type="button"
        onClick={handleSubmit}
      >
        Registrarme
      </button>
    </form>
  );
}
