"use client";

import UserCard from "./UserCard";
import TicketsList from "./TicketList";
import BackButton from "./BackButton";

export default function TicketsPage() {
  const tickets = [
    { type: "Adulto" },
    { type: "Adulto" },
    { type: "Adulto" },
    { type: "Menores" },
    { type: "Menores" },
  ];

  return (
    <div className="min-h-screen bg-gray-0 text-white relative overflow-hidden">
      <header className="border-b border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px:4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold sm:text-2xl">Mi Evento</h1>
            <nav className="hidden sm:block">
              {/* Add navigation items here if needed */}
            </nav>
          </div>
        </div>
      </header>

      <main className="py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-6 sm:text-3xl">Mis entradas</h1>

          <UserCard name="Hernán Guillano" />

          <div className="my-8">
            <TicketsList tickets={tickets} />
          </div>

          <BackButton />
        </div>
      </main>
    </div>
  );
}
