"use client";

import { useState } from "react";
import { Search, ChevronRight, Download } from "lucide-react";
import GraduadoModal from "../../components/graduado-modal";

export default function Reportes() {
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
    {
      id: 2,
      usuario: "Juan Pérez",
      evento: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      puntoVenta: "Colour Producciones",
      tipoEvento: "Graduación",
      formaPago: "Mercado Pago",
      fecha: "20/12/2026",
      monto: "200.000$",
    },
    {
      id: 3,
      usuario: "Juan Pérez",
      evento: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      puntoVenta: "Colour Producciones",
      tipoEvento: "Graduación",
      formaPago: "Mercado Pago",
      fecha: "20/12/2026",
      monto: "200.000$",
    },
    {
      id: 4,
      usuario: "Juan Pérez",
      evento: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      puntoVenta: "Colour Producciones",
      tipoEvento: "Graduación",
      formaPago: "Mercado Pago",
      fecha: "20/12/2026",
      monto: "200.000$",
    },
    {
      id: 5,
      usuario: "Juan Pérez",
      evento: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      puntoVenta: "Colour Producciones",
      tipoEvento: "Graduación",
      formaPago: "Mercado Pago",
      fecha: "20/12/2026",
      monto: "200.000$",
    },
    {
      id: 6,
      usuario: "Juan Pérez",
      evento: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      puntoVenta: "Colour Producciones",
      tipoEvento: "Graduación",
      formaPago: "Mercado Pago",
      fecha: "20/12/2026",
      monto: "200.000$",
    },
    {
      id: 7,
      usuario: "Juan Pérez",
      evento: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      puntoVenta: "Colour Producciones",
      tipoEvento: "Graduación",
      formaPago: "Mercado Pago",
      fecha: "20/12/2026",
      monto: "200.000$",
    },
    {
      id: 8,
      usuario: "Juan Pérez",
      evento: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      puntoVenta: "Colour Producciones",
      tipoEvento: "Graduación",
      formaPago: "Mercado Pago",
      fecha: "20/12/2026",
      monto: "200.000$",
    },
    {
      id: 9,
      usuario: "Juan Pérez",
      evento: "Sagrado Corazón Turno Mañana 2025",
      salon: "Aires Eventos",
      puntoVenta: "Colour Producciones",
      tipoEvento: "Graduación",
      formaPago: "Mercado Pago",
      fecha: "20/12/2026",
      monto: "200.000$",
    },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1a2535] border border-[#2a3545] rounded-lg p-4 text-center">
          <p className="text-gray-400 mb-2">Total Entradas</p>
          <p className="text-2xl font-bold">30.000.000$</p>
        </div>
        <div className="bg-[#1a2535] border border-[#2a3545] rounded-lg p-4 text-center">
          <p className="text-gray-400 mb-2">Total por Página</p>
          <p className="text-2xl font-bold">10.000.000$</p>
        </div>
        <div className="bg-[#22d3ee] bg-opacity-20 border border-[#22d3ee] rounded-lg p-4 text-center">
          <p className="text-gray-200 mb-2">Total Seleccionado</p>
          <p className="text-2xl font-bold">5.000.000$</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 w-2/3">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Buscar por Salón"
              className="search-input pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Buscar por Punto de Venta"
              className="search-input pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          <input
            type="date"
            placeholder="Fecha desde"
            className="input w-1/4"
          />
          <input
            type="date"
            placeholder="Fecha hasta"
            className="input w-1/4"
          />
          <select className="input w-1/4">
            <option value="">Tipo de Evento</option>
            <option value="graduacion">Graduación</option>
          </select>
        </div>

        <button className="btn btn-primary flex items-center gap-2">
          <Download className="h-4 w-4" />
          Descargar CSV
        </button>
      </div>

      <div className="table-container">
        <table className="table">
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
                <td>
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

      {showModal && <GraduadoModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
