"use client";
import { useState } from "react";
import Header from "./Header";
import EventInfo from "./EventInfo";
import TicketSelector from "./TicketSelector";
import Summary from "./Summary";
import PaymentButton from "./PaymentButton";
import BackLink from "./BackLink";

export default function EventTicketSelector() {
  const [tickets, setTickets] = useState({
    adultos: 4,
    menores: 0,
    adultosSinCargo: 0,
    menoresSinCargo: 2,
  });

  const precioAdulto = 65000;
  const serviceFeePercentage = 0.01;

  const subtotal = tickets.adultos * precioAdulto;
  const serviceFee = Math.round(subtotal * serviceFeePercentage);
  const total = subtotal + serviceFee;

  const handleIncrement = (type) => {
    setTickets((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleDecrement = (type) => {
    if (tickets[type] > 0) {
      setTickets((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
      }));
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#12151f]/40 text-white px-4 py-8">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-3xl w-full max-w-5xl bg-gray-800/50 p-6 shadow-lg backdrop-blur-sm border border-teal-400/20">
        {/* Columna Izquierda - Información y Selectores de Tickets */}
        <div className="space-y-6">
          <EventInfo />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["adultos", "menores", "adultosSinCargo", "menoresSinCargo"].map(
              (type, index) => (
                <TicketSelector
                  key={index}
                  label={type.replace(/([A-Z])/g, " $1")}
                  count={tickets[type]}
                  onIncrement={() => handleIncrement(type)}
                  onDecrement={() => handleDecrement(type)}
                />
              )
            )}
          </div>
        </div>

        {/* Columna Derecha - Resumen de Compra */}
        <div className="flex flex-col justify-between space-y-6">
          <Summary subtotal={subtotal} serviceFee={serviceFee} total={total} />
          <PaymentButton />
          <BackLink />
        </div>
      </div>
    </main>
  );
}
