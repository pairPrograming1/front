// app/prueba/vista-salon-editar/[id]/page.jsx
"use client";

import { useParams } from "next/navigation";

export default function VistaSalonEditar() {
  const { id } = useParams();

  return (
    <div className="p-6 text-white bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-bold text-amber-500 mb-4">
        Editar Salón ID: {id}
      </h1>
      {/* Aquí puedes cargar el formulario o los datos según el id */}
    </div>
  );
}
