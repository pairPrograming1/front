"use client";
import Link from "next/link";
import { useState } from "react";

export default function NoEvents() {
  const handleGoBack = () => {
    window.history.back(); // Navegar atrás en el historial
  };
  return (
    <main className="min-h-screen text-white">
      <header className="flex justify-between mb-30 items-center p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-white">Bienvenidos a</span>
          </h1>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-slate-0 rounded-3xl p-6 w-full max-w-sm mx-auto ">
          <div className="text-center py-6">
            <h2 className="text-xl font-bold mb-8">
              No hay mas eventos por el momento
            </h2>

            <Link
              href="/form-event"
              className="inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Solicitar Evento
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-12 space-x-2">
          <span className="h-2 w-2 rounded-full bg-gray-400"></span>
          <span className="h-2 w-2 rounded-full bg-gray-400"></span>
          <span className="h-2 w-2 rounded-full bg-gray-400"></span>
          <span className="h-2 w-2 rounded-full bg-gray-400"></span>
          <span className="h-2 w-2 rounded-full bg-teal-400"></span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <a
          href="/"
          onClick={handleGoBack}
          className="text-teal-300 hover:text-teal-400"
        >
          Volver atrás
        </a>
      </div>
    </main>
  );
}
