"use client";

import { useState } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";
import Header from "../components/header";
import EventoModal from "../components/evento-modal";

export default function Eventos() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Datos de ejemplo
  const eventos = [
    {
      id: 1,
      nombre: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      tipo: "Graduación",
      codigo: "************",
      fecha: "20/12/2026 a las 20:30",
    },
    {
      id: 2,
      nombre: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      tipo: "Graduación",
      codigo: "************",
      fecha: "20/12/2026 a las 20:30",
    },
    {
      id: 3,
      nombre: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      tipo: "Graduación",
      codigo: "************",
      fecha: "20/12/2026 a las 20:30",
    },
    {
      id: 4,
      nombre: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      tipo: "Graduación",
      codigo: "************",
      fecha: "20/12/2026 a las 20:30",
    },
    {
      id: 5,
      nombre: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      tipo: "Graduación",
      codigo: "************",
      fecha: "20/12/2026 a las 20:30",
    },
    {
      id: 6,
      nombre: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      tipo: "Graduación",
      codigo: "************",
      fecha: "20/12/2026 a las 20:30",
    },
    {
      id: 7,
      nombre: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      tipo: "Graduación",
      codigo: "************",
      fecha: "20/12/2026 a las 20:30",
    },
    {
      id: 8,
      nombre: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      tipo: "Graduación",
      codigo: "************",
      fecha: "20/12/2026 a las 20:30",
    },
    {
      id: 9,
      nombre: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      tipo: "Graduación",
      codigo: "************",
      fecha: "20/12/2026 a las 20:30",
    },
    {
      id: 10,
      nombre: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      tipo: "Graduación",
      codigo: "************",
      fecha: "20/12/2026 a las 20:30",
    },
  ];

  return (
    <div className="p-6">
      <Header title="Eventos" />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Buscar Eventos"
            className="search-input pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button className="btn btn-outline w-full sm:w-auto">
            Ver Eventos Inactivos
          </button>
          <button className="btn btn-outline w-full sm:w-auto">Borrar</button>
          <button
            className="btn btn-primary flex items-center gap-2 w-full sm:w-auto"
            onClick={() => setShowModal(true)}
          >
            <Plus className="h-4 w-4" />
            Agregar
          </button>
        </div>
      </div>

      <div className="table-container overflow-x-auto">
        <table className="table min-w-full">
          <thead>
            <tr>
              <th className="w-10">
                <input type="checkbox" />
              </th>
              <th>Nombre del Evento</th>
              <th>Salón</th>
              <th>Tipo</th>
              <th>Código</th>
              <th>Fecha y Hora</th>
              <th className="w-32">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => (
              <tr key={evento.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{evento.nombre}</td>
                <td>{evento.salon}</td>
                <td>{evento.tipo}</td>
                <td>{evento.codigo}</td>
                <td>{evento.fecha}</td>
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

      <div className="pagination mt-4 flex justify-center gap-2">
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

      {showModal && <EventoModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
