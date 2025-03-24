import { ChevronRight } from "lucide-react";

export default function CobrosTable() {
  return (
    <div className="border border-green-500 rounded-lg overflow-hidden bg-gray-700">
      <div className="grid grid-cols-3 bg-green-500/20 p-3 text-xs font-medium text-white">
        <div className="flex items-center">
          Nombre del Evento <ChevronRight className="h-3 w-3 ml-1" />
        </div>
        <div className="flex items-center">
          Fecha <ChevronRight className="h-3 w-3 ml-1" />
        </div>
        <div className="flex items-center">
          Cobrado <ChevronRight className="h-3 w-3 ml-1" />
        </div>
      </div>

      <div className="divide-y divide-gray-600">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="grid grid-cols-3 p-3 text-xs text-white">
              <div>Sagrado Corazón</div>
              <div>20/02/2025</div>
              <div>23,000,000</div>
            </div>
          ))}
      </div>
    </div>
  );
}
