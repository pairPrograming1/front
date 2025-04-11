"use client"

import { X } from "lucide-react"

export default function GraduadoModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Graduado</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <input type="text" value="Juan Pérez" readOnly className="input" />
          <input type="text" value="Mercado Pago" readOnly className="input" />
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <input type="text" value="Sagrado Corazón Turno Mañana 2025" readOnly className="input" />
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2">Máximo de Tarjetas</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="flex justify-between items-center">
              <span>Adultos</span>
              <div className="bg-[#1E2330] rounded px-2 py-1 w-10 text-center">10</div>
            </div>
            <div className="flex justify-between items-center">
              <span>100.000$</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="flex justify-between items-center">
              <span>Menores</span>
              <div className="bg-[#1E2330] rounded px-2 py-1 w-10 text-center">5</div>
            </div>
            <div className="flex justify-between items-center">
              <span>100.000$</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="flex justify-between items-center">
              <span>Adultos Sin Cargo</span>
              <div className="bg-[#1E2330] rounded px-2 py-1 w-10 text-center">3</div>
            </div>
            <div className="flex justify-between items-center">
              <span>0$</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="flex justify-between items-center">
              <span>Menores Sin Cargo</span>
              <div className="bg-[#1E2330] rounded px-2 py-1 w-10 text-center">3</div>
            </div>
            <div className="flex justify-between items-center">
              <span>0$</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <input type="text" value="Aires Eventos" readOnly className="input" />
          <input type="text" value="Colour Producciones" readOnly className="input" />
          <input type="text" value="Graduación" readOnly className="input" />
          <input type="text" value="20/12/2026" readOnly className="input" />
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total Compra:</span>
          <div className="bg-[#1E2330] rounded px-4 py-2 text-center">200.000$</div>
        </div>

        <button className="btn btn-primary w-full mt-4" onClick={onClose}>
          Volver
        </button>
      </div>
    </div>
  )
}
