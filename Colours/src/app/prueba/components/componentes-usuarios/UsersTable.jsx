import { Edit, Trash2 } from "lucide-react";

export default function UsersTable({
  currentItems,
  selectedUsers,
  toggleUserSelection,
  toggleSelectAll,
  setUsuarioEditar,
  borrarUsuario,
  isCurrentUser,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-white text-xs md:text-sm">
        <thead>
          <tr className="bg-[#2a2a2a]">
            <th className="p-2">
              <input
                type="checkbox"
                onChange={() => toggleSelectAll(currentItems)}
                checked={
                  currentItems.length > 0 &&
                  currentItems.every((user) => selectedUsers.includes(user.id))
                }
                className="rounded border-[#BF8D6B] text-[#BF8D6B] focus:ring-[#BF8D6B]"
              />
            </th>
            <th className="p-2 text-left">Usuario</th>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Rol</th>
            <th className="p-2 text-left">Estado</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => {
            console.log("Usuario en UsersTable:", user);
            return (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                    disabled={isCurrentUser(user.id)}
                    className="rounded border-[#BF8D6B] text-[#BF8D6B] focus:ring-[#BF8D6B]"
                  />
                </td>
                <td className="p-2">{user.usuario || "-"}</td>
                <td className="p-2">
                  {user.nombre} {user.apellido}
                </td>
                <td className="p-2">{user.email || "-"}</td>
                <td className="p-2">
                  {user.rol
                    ? user.rol.charAt(0).toUpperCase() + user.rol.slice(1)
                    : "-"}
                </td>
                <td className="p-2">{user.isActive ? "Activo" : "Inactivo"}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => setUsuarioEditar(user)}
                    className="text-[#BF8D6B] hover:text-[#a67454] transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => borrarUsuario(user.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    disabled={isCurrentUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
