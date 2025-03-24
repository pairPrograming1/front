import Header from "./Header";
import CobrosInfo from "./CobrosInfo";
import FacturaCard from "./FacturaCard";
import CobrosRecibidos from "./CobrosRecibidos";
import CobrosTable from "./CobrosTable";
import BackLink from "./BackLink";

export default function Collection() {
  return (
    <div className="bg-gray-900/50 p-6 sm:p-10 rounded-lg w-full max-w-screen-lg mx-auto">
      {/* Header centrado */}
      <div className="flex justify-center mb-8">
        <Header />
      </div>

      {/* Grid de dos columnas en pantallas grandes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="col-span-1 space-y-8">
          {/* Sección de cobros */}
          <CobrosInfo />
          <FacturaCard />
          <CobrosRecibidos />
        </div>

        <div className="col-span-1 space-y-8">
          {/* Tabla de cobros */}
          <CobrosTable />
        </div>
      </div>

      {/* Botón Volver abajo a la izquierda */}
      <div className="mt-8">
        <BackLink />
      </div>
    </div>
  );
}
