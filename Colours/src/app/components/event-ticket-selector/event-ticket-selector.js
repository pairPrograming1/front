"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Importing Link component for navigation

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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR").format(value);
  };

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
      <div className="rounded-3xl w-full max-w-xl p-6">
        <div className="relative h-48 w-full mb-4">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Evento en Colegio del Sol"
            fill
            className="object-cover rounded-3xl"
            priority
          />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-2">Colegio del Sol</h2>
          <p className="text-sm text-gray-400">Área: Eventos</p>
          <p className="text-sm text-gray-400">
            Sábado 30 de Diciembre a las 20hs
          </p>
        </div>

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

        <div className="mt-6 border-t border-dashed border-gray-600 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Subtotal</span>
            <span>{formatCurrency(subtotal)}$</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Cargo de Servicio</span>
            <span>{formatCurrency(serviceFee)}$</span>
          </div>
        </div>

        <div className="bg-white bg-opacity-10 rounded p-3 mt-2 mb-4">
          <div className="flex justify-between">
            <span className="font-medium">Total a pagar:</span>
            <span className="font-medium">{formatCurrency(total)}$</span>
          </div>
        </div>

        <button className="w-full bg-teal-400 text-white py-3 rounded-full font-medium hover:bg-teal-500 transition-colors">
          Ir a Pagar
        </button>

        <div className="mt-6 text-left">
          <Link href="/" className="text-white-500 hover:underline">
            Volver atrás
          </Link>
        </div>
      </div>
    </main>
  );
}

function TicketSelector({ label, count, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-700">
      <span className="text-white">{label}</span>
      <div className="flex items-center">
        <button
          onClick={onDecrement}
          className="w-8 h-8 flex items-center justify-center bg-[#333] rounded-md text-white"
        >
          -
        </button>
        <span className="w-8 text-center text-white">{count}</span>
        <button
          onClick={onIncrement}
          className="w-8 h-8 flex items-center justify-center bg-[#333] rounded-md text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}
