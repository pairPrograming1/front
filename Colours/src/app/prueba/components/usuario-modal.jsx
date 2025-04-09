"use client";

import { X } from "lucide-react";

export default function UsuarioModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Agregar Usuario</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form>
          <input type="text" placeholder="Usuario" className="input" />

          <input type="text" placeholder="Nombre" className="input" />

          <input type="text" placeholder="Apellido" className="input" />

          <input type="email" placeholder="E-mail" className="input" />

          <input type="text" placeholder="Rol" className="input" />

          <button type="submit" className="btn btn-primary w-full mt-4">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}
