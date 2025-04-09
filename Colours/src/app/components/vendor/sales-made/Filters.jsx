import { ChevronDown } from "lucide-react";

export default function Filters() {
  return (
    <div className="bg-[#252e3f] border border-gray-700 rounded-md p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-2">Fecha</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Desde"
              className="w-full px-3 py-2 bg-[#1e2533] border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
            <input
              type="text"
              placeholder="Hasta"
              className="w-full px-3 py-2 bg-[#1e2533] border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2">Importe</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Desde"
              className="w-full px-3 py-2 bg-[#1e2533] border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
            <input
              type="text"
              placeholder="Hasta"
              className="w-full px-3 py-2 bg-[#1e2533] border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2">Evento</label>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex justify-between items-center px-3 py-2 bg-[#1e2533] border border-gray-700 rounded-md text-white text-sm hover:bg-gray-800">
              Tipo
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
            <button className="flex justify-between items-center px-3 py-2 bg-[#1e2533] border border-gray-700 rounded-md text-white text-xs hover:bg-gray-800">
              Selección de Evento
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
