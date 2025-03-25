import Link from "next/link";
import { Ticket } from "lucide-react";

export default function TicketItem({ type }) {
  return (
    <div className="bg-gray-800 border border-dashed border-gray-600 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-gray-700 p-2 rounded-full">
          <Ticket size={20} className="text-teal-400" />
        </div>
        <span className="text-lg font-medium">{type}</span>
      </div>
      <Link
        href="#"
        className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-gray-300 hover:text-white transition-colors"
      >
        Asignar Entrada
      </Link>
    </div>
  );
}
