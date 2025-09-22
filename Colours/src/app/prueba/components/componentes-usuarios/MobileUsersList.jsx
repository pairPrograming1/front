import { Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";

export default function MobileUsersList({
  currentItems,
  selectedUsers,
  toggleUserSelection,
  expandedUser,
  setExpandedUser,
  setUsuarioEditar,
  borrarUsuario,
}) {
  return (
    <div className="space-y-2">
      {currentItems.map((user) => {
        console.log("Usuario en MobileUsersList:", user);
        return (
          <div
            key={user.id}
            className="bg-[#2a2a2a] rounded-lg p-3 text-white text-xs"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleUserSelection(user.id)}
                  className="rounded border-[#BF8D6B] text-[#BF8D6B] focus:ring-[#BF8D6B]"
                />
                <span>
                  {user.nombre} {user.apellido}
                </span>
              </div>
              <button
                onClick={() =>
                  setExpandedUser(expandedUser === user.id ? null : user.id)
                }
              >
                {expandedUser === user.id ? (
                  <ChevronUp className="h-4 w-4 text-[#BF8D6B]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#BF8D6B]" />
                )}
              </button>
            </div>
            {expandedUser === user.id && (
              <div className="mt-2 space-y-1">
                <p>
                  <strong>Usuario:</strong> {user.usuario || "-"}
                </p>
                <p>
                  <strong>Email:</strong> {user.email || "-"}
                </p>
                <p>
                  <strong>Rol:</strong>{" "}
                  {user.rol
                    ? user.rol.charAt(0).toUpperCase() + user.rol.slice(1)
                    : "-"}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  {user.isActive ? "Activo" : "Inactivo"}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setUsuarioEditar(user)}
                    className="text-[#BF8D6B] hover:text-[#a67454] transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => borrarUsuario(user.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
