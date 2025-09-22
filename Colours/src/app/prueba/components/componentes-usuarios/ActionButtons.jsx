import { Plus, UserPlus } from "lucide-react";

export default function ActionButtons({
  selectedUsers,
  handleAsignarVendedor,
  handleAsignarAdministrador,
  setShowModal,
  setShowGraduadoModal,
}) {
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-2 bg-[#BF8D6B] text-white rounded text-xs md:text-sm hover:bg-[#a67454] transition-colors"
      >
        <Plus className="h-4 w-4" />
        Agregar
      </button>

      <button
        onClick={() => setShowGraduadoModal(true)}
        className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-2 bg-[#BF8D6B] text-white rounded text-xs md:text-sm hover:bg-[#a67454] transition-colors"
      >
        <UserPlus className="h-4 w-4" />
        Agregar Graduado
      </button>

      <button
        onClick={handleAsignarVendedor}
        disabled={selectedUsers.length === 0}
        className={`flex items-center gap-1 px-2 py-1 md:px-3 md:py-2 rounded text-xs md:text-sm transition-colors ${
          selectedUsers.length === 0
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-[#BF8D6B] text-white hover:bg-[#a67454]"
        }`}
      >
        Asignar Vendedor
      </button>

      <button
        onClick={handleAsignarAdministrador}
        disabled={selectedUsers.length === 0}
        className={`flex items-center gap-1 px-2 py-1 md:px-3 md:py-2 rounded text-xs md:text-sm transition-colors ${
          selectedUsers.length === 0
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-[#BF8D6B] text-white hover:bg-[#a67454]"
        }`}
      >
        Asignar Administrador
      </button>
    </>
  );
}
