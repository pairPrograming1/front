"use client"

import { X } from "lucide-react"

export default function GraduadoCrearModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Graduado</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form>
          <input type="text" placeholder="Juan Pérez" className="input" />

          <input type="text" placeholder="Código de Evento" className="input" />

          <input type="text" placeholder="36999888" className="input" />

          <input type="email" placeholder="juan@gmail.com" className="input" />

          <input type="text" placeholder="Calle Falsa 123" className="input" />

          <input type="text" placeholder="3413111888" className="input" />

          <input type="text" placeholder="Código de Usuario" className="input" />

          <div className="mt-4 mb-4">
            <p className="text-sm text-gray-400 mb-2">Máximo de Tarjetas</p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex justify-between items-center">
                <span>Adultos</span>
                <div className="bg-[#1E2330] rounded px-2 py-1 w-10 text-center">10</div>
              </div>
              <div className="flex justify-between items-center">
                <span>3</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex justify-between items-center">
                <span>Menores</span>
                <div className="bg-[#1E2330] rounded px-2 py-1 w-10 text-center">5</div>
              </div>
              <div className="flex justify-between items-center">
                <span>3</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex justify-between items-center">
                <span>Adultos Sin Cargo</span>
                <div className="bg-[#1E2330] rounded px-2 py-1 w-10 text-center">3</div>
              </div>
              <div className="flex justify-between items-center">
                <span>3</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex justify-between items-center">
                <span>Menores Sin Cargo</span>
                <div className="bg-[#1E2330] rounded px-2 py-1 w-10 text-center">3</div>
              </div>
              <div className="flex justify-between items-center">
                <span>3</span>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Crear
          </button>
        </form>
      </div>
    </div>
  )
}
