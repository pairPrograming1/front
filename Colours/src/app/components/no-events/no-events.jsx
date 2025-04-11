"use client";

import Header from "./Header";
import EventCard from "./EventCard";
import BackButton from "./BackButton";

export default function NoEvents() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 px-4 py-8">
      <div className="w-full max-w-4xl bg-[#1E2330]/70 rounded-2xl shadow-lg p-6 md:p-10 text-white">
        <Header />

        <div className="flex flex-col items-center justify-center mt-10 space-y-8">
          <EventCard />

          {/* Indicadores de evento */}
          <div className="flex justify-center space-x-3">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-full bg-[#2a6b6b]/50"
              ></span>
            ))}
            <span className="h-2 w-2 rounded-full bg-[#2a6b6b]"></span>
          </div>

          {/* Botón Volver */}
          <BackButton />
        </div>
      </div>
    </main>
  );
}
