"use client";

import { useState } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";
import PuntoModal from "../components/punto-modal";
import Header from "../components/header";

export default function PuntosDeVenta() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Datos de ejemplo
  const puntos = [
    {
      id: 1,
      direccion: "Calle Falsa 123",
      cuit: "30-90257931-1",
      contacto: "Homer Simpson",
      email: "hsimpson@gmail.com",
      whatsapp: "3416879652",
    },
    {
      id: 2,
      direccion: "Calle Falsa 123",
      cuit: "30-90257931-1",
      contacto: "Homer Simpson",
      email: "hsimpson@gmail.com",
      whatsapp: "3416879652",
    },
    {
      id: 3,
      direccion: "Calle Falsa 123",
      cuit: "30-90257931-1",
      contacto: "Homer Simpson",
      email: "hsimpson@gmail.com",
      whatsapp: "3416879652",
    },
    {
      id: 4,
      direccion: "Calle Falsa 123",
      cuit: "30-90257931-1",
      contacto: "Homer Simpson",
      email: "hsimpson@gmail.com",
      whatsapp: "3416879652",
    },
    {
      id: 5,
      direccion: "Calle Falsa 123",
      cuit: "30-90257931-1",
      contacto: "Homer Simpson",
      email: "hsimpson@gmail.com",
      whatsapp: "3416879652",
    },
    {
      id: 6,
      direccion: "Calle Falsa 123",
      cuit: "30-90257931-1",
      contacto: "Homer Simpson",
      email: "hsimpson@gmail.com",
      whatsapp: "3416879652",
    },
    {
      id: 7,
      direccion: "Calle Falsa 123",
      cuit: "30-90257931-1",
      contacto: "Homer Simpson",
      email: "hsimpson@gmail.com",
      whatsapp: "3416879652",
    },
    {
      id: 8,
      direccion: "Calle Falsa 123",
      cuit: "30-90257931-1",
      contacto: "Homer Simpson",
      email: "hsimpson@gmail.com",
      whatsapp: "3416879652",
    },
    {
      id: 9,
      direccion: "Calle Falsa 123",
      cuit: "30-90257931-1",
      contacto: "Homer Simpson",
      email: "hsimpson@gmail.com",
      whatsapp: "3416879652",
    },
    {
      id: 10,
      direccion: "Calle Falsa 123",
      cuit: "30-90257931-1",
      contacto: "Homer Simpson",
      email: "hsimpson@gmail.com",
      whatsapp: "3416879652",
    },
  ];

  return (
    <div className="p-6">
      <Header title="Puntos de Venta" />

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Buscar Punto de Venta"
            className="search-input pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <div className="flex items-center gap-4">
          <button className="btn btn-outline">
            Ver Puntos de Venta Inactivos
          </button>
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
              <th>Dirección</th>
              <th>CUIT</th>
              <th>Nombre del Contacto</th>
              <th>Email</th>
              <th>WhatsApp</th>
              <th className="w-32">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {puntos.map((punto) => (
              <tr key={punto.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{punto.direccion}</td>
                <td>{punto.cuit}</td>
                <td>{punto.contacto}</td>
                <td>{punto.email}</td>
                <td>{punto.whatsapp}</td>
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

      {showModal && <PuntoModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
