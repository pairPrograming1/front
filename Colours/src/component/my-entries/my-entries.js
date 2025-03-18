import { Menu } from "lucide-react";
import Link from "next/link";

export default function TicketsPage() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-full h-1/3 bg-teal-0 rounded-tl-[100px] -z-10" />

      <header className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold">
            C<span className="text-xl">OLOUR</span>
          </span>
        </div>
      </header>

      <main className="px-12 pb-20 max-w-full">
        <h1 className="text-2xl font-bold mb-4">Mis entradas</h1>

        <div className="bg-teal-400 rounded-lg p-4 mb-4 flex justify-between items-center">
          <span className="text-lg">Hernán Guillano</span>
          <button className="text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {[
            { type: "Adulto" },
            { type: "Adulto" },
            { type: "Adulto" },
            { type: "Menores" },
            { type: "Menores" },
          ].map((ticket, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-dashed border-gray-600 rounded-lg p-6 flex justify-between items-center space-x-4" // Agregado space-x-4
            >
              <span className="text-lg">{ticket.type}</span>
              <Link
                href="#"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Asignar Entrada
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
