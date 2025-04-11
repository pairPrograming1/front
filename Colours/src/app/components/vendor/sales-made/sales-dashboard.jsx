"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Header from "./Header";
import Filters from "./Filters";
import SalesSummary from "./SalesSummary";
import SalesTable from "./SalesTable";

// Datos de ejemplo
const salesData = Array(20).fill({
  eventName: "Sagrado Corazón",
  date: "20/12/2026",
  amount: "23,000,000",
});

export default function SalesDashboard() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/60">
      <div className="w-full max-w-6xl bg-[#1E2330]/70 space-y-4 z-10 rounded-xl shadow-lg">
        <Header title="XEVENT" />
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-2xl font-medium">Ventas</h2>
              <p className="text-sm text-gray-400">
                Último Registrado el 24/02/2025
              </p>
            </div>
            <button
              className="px-4 py-2 bg-[#c28b5b] hover:bg-[#b37a4a] text-white rounded-md transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? (
                <div className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  <span>Buscar</span>
                </div>
              ) : (
                "Filtrar"
              )}
            </button>
          </div>
          {showFilters ? <Filters /> : <SalesSummary />}
          <SalesTable salesData={salesData} />
        </div>
      </div>
    </div>
  );
}
