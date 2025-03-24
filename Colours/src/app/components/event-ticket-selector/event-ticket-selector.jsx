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
    <main className="min-h-screen text-white flex flex-col items-center justify-center p-4">
      <Header />
      <div className="rounded-3xl w-full max-w-xl p-6">
        <EventInfo />
        <div className="space-y-4">
          <TicketSelector
            label="Adultos"
            count={tickets.adultos}
            onIncrement={() => handleIncrement("adultos")}
            onDecrement={() => handleDecrement("adultos")}
          />
          <TicketSelector
            label="Menores"
            count={tickets.menores}
            onIncrement={() => handleIncrement("menores")}
            onDecrement={() => handleDecrement("menores")}
          />
          <TicketSelector
            label="Adultos sin Cargo"
            count={tickets.adultosSinCargo}
            onIncrement={() => handleIncrement("adultosSinCargo")}
            onDecrement={() => handleDecrement("adultosSinCargo")}
          />
          <TicketSelector
            label="Menores sin Cargo"
            count={tickets.menoresSinCargo}
            onIncrement={() => handleIncrement("menoresSinCargo")}
            onDecrement={() => handleDecrement("menoresSinCargo")}
          />
        </div>
        <Summary subtotal={subtotal} serviceFee={serviceFee} total={total} />
        <PaymentButton />
        <BackLink />
      </div>
    </main>
  );
}
