"use client";

import { useState } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";
import SalonModal from "../components/salon-modal";
import Header from "../components/header";

export default function Salones() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Datos de ejemplo
  const salones = [
    {
      id: 1,
      nombre: "Aires",
      cuit: "20-32125731-4",
      contacto: "Mariano Boggino",
      email: "boggino@nakama.ar",
      whatsapp: "3413184639",
    },
    {
      id: 2,
      nombre: "Aires",
      cuit: "20-32125731-4",
      contacto: "Mariano Boggino",
      email: "boggino@nakama.ar",
      whatsapp: "3413184639",
    },
    {
      id: 3,
      nombre: "Aires",
      cuit: "20-32125731-4",
      contacto: "Mariano Boggino",
      email: "boggino@nakama.ar",
      whatsapp: "3413184639",
    },
    {
      id: 4,
      nombre: "Aires",
      cuit: "20-32125731-4",
      contacto: "Mariano Boggino",
      email: "boggino@nakama.ar",
      whatsapp: "3413184639",
    },
    {
      id: 5,
      nombre: "Aires",
      cuit: "20-32125731-4",
      contacto: "Mariano Boggino",
      email: "boggino@nakama.ar",
      whatsapp: "3413184639",
    },
    {
      id: 6,
      nombre: "Aires",
      cuit: "20-32125731-4",
      contacto: "Mariano Boggino",
      email: "boggino@nakama.ar",
      whatsapp: "3413184639",
    },
    {
      id: 7,
      nombre: "Aires",
      cuit: "20-32125731-4",
      contacto: "Mariano Boggino",
      email: "boggino@nakama.ar",
      whatsapp: "3413184639",
    },
    {
      id: 8,
      nombre: "Aires",
      cuit: "20-32125731-4",
      contacto: "Mariano Boggino",
      email: "boggino@nakama.ar",
      whatsapp: "3413184639",
    },
    {
      id: 9,
      nombre: "Aires",
      cuit: "20-32125731-4",
      contacto: "Mariano Boggino",
      email: "boggino@nakama.ar",
      whatsapp: "3413184639",
    },
    {
      id: 10,
      nombre: "Aires",
      cuit: "20-32125731-4",
      contacto: "Mariano Boggino",
      email: "boggino@nakama.ar",
      whatsapp: "3413184639",
    },
  ];

  return (
    <div className="p-6">
      <Header title="Salones" />

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Buscar Salones"
            className="search-input pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <div className="flex items-center gap-4">
          <button className="btn btn-outline">Ver Salones Inactivos</button>
          <button className="btn btn-outline">Borrar</button>
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <Plus className="h-4 w-4" />
            Agregar
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="w-10">
                <input type="checkbox" />
              </th>
              <th>Salón</th>
              <th>CUIT</th>
              <th>Nombre del Contacto</th>
              <th>Email</th>
              <th>WhatsApp</th>
              <th className="w-32">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {salones.map((salon) => (
              <tr key={salon.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{salon.nombre}</td>
                <td>{salon.cuit}</td>
                <td>{salon.contacto}</td>
                <td>{salon.email}</td>
                <td>{salon.whatsapp}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-outline py-1 px-2">
                      Editar
                    </button>
                    <button className="btn btn-outline py-1 px-2">
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination mt-4">
        <button className="pagination-item active">1</button>
        <button className="pagination-item">2</button>
        <button className="pagination-item">3</button>
        <button className="pagination-item">4</button>
        <button className="pagination-item">5</button>
        <button className="pagination-item">30</button>
        <button className="pagination-item">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {showModal && <SalonModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
