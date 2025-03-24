import { ChevronRight, Filter } from "lucide-react";
import Link from "next/link";

export default function Collection() {
  return (
    <div className="bg-gray-0 p-8 rounded-lg w-full max-w-screen-lg mx-auto">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-white">COLOUR</span>
        </div>
      </header>

      <main>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Cobros</h1>
          <p className="text-sm text-gray-400">
            Último Registrado el 24/02/2025
          </p>
        </div>

        <div className="border border-green-500 rounded-lg p-6 mb-6 bg-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <div className="border-r border-green-500 pr-4">
              <h3 className="text-green-500 font-medium mb-1">
                Factura Impaga
              </h3>
              <p className="text-xs text-gray-400">Subtotal 2000+2025</p>
              <p className="text-xs text-gray-400">Impuesto 000000</p>
              <p className="text-xs text-gray-400">Total de pago 24/02/2025</p>
            </div>
            <div>
              <h3 className="text-green-500 font-medium mb-1">
                Factura Impaga
              </h3>
              <p className="text-xs text-gray-400">Subtotal 2000+2025</p>
              <p className="text-xs text-gray-400">Impuesto 000000</p>
              <p className="text-xs text-gray-400">Total de pago 24/02/2025</p>
            </div>
          </div>

          <div className="flex justify-center mt-4 space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === 0 ? "bg-green-500" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="border border-green-500 rounded-lg p-6 mb-6 bg-gray-700">
          <h3 className="text-green-500 font-medium mb-1">Cobros Recibidos</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-white">Total Recibido $ 1000000</p>
              <p className="text-sm text-white">Porcentaje 42.5%</p>
              <p className="text-xs text-gray-400 mt-2">
                Dinámica de cobro en avance: 42.5%
              </p>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm flex items-center">
              Ver Filtros
              <Filter className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>

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
                <div
                  key={i}
                  className="grid grid-cols-3 p-3 text-xs text-white"
                >
                  <div>Sagrado Corazón</div>
                  <div>20/02/2025</div>
                  <div>23,000,000</div>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-white-500 hover:underline">
            Volver Atrás
          </Link>
        </div>
      </main>
    </div>
  );
}
