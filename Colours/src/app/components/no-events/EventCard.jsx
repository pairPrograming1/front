import Link from "next/link";
import { Plus } from "lucide-react";

export default function EventCard() {
  return (
    <div className="bg-[#1e2736]/40 rounded-3xl p-6 w-full max-w-sm mx-auto border border-[#2a6b6b]/30">
      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-12">
          No hay más eventos por el momento
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
  );
}
