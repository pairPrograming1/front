"use client";
import { Plus } from "lucide-react";
import Header from "../../components/header";

export default function DetalleSalon({ params }) {
  return (
    <div className="p-6">
      <Header title="Aires Eventos" showBack={true} />

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <input type="text" placeholder="Nombre del Salón" className="input" />
          <input type="text" placeholder="Dirección" className="input" />
          <input
            type="text"
            placeholder="Asignar un Usuario"
            className="input"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <input type="text" placeholder="CUIT" className="input" />
          <input
            type="text"
            placeholder="Condición ante el IVA"
            className="input"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Teléfono de Contacto"
            className="input"
          />
          <input type="text" placeholder="WhatsApp" className="input" />
          <input type="email" placeholder="Email" className="input" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Puntos de Venta Asignados
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a2535] border border-[#2a3545] rounded-lg p-6 flex items-center justify-center">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mr-2">
                    <span className="text-[#1a2535] font-bold">C</span>
                  </div>
                  <span className="text-xl font-bold">OLOUR</span>
                </div>
              </div>
              <div className="border border-dashed border-[#2a3545] rounded-lg p-6 flex items-center justify-center">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Tipos de Cobro</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#2A2F3D] border border-[#2A2F3D] rounded-lg p-4">
                <h3 className="font-semibold mb-2">Mercado Pago</h3>
                <input type="text" placeholder="API Key" className="input" />
                <input type="text" placeholder="Secret ID" className="input" />
              </div>
              <div className="bg-[#2A2F3D] border border-[#2A2F3D] rounded-lg p-4">
                <h3 className="font-semibold mb-2">Transferencia</h3>
                <input type="text" placeholder="CBU" className="input" />
                <input
                  type="text"
                  placeholder="Entidad de Cobro"
                  className="input"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-[#2A2F3D] border border-[#2A2F3D] rounded-lg p-4 mb-4 flex items-center justify-center h-40">
            <span className="text-4xl font-light italic">aires</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-08%20214654-cOfMvHsvnMZkJJ6vh7RAgO2oDGfUUD.png"
              alt="Imagen de salón"
              className="rounded-lg w-full h-24 object-cover"
            />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-08%20214654-cOfMvHsvnMZkJJ6vh7RAgO2oDGfUUD.png"
              alt="Imagen de salón"
              className="rounded-lg w-full h-24 object-cover"
            />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-08%20214654-cOfMvHsvnMZkJJ6vh7RAgO2oDGfUUD.png"
              alt="Imagen de salón"
              className="rounded-lg w-full h-24 object-cover"
            />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-08%20214654-cOfMvHsvnMZkJJ6vh7RAgO2oDGfUUD.png"
              alt="Imagen de salón"
              className="rounded-lg w-full h-24 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
