"use client";
import Header from "./Header";
import CobrosInfo from "./CobrosInfo";
import FacturaCard from "./FacturaCard";
import CobrosRecibidos from "./CobrosRecibidos";
import CobrosTable from "./CobrosTable";
import BackLink from "./BackLink";

export default function Collection() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 text-white px-4 py-8">
      <div className="bg-gray-900/50 p-6 sm:p-10 rounded-2xl w-full max-w-6xl shadow-xl backdrop-blur-sm border border-teal-400/20">
        {/* Header centrado */}
        <div className="flex justify-center mb-8">
          <Header />
        </div>

        {/* Grid de dos columnas en pantallas grandes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="col-span-1 space-y-8">
            <CobrosInfo />
            <FacturaCard />
            <CobrosRecibidos />
          </div>

          <div className="col-span-1 space-y-8">
            <CobrosTable />
          </div>
        </div>

        {/* Botón Volver abajo a la izquierda */}
        <div className="mt-8">
          <BackLink />
        </div>
      </div>
    </main>
  );
}
