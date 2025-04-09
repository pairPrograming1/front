"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Header from "../../../components/header";
import VendedorModal from "../../../components/vendedor-modal";

export default function DetalleSalon({ params }) {
  const [activeTab, setActiveTab] = useState("informacion");
  const [showVendedorModal, setShowVendedorModal] = useState(false);

  return (
    <div className="p-6">
      <Header title="Colour Rosario" showBack={true} />

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input type="text" placeholder="Dirección" className="input" />
          <input type="text" placeholder="CUIT" className="input" />
          <input
            type="text"
            placeholder="Asignar un Usuario"
            className="input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Persona de Contacto"
            className="input"
          />
          <input type="email" placeholder="Email" className="input" />
          <input type="text" placeholder="WhatsApp" className="input" />
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          className={`tab ${activeTab === "informacion" ? "active" : ""}`}
          onClick={() => setActiveTab("informacion")}
        >
          Información
        </button>
        <button
          className={`tab ${activeTab === "cobros" ? "active" : ""}`}
          onClick={() => setActiveTab("cobros")}
        >
          Cobros
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="col-span-2 sm:col-span-1">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4">Salones Habilitados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1E2330] border border-[#2A2F3D] rounded-lg p-6 flex items-center justify-center">
                <span className="text-2xl font-light italic">aires</span>
              </div>
              <div className="border border-dashed border-[#2A2F3D] rounded-lg p-6 flex items-center justify-center">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Vendedores asignados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1E2330] border border-[#2A2F3D] rounded-lg p-4">
                <h3 className="font-semibold">Uriel Casado</h3>
                <p className="text-sm text-gray-400">Teléfono</p>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-sm text-gray-400">WhatsApp</p>
              </div>
              <div
                className="border border-dashed border-[#2A2F3D] rounded-lg p-6 flex items-center justify-center cursor-pointer"
                onClick={() => setShowVendedorModal(true)}
              >
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Tipos de Cobro</h2>

          <div className="bg-[#2A2F3D] border border-[#2A2F3D] rounded-lg p-4 mb-4">
            <h3 className="font-semibold mb-2">Mercado Pago</h3>
            <input type="text" placeholder="API Key" className="input" />
            <input type="text" placeholder="Secret ID" className="input" />
          </div>

          <div className="bg-[#2A2F3D] border border-[#2A2F3D] rounded-lg p-4 mb-4">
            <h3 className="font-semibold mb-2">Transferencia</h3>
            <input type="text" placeholder="CBU" className="input" />
            <input
              type="text"
              placeholder="Entidad de Cobro"
              className="input"
            />
          </div>

          <div className="bg-[#2A2F3D] border border-[#2A2F3D] rounded-lg p-4">
            <h3 className="font-semibold mb-2">Efectivo</h3>
          </div>
        </div>
      </div>

      {showVendedorModal && (
        <VendedorModal onClose={() => setShowVendedorModal(false)} />
      )}
    </div>
  );
}
