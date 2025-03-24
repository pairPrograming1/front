"use client";
import Link from "next/link";
import Header from "./Header";
import SalonCard from "./SalonCard";
import InfoCard from "./InfoCard";

export default function StartSalons() {
  return (
    <main className="min-h-screen text-white bg-gray-800/50 p-8 flex flex-col items-center">
      <Header />

      {/* Contenedor Principal en Columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl flex-grow">
        {/* Columna Izquierda: Tarjeta de Salón */}
        <div className="flex flex-col items-center">
          <SalonCard />
        </div>

        {/* Columna Derecha: Tarjetas de Información */}
        <div className="space-y-6">
          <InfoCard title="Cobros" date="24/02/2025" buttonText="Ver Cobros" />
          <InfoCard
            title="Pagos"
            date="24/02/2025"
            buttonText="Ver pagos realizados"
          />
        </div>
      </div>

      {/* Botón de Volver Atrás */}
      <div className="mt-auto mb-6">
        <Link href="/" className="text-teal-300 hover:underline">
          ← Volver atrás
        </Link>
      </div>
    </main>
  );
}
