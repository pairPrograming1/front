import { Pencil } from "lucide-react";

export default function UserCard({ name }) {
  return (
    <div className="bg-[#A0A0A0] rounded-lg p-4 mb-4 flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-gray-800 text-sm">Titular</span>
        <span className="text-gray-900 text-lg font-medium">{name}</span>
      </div>
      <button className="text-gray-800 hover:bg-teal-500 p-2 rounded-full transition-colors">
        <Pencil size={20} />
      </button>
    </div>
  );
}
