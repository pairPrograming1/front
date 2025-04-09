"use client";

import { useState } from "react";
import { Search, ChevronRight, Download } from "lucide-react";
import Header from "../components/header";
import GraduadoModal from "../components/graduado-modal";

export default function CobrosYPagos() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Datos de ejemplo
  const reportes = [
    {
      id: 1,
      usuario: "Juan Pérez",
      evento: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      puntoVenta: "Colour Producciones",
      tipoEvento: "Graduación",
      formaPago: "Mercado Pago",
      fecha: "20/12/2026",
      monto: "200.000$",
    },
    // ... otros reportes
  ];

  return (
    <div className="p-6">
      <Header title="Cobros y Pagos" />

      {/* Resumen Total */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#2A2F3D] border border-[#2A2F3D] rounded-lg p-4 text-center">
          <p className="text-gray-400 mb-2">Total Entradas</p>
          <p className="text-2xl font-bold">30.000.000$</p>
        </div>
        <div className="bg-[#2A2F3D] border border-[#2A2F3D] rounded-lg p-4 text-center">
          <p className="text-gray-400 mb-2">Total por Página</p>
          <p className="text-2xl font-bold">10.000.000$</p>
        </div>
        <div className="bg-[#C88D6B] bg-opacity-20 border border-[#C88D6B] rounded-lg p-4 text-center">
          <p className="text-gray-200 mb-2">Total Seleccionado</p>
          <p className="text-2xl font-bold">5.000.000$</p>
        </div>
      </div>

      {/* Filtros de Búsqueda */}
      <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
        <div className="relative w-full sm:w-1/5 md:w-1/5 lg:w-1/5 xl:w-1/5">
          <input
            type="text"
            placeholder="Buscar por Salón"
            className="search-input pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <div className="relative w-full sm:w-1/5 md:w-1/5 lg:w-1/5 xl:w-1/5">
          <input
            type="text"
            placeholder="Buscar por Punto de Venta"
            className="search-input pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <div className="w-full sm:w-1/5 md:w-1/5 lg:w-1/5 xl:w-1/5">
          <input
            type="date"
            placeholder="Fecha desde"
            className="input w-full"
          />
        </div>
        <div className="w-full sm:w-1/5 md:w-1/5 lg:w-1/5 xl:w-1/5">
          <input
            type="date"
            placeholder="Fecha hasta"
            className="input w-full"
          />
        </div>
        <div className="w-full sm:w-1/5 md:w-1/5 lg:w-1/5 xl:w-1/5">
          <select className="input w-full">
            <option value="">Tipo de Evento</option>
            <option value="graduacion">Graduación</option>
          </select>
        </div>
        <button className="btn btn-primary flex items-center gap-2 ml-2 mt-2 sm:mt-0">
          <Download className="h-4 w-4" />
          Descargar CSV
        </button>
      </div>

      {/* Tabla de Reportes */}
      <div className="table-container overflow-x-auto">
        <table className="table w-full min-w-full">
          <thead>
            <tr>
              <th className="w-10">
                <input type="checkbox" />
              </th>
              <th>Usuario</th>
              <th>Evento</th>
              <th>Salón</th>
              <th>Punto de Venta</th>
              <th>Tipo de Evento</th>
              <th>Forma de Pago</th>
              <th>Fecha</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((reporte) => (
              <tr
                key={reporte.id}
                onClick={() => setShowModal(true)}
                className="cursor-pointer"
              >
                <td onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" />
                </td>
                <td>{reporte.usuario}</td>
                <td>{reporte.evento}</td>
                <td>{reporte.salon}</td>
                <td>{reporte.puntoVenta}</td>
                <td>{reporte.tipoEvento}</td>
                <td>{reporte.formaPago}</td>
                <td>{reporte.fecha}</td>
                <td>{reporte.monto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
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

      {showModal && <GraduadoModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
