"use client";

import React, { useState } from "react";

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "usuario" && password === "contraseña") {
      setIsAuthenticated(true);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      {!isAuthenticated ? (
        <div className="bg-gray-800 p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-white">Iniciar Sesión</h2>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-700 text-white"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
          >
            Iniciar Sesión
          </button>
        </div>
      ) : (
        <div className="bg-gray-800 p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Bienvenido, {username}
          </h2>
          <button
            onClick={handleLogout}
            className="w-full bg-red-700 text-white p-2 rounded hover:bg-red-800"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
