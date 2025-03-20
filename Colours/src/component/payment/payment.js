import Image from "next/image";
import Link from "next/link"; // Importa Link de Next.js

export default function Payment() {
  return (
    <div className="bg-gray-0 p-8 rounded-lg w-full max-w-sm mx-auto">
      <header className="mb-6">
        <Link href="/" passHref>
          <a className="text-white text-sm mb-4 block">← Volver atrás</a>{" "}
          {/* Enlace de volver atrás */}
        </Link>
        <h1 className="text-2xl font-bold text-center text-white">Colours</h1>
      </header>

      <main className="flex flex-col space-y-4">
        <div className="rounded-lg overflow-hidden mb-4 border border-gray-700">
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt="Evento"
            width={400}
            height={200}
            className="w-full object-cover"
          />
        </div>

        <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
          <div className="flex justify-between mb-1">
            <span className="text-gray-300">Subtotal</span>
            <span className="text-white">260.000$</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mb-3">
            <span>+ Cargo por servicio</span>
            <span>2600$</span>
          </div>
          <div className="flex justify-between font-bold text-white">
            <span>Total a pagar</span>
            <span>262600$</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="border border-gray-700 rounded-lg p-3 flex justify-between items-center bg-gray-600">
            <span className="text-white">Pagar con Mercado Pago</span>
            <div className="w-5 h-5 border border-amber-500 rounded-sm"></div>
          </div>

          <div className="border border-dashed border-gray-500 rounded-lg p-3 flex justify-between items-center">
            <span className="text-gray-400">
              Tarjeta de crédito (Próximamente)
            </span>
          </div>

          <div className="border border-dashed border-gray-500 rounded-lg p-3 flex justify-between items-center">
            <span className="text-gray-400">Transferencia (Próximamente)</span>
          </div>
        </div>

        <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors">
          Ir a Pagar
        </button>
      </main>
    </div>
  );
}
