"use client";

import { ArrowLeft } from "lucide-react";

export default function BackLink() {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mt-20"
    >
      <ArrowLeft
        size={16}
        className="group-hover:-translate-x-1 transition-transform"
      />
      <span>Volver Atrás</span>
    </button>
  );
}
