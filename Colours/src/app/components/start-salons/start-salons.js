import Image from "next/image";
import Link from "next/link";

export default function StartSalons() {
  return (
    <main className="min-h-screen from-slate-800 via-teal-800 to-teal-600 text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <span className="text-2xl font-bold">COLOUR</span>
        </div>
      </header>

      <div className="flex flex-col gap-6">
        <div className="rounded-3xl overflow-hidden border border-teal-400/30 bg-black/20 backdrop-blur-sm">
          <div className="relative h-48 w-full">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Vista aérea nocturna"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl font-cursive text-white">aires</h2>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-3xl border border-teal-500/30">
          <h2 className="text-2xl font-bold mb-2 text-white">Cobros</h2>
          <p className="text-sm text-gray-300 mb-4">
            Último Registrado el 24/02/2025
          </p>
          <button className="bg-teal-500 text-white font-medium py-2 px-6 rounded-full text-sm w-full hover:bg-teal-600 focus:outline-none focus:shadow-outline">
            Ver Cobros
          </button>
        </div>

        <div className="bg-gray-700 p-6 rounded-3xl border border-teal-500/30">
          <h2 className="text-2xl font-bold mb-2 text-white">Pagos</h2>
          <p className="text-sm text-gray-300 mb-4">
            Último Registrado el 24/02/2025
          </p>
          <button className="bg-gray-800 text-white font-medium py-2 px-6 rounded-full text-sm w-full hover:bg-gray-900 focus:outline-none focus:shadow-outline">
            Ver pagos realizados
          </button>
        </div>

        <div className="mt-6 text-left">
          <Link href="/" className="text-white-500 hover:underline">
            Volver atrás
          </Link>
        </div>
      </div>
    </main>
  );
}
