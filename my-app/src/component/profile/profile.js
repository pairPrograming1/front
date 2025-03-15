import React, { useState, useEffect } from "react";
import Link from "next/link";

const Profile = () => {
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

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log("Profile updated:", profileData);
  };

  return (
    <div
      className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center relative"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(25, 119, 97, 0.85), transparent 80%),rgb(5, 34, 62)`,
      }}
    >
      <div className="bg-gray-0 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Mi Perfil
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              DNI:
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              type="text"
              name="dni"
              value={profileData.dni}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Nombre y Apellido:
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Dirección:
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              WhatsApp:
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              type="text"
              name="whatsapp"
              value={profileData.whatsapp}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Usuario:
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Contraseña:
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              type="password"
              name="password"
              value={profileData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Repetir Contraseña:
            </label>
            <input
              className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              type="password"
              name="confirmPassword"
              value={profileData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-gray-800 border border-gray-800 text-white font-bold py-2 px-3 rounded-full w-full focus:outline-none focus:shadow-outline hover:bg-gray-700"
            type="submit"
          >
            Actualizar Perfil
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
