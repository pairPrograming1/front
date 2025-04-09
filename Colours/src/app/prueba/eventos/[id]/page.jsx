"use client";

import { useState } from "react";
import Header from "../../components/header";

export default function DetalleEvento({ params }) {
  const [activeTab, setActiveTab] = useState("informacion");

  // Datos de ejemplo para tipos de entrada
  const tiposEntrada = [
    {
      id: 1,
      nombre: "Adultos",
      cantMaxima: 4,
      cantMinima: 2,
      precio: "200.000$",
      fechaCaducidad: "25/04/2025",
    },
    {
      id: 2,
      nombre: "Menores",
      cantMaxima: 4,
      cantMinima: 2,
      precio: "200.000$",
      fechaCaducidad: "25/04/2025",
    },
    {
      id: 3,
      nombre: "Adultos Sin Cargo",
      cantMaxima: 4,
      cantMinima: 2,
      precio: "0$",
      fechaCaducidad: "25/04/2025",
    },
    {
      id: 4,
      nombre: "Menores Sin Cargo",
      cantMaxima: 4,
      cantMinima: 2,
      precio: "0$",
      fechaCaducidad: "25/04/2025",
    },
  ];

  return (
    <div className="p-6">
      <Header title="Sagrado Corazón Turno Mañana 2025" showBack={true} />

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value="Sagrado Corazón Turno Mañana 2025"
            readOnly
            className="input"
          />
          <input
            type="text"
            value="Salón Asignado"
            readOnly
            className="input"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <input type="text" value="Fecha y Hora" readOnly className="input" />
          <input
            type="text"
            value="Tipo de Evento"
            readOnly
            className="input"
          />
          <input type="text" value="************" readOnly className="input" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="mb-6">
            <textarea
              placeholder="Descripción del Evento"
              className="w-full h-32 bg-[#1a2535] border border-[#2a3545] rounded-lg p-4 text-white"
            ></textarea>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Tipos de Entrada</h2>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th className="w-10">
                      <input type="checkbox" />
                    </th>
                    <th>Nombre</th>
                    <th>Cant. Máxima</th>
                    <th>Cant. Mínima</th>
                    <th>Precio</th>
                    <th>Fecha de caducidad</th>
                  </tr>
                </thead>
                <tbody>
                  {tiposEntrada.map((tipo) => (
                    <tr key={tipo.id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{tipo.nombre}</td>
                      <td>{tipo.cantMaxima}</td>
                      <td>{tipo.cantMinima}</td>
                      <td>{tipo.precio}</td>
                      <td>{tipo.fechaCaducidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-outline mt-4">
              Agregar Tipo de Entrada
            </button>
          </div>
        </div>

        <div>
          <div className="bg-[#2A2F3D] border border-[#2A2F3D] rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-08%20214654-cOfMvHsvnMZkJJ6vh7RAgO2oDGfUUD.png"
                alt="Imagen de evento"
                className="rounded-lg w-full h-24 object-cover"
              />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-08%20214654-cOfMvHsvnMZkJJ6vh7RAgO2oDGfUUD.png"
                alt="Imagen de evento"
                className="rounded-lg w-full h-24 object-cover"
              />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-08%20214654-cOfMvHsvnMZkJJ6vh7RAgO2oDGfUUD.png"
                alt="Imagen de evento"
                className="rounded-lg w-full h-24 object-cover"
              />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-08%20214654-cOfMvHsvnMZkJJ6vh7RAgO2oDGfUUD.png"
                alt="Imagen de evento"
                className="rounded-lg w-full h-24 object-cover"
              />
            </div>
          </div>

          <div className="bg-[#2A2F3D] border border-[#2A2F3D] rounded-lg p-4 mb-4">
            <h3 className="font-semibold mb-4">Restricciones y Porcentajes</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">
                Compra máxima por graduado
              </p>
              <input type="text" className="input" />
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Porcentaje de venta</p>
              <input type="text" className="input" />
            </div>
          </div>

          <div className="bg-[#2A2F3D] border border-[#2A2F3D] rounded-lg p-4">
            <h3 className="font-semibold mb-4">Aumentar Valores</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">
                Porcentaje de aumento
              </p>
              <input type="text" className="input" />
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Valor de aumento</p>
              <input type="text" className="input" />
            </div>
            <button className="btn btn-primary w-full">Aplicar Aumento</button>
          </div>
        </div>
      </div>
    </div>
  );
}
