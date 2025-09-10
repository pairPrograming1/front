"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BuyerInfoForm({ eventIdFromParams }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dni: "",
    whatsapp: "",
    email: "",
  });

  const [eventId, setEventId] = useState(eventIdFromParams || null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setMounted(true);

    const storedRole = localStorage.getItem("b");
    if (storedRole) {
      setUserRole(storedRole);
    } else {
      console.warn("Rol del usuario no encontrado en localStorage 'b'.");
    }

    if (!eventIdFromParams) {
      console.error("Error: Event ID no recibido como prop.");
    } else {
      if (eventIdFromParams !== eventId) {
        setEventId(eventIdFromParams);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSell = () => {
    localStorage.setItem("buyerData", JSON.stringify(formData));
    const path =
      userRole === "admin"
        ? `/prueba/vender/tickets/${eventId}`
        : `/vendor/event/tickets/${eventId}`;
    router.push(path);
  };

  const isFormValid = () => {
    return formData.name && formData.dni && formData.whatsapp && formData.email;
  };

  if (!mounted || eventId === null || userRole === null) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
          <p className="text-white text-sm">Cargando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full flex items-center justify-center p-8">
      <div className="w-full max-w-md p-8 rounded-lg ">
        <h2 className="text-xl font-bold text-white mb-8">
          Datos del Graduado
        </h2>
        <div className="space-y-6 mb-8">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nombre y Apellido"
            className="w-full p-4 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-base"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleInputChange}
              placeholder="DNI"
              className="w-full p-4 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-base"
            />
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              placeholder="WhatsApp"
              className="w-full p-4 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-base"
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-4 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-base"
          />
        </div>
        <div className="space-y-4">
          <div className="border border-[#BF8D6B] rounded p-6 w-full">
            <div className="text-white mb-4">
              <p className="font-medium text-base">Nombre del Graduado</p>
            </div>
            {isFormValid() && (
              <div className="bg-transparent p-4 rounded mb-4 text-base text-white">
                <div className="flex flex-col space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[#BF8D6B]">Graduado:</p>
                      <p className="truncate">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-[#BF8D6B]">DNI:</p>
                      <p className="truncate">{formData.dni}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[#BF8D6B]">WhatsApp:</p>
                      <p className="truncate">{formData.whatsapp}</p>
                    </div>
                    <div>
                      <p className="text-[#BF8D6B]">Email:</p>
                      <p className="truncate">{formData.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSell}
                disabled={!isFormValid()}
                className={`font-bold py-2 px-4 rounded text-base ${
                  isFormValid()
                    ? "bg-[#BF8D6B] text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                Vender
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
