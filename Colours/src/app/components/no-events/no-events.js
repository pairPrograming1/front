"use client";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function NoEvents() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <main className="min-h-screen text-white">
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-wider">
            <span className="text-white">COLOUR</span>
          </h1>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center px-4 py-12 h-[80vh]">
        <div className="bg-[#1e2736]/40 rounded-3xl p-6 w-full max-w-sm mx-auto border border-[#2a6b6b]/30">
          <div className="text-center py-8">
            <h2 className="text-xl font-bold mb-12">
              No hay mas eventos por el momento
            </h2>

            <Link
              href="/form-event"
              className="inline-flex items-center gap-2 bg-[#2a6b6b] hover:bg-[#3a8b8b] text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Solicitar Evento
              <Plus size={18} />
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-12 space-x-3">
          <span className="h-2 w-2 rounded-full bg-[#2a6b6b]/50"></span>
          <span className="h-2 w-2 rounded-full bg-[#2a6b6b]/50"></span>
          <span className="h-2 w-2 rounded-full bg-[#2a6b6b]/50"></span>
          <span className="h-2 w-2 rounded-full bg-[#2a6b6b]/50"></span>
          <span className="h-2 w-2 rounded-full bg-[#2a6b6b]"></span>
        </div>
      </div>

      <div className="mt-6 text-left pl-8">
        <Link
          href="#"
          onClick={handleGoBack}
          className="text-white-500 hover:underline"
        >
          Volver atrás
        </Link>
      </div>
    </main>
  );
}
