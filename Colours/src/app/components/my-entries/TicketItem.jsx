import Link from "next/link";

export default function TicketItem({ type }) {
  return (
    <div className="bg-gray-800 border border-dashed border-gray-600 rounded-lg p-6 flex justify-between items-center space-x-4">
      <span className="text-lg">{type}</span>
      <Link
        href="#"
        className="text-sm text-gray-300 hover:text-white transition-colors"
      >
        Asignar Entrada
      </Link>
    </div>
  );
}
