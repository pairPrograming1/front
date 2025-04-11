"use client";

import { X, Upload } from "lucide-react";

export default function EventoModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Agregar Evento</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form>
          <input
            type="text"
            placeholder="Nombre del Evento"
            className="input"
          />

          <input
            type="text"
            placeholder="Salón (Hacer Select)"
            className="input"
          />

          <input
            type="text"
            placeholder="Fecha y hora (Usar Date Picker)"
            className="input"
          />

          <div className="border border-dashed border-[#2a3545] rounded-lg p-6 flex flex-col items-center justify-center mb-4">
            <Upload className="h-6 w-6 text-gray-400 mb-2" />
            <span className="text-sm text-gray-400">Subir Logo</span>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}
