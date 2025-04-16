"use client";

import Header from "./Header";
import SalonCard from "./SalonCard";
import InfoCard from "./InfoCard";
import BackLink from "./BackLink";

export default function StartSalons() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 px-4 py-8">
      <div className="w-full max-w-6xl bg-[#1E2330]/70 rounded-2xl shadow-lg p-6 md:p-10">
        <Header />

        {/* Contenedor Principal en Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Columna Izquierda: Tarjeta de Salón */}
          <div className="flex flex-col items-center">
            <SalonCard />
          </div>

          {/* Columna Derecha: Tarjetas de Información */}
          <div className="space-y-6">
            <InfoCard
              title="Cobros"
              date="24/02/2025"
              buttonText="Ver Cobros"
            />
            <InfoCard
              title="Pagos"
              date="24/02/2025"
              buttonText="Ver pagos realizados"
            />
          </div>
        </div>

        {/* Botón de Volver Atrás */}
        <div className="mt-10 text-center">
          <BackLink />
        </div>
      </div>
    </main>
  );
}
