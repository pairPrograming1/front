"use client";

import { useState } from "react";
import Header from "./header";
import SearchFilters from "./search-filters";
import EventList from "./event-list";

export default function EventSearch() {
  const [events] = useState([
    {
      id: 1,
      name: "Nombre del Evento",
      location: "Lugar del Evento",
      date: "Fecha del evento",
    },
    {
      id: 2,
      name: "Nombre del Evento",
      location: "Lugar del Evento",
      date: "Fecha del evento",
    },
    {
      id: 3,
      name: "Nombre del Evento",
      location: "Lugar del Evento",
      date: "Fecha del evento",
    },
    {
      id: 4,
      name: "Nombre del Evento",
      location: "Lugar del Evento",
      date: "Fecha del evento",
    },
    {
      id: 5,
      name: "Nombre del Evento",
      location: "Lugar del Evento",
      date: "Fecha del evento",
    },
    {
      id: 6,
      name: "Nombre del Evento",
      location: "Lugar del Evento",
      date: "Fecha del evento",
    },
    {
      id: 7,
      name: "Nombre del Evento",
      location: "Lugar del Evento",
      date: "Fecha del evento",
    },
    {
      id: 8,
      name: "Nombre del Evento",
      location: "Lugar del Evento",
      date: "Fecha del evento",
    },
  ]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40">
      <div className="w-full max-w-5xl bg-[#1E2330]/80 p-6 rounded-xl shadow-lg">
        <Header />
        <h2 className="text-xl font-semibold text-white mb-4">Buscar Evento</h2>
        <SearchFilters />
        <div className="h-px bg-gradient-to-r from-transparent via-[#b3964c] to-transparent my-6"></div>
        <EventList events={events} />
      </div>
    </div>
  );
}
