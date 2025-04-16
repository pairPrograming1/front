import { ChevronDown } from "lucide-react";

export default function SalesTable({ salesData }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-gray-400 text-sm">
            <th className="py-2 px-4 font-medium">
              Nombre del Evento <ChevronDown className="inline h-4 w-4" />
            </th>
            <th className="py-2 px-4 font-medium">
              Fecha <ChevronDown className="inline h-4 w-4" />
            </th>
            <th className="py-2 px-4 font-medium">
              Cotizado <ChevronDown className="inline h-4 w-4" />
            </th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale, index) => (
            <tr key={index} className="border-t border-gray-700">
              <td className="py-3 px-4">{sale.eventName}</td>
              <td className="py-3 px-4">{sale.date}</td>
              <td className="py-3 px-4">{sale.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
