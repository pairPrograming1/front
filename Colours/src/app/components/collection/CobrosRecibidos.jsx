import { Filter } from "lucide-react";

export default function CobrosRecibidos() {
  return (
    <div className="border border-[#C28B60] rounded-lg p-6 mb-6 bg-gray-700">
      <h3 className="text-[#C28B60] font-medium mb-1">Cobros Recibidos</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-white">Total Recibido $ 1000000</p>
          <p className="text-sm text-white">Porcentaje 42.5%</p>
          <p className="text-xs text-gray-400 mt-2">
            Dinámica de cobro en avance: 42.5%
          </p>
        </div>
        <button className="bg-[#C28B60] text-white px-4 py-2 rounded-md text-sm flex items-center">
          Ver Filtros
          <Filter className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
