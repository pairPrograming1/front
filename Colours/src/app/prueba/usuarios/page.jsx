"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  ChevronRight,
  Eye,
  EyeOff,
  Trash2,
  Power,
  Archive,
  Edit,
  UserPlus,
  UserMinus,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  ListFilter,
} from "lucide-react";
import UsuarioModal from "../components/usuario-modal";
import UsuarioEditarModal from "../components/usuario-editar-modal";
import Header from "../components/header";
import Swal from "sweetalert2";
import apiUrls from "@/app/components/utils/apiConfig";

const API_URL = apiUrls;

export default function Usuarios() {
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedUser, setExpandedUser] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/api/users/usuarios?`;

      if (filterMode === "active") {
        url += "status=true";
      } else if (filterMode === "inactive") {
        url += "status=false";
      } else {
        url += "includeAll=true";
      }

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ||
            `Error del servidor (${response.status}): No se pudieron cargar los usuarios`
        );
      }

      const data = await response.json();

      if (filterMode === "all" && Array.isArray(data)) {
        setUsuarios(data);
      } else {
        setUsuarios(data);
      }
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Error al cargar usuarios",
        text: err.message || "No se pudo establecer conexión con el servidor",
        footer:
          "Intente refrescar la página o contacte al administrador del sistema",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isClient) {
      fetchUsuarios();
    }
  }, [filterMode, isClient]);

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const searchText = removeAccents(searchTerm.toLowerCase());
    return (
      (usuario.usuario &&
        removeAccents(usuario.usuario.toLowerCase()).includes(searchText)) ||
      (usuario.email &&
        removeAccents(usuario.email.toLowerCase()).includes(searchText)) ||
      (usuario.nombre &&
        removeAccents(usuario.nombre.toLowerCase()).includes(searchText)) ||
      (usuario.apellido &&
        removeAccents(usuario.apellido.toLowerCase()).includes(searchText)) ||
      (usuario.nombre &&
        usuario.apellido &&
        removeAccents(
          `${usuario.nombre} ${usuario.apellido}`.toLowerCase()
        ).includes(searchText))
    );
  });

  const toggleUserSelection = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === currentItems.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentItems.map((user) => user.id));
    }
  };

  const handleAsignarRoles = () => {
    if (selectedUsers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Ningún usuario seleccionado",
        text: "Por favor selecciona al menos un usuario para asignar roles",
      });
      return;
    }

    Swal.fire({
      title: `Asignar rol de administrador`,
      html: `
        <div class="text-left">
          <p>¿Estás seguro de asignar el rol de <strong>administrador</strong> a <strong>${selectedUsers.length}</strong> usuario(s) seleccionado(s)?</p>
          <div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-yellow-700">
                  Los administradores tendrán acceso completo al sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, asignar administrador (${selectedUsers.length})`,
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        asignarRolMultiple("admin");
      }
    });
  };

  const handleQuitarRoles = () => {
    if (selectedUsers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Ningún usuario seleccionado",
        text: "Por favor selecciona al menos un usuario para quitar roles",
      });
      return;
    }

    Swal.fire({
      title: "¿Asignar rol de vendedor?",
      text: "Esto cambiará el rol de los usuarios seleccionados a 'vendor'",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar a vendor",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        asignarRolMultiple("vendor");
      }
    });
  };

  const asignarRolMultiple = async (rol) => {
    try {
      const promises = selectedUsers.map(async (userId) => {
        const response = await fetch(
          `${API_URL}/api/users/change-role/${userId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rol }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.message ||
              `Error al asignar rol al usuario ID: ${userId} (${response.status})`
          );
        }

        return response;
      });

      const results = await Promise.allSettled(promises);

      const exitosos = results.filter(
        (result) => result.status === "fulfilled"
      ).length;
      const fallidos = results.length - exitosos;

      const errores = results
        .filter((result) => result.status === "rejected")
        .map((result) => result.reason.message);

      await fetchUsuarios();
      setSelectedUsers([]);

      Swal.fire({
        icon: exitosos > 0 ? "success" : "error",
        title: exitosos > 0 ? "Roles asignados" : "Error",
        text: `${exitosos} usuario(s) actualizados con éxito. ${
          fallidos > 0
            ? `${fallidos} usuario(s) no pudieron ser actualizados.`
            : ""
        }`,
        ...(errores.length > 0 && {
          footer: `<ul class="text-left"><li>${errores
            .slice(0, 3)
            .join("</li><li>")}</li>${
            errores.length > 3 ? "<li>...</li>" : ""
          }</ul>`,
        }),
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al asignar roles",
        text: error.message || "Ocurrió un error al asignar los roles",
        footer:
          "Verifica que los usuarios seleccionados existan y tengan los permisos adecuados",
      });
    }
  };

  const changeUserStatus = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    const actionText = newStatus ? "activar" : "desactivar";

    const confirmResult = await Swal.fire({
      title: `¿${newStatus ? "Activar" : "Desactivar"} usuario?`,
      text: `Estás a punto de ${actionText} este usuario.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, ${actionText}`,
      cancelButtonText: "Cancelar",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(`${API_URL}/api/users/soft-delete/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ||
            `Error al ${actionText} el usuario (${response.status}: ${response.statusText})`
        );
      }

      await fetchUsuarios();

      await Swal.fire({
        title: `Usuario ${newStatus ? "activado" : "desactivado"}`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        footer: `No se pudo ${actionText} el usuario. Intente nuevamente o contacte al administrador.`,
      });
    }
  };

  const agregarUsuario = async (nuevoUsuario) => {
    try {
      const response = await fetch(`${API_URL}/api/users/create-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ||
            `Error al crear usuario (${response.status}: ${response.statusText})`
        );
      }

      await fetchUsuarios();
      setShowModal(false);
      Swal.fire({
        icon: "success",
        title: "Usuario creado",
        text: "El usuario fue creado correctamente",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear usuario",
        text:
          error.message ||
          "Hubo un problema con el servidor al intentar crear el usuario",
        footer:
          "Comprueba que todos los campos sean válidos y que el correo no esté duplicado",
      });
    }
  };

  const modificarUsuario = async (id, datosActualizados) => {
    try {
      Swal.fire({
        title: "Guardando cambios...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch(`${API_URL}/api/users/perfil/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(datosActualizados),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ||
            `Error al modificar usuario (${response.status}: ${response.statusText})`
        );
      }

      await fetchUsuarios();

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Los datos del usuario se actualizaron correctamente",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al modificar usuario:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Hubo un problema al actualizar el usuario",
        footer: "Por favor verifique los datos e intente nuevamente",
      });

      throw error;
    }
  };

  const borrarUsuario = async (id) => {
    const confirmResult = await Swal.fire({
      title: "¿Eliminar permanentemente?",
      text: "Esta acción no se puede deshacer. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/api/users/delete/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.message ||
              `Error al eliminar el usuario (${response.status}: ${response.statusText})`
          );
        }

        await fetchUsuarios();
        Swal.fire(
          "Eliminado",
          "El usuario ha sido eliminado correctamente",
          "success"
        );
      } catch (error) {
        Swal.fire({
          title: "Error al eliminar",
          text: error.message,
          icon: "error",
          footer:
            "El usuario podría estar vinculado a registros existentes o no tienes los permisos necesarios para eliminarlo",
        });
      }
    }
  };

  const cambiarRolUsuario = async (id, rol) => {
    try {
      const response = await fetch(`${API_URL}/api/users/change-role/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rol }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ||
            `Error al cambiar el rol del usuario (${response.status}: ${response.statusText})`
        );
      }

      await fetchUsuarios();
      Swal.fire({
        icon: "success",
        title: "Rol actualizado",
        text: `El rol ha sido actualizado a ${rol}`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cambiar rol",
        text: error.message || "Ocurrió un error al cambiar el rol",
        footer:
          "Verifica que tengas los permisos adecuados para realizar esta acción",
      });
    }
  };

  const totalPages = Math.ceil(usuariosFiltrados.length / itemsPerPage);
  const currentItems = usuariosFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!isClient) return null;

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <Header title="Usuarios" />
        <div className="flex justify-center items-center h-64">
          <p>Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <Header title="Usuarios" />
        <div className="alert alert-error">
          <p>Error: {error}</p>
          <button
            className="btn btn-sm btn-outline mt-2"
            onClick={() => fetchUsuarios()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <Header title="Usuarios" />

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 w-full">
          <div className="relative w-full md:w-1/3 lg:w-3/4 mb-4 ">
            <input
              type="text"
              placeholder="    Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input pl-10 w-full py-1"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search className="text-gray-400 h-4 w-4" />
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              className={`btn ${
                filterMode === "active" ? "btn-warning" : "btn-outline"
              } flex items-center gap-2`}
              onClick={() => setFilterMode("active")}
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Activos</span>
            </button>
            <button
              className={`btn ${
                filterMode === "inactive" ? "btn-warning" : "btn-outline"
              } flex items-center gap-2`}
              onClick={() => setFilterMode("inactive")}
            >
              <EyeOff className="h-4 w-4" />
              <span className="hidden sm:inline">Inactivos</span>
            </button>
            <button
              className={`btn ${
                filterMode === "all" ? "btn-warning" : "btn-outline"
              } flex items-center gap-2`}
              onClick={() => setFilterMode("all")}
            >
              <ListFilter className="h-4 w-4" />
              <span className="hidden sm:inline">Todos</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            className="btn btn-outline flex items-center gap-2 w-full md:w-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MoreHorizontal className="h-4 w-4" />
            Asignacion de roles
          </button>

          <button
            className="btn btn-primary flex items-center gap-2 w-full md:w-auto"
            onClick={() => setShowModal(true)}
          >
            <Plus className="h-4 w-4" />
            Agregar usuario
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-4 p-4 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                className="btn btn-secondary flex items-center gap-2"
                onClick={handleQuitarRoles}
                disabled={selectedUsers.length === 0}
              >
                <UserMinus className="h-4 w-4" />
                Asignar rol Vendedor
              </button>

              <button
                className="btn btn-primary flex items-center gap-2"
                onClick={handleAsignarRoles}
                disabled={selectedUsers.length === 0}
              >
                <UserPlus className="h-4 w-4" />
                Asignar rol Administrador
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <div className="hidden md:block">
          <table className="table min-w-full">
            <thead>
              <tr>
                <th className="w-10">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === currentItems.length &&
                      currentItems.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Usuario</th>
                <th>Nombre y Apellido</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th className="w-48">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((usuario) => (
                <tr
                  key={usuario.id}
                  className={!usuario.isActive ? "opacity-70 bg-gray-50" : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(usuario.id)}
                      onChange={() => toggleUserSelection(usuario.id)}
                    />
                  </td>
                  <td>{usuario.usuario || "-"}</td>
                  <td>
                    {usuario.nombre} {usuario.apellido}
                  </td>
                  <td>{usuario.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        usuario.rol === "admin"
                          ? "badge-primary"
                          : "badge-secondary"
                      }`}
                    >
                      {usuario.rol === "admin" ? "Administrador" : "Vendedor"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        usuario.isActive ? "badge-success" : "badge-error"
                      }`}
                    >
                      {usuario.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-outline btn-primary p-1"
                        onClick={() => setUsuarioEditar(usuario)}
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        className={`btn btn-sm btn-outline ${
                          usuario.isActive ? "btn-warning" : "btn-success"
                        } p-1`}
                        onClick={() =>
                          changeUserStatus(usuario.id, usuario.isActive)
                        }
                        title={usuario.isActive ? "Desactivar" : "Activar"}
                      >
                        {usuario.isActive ? (
                          <Archive className="h-4 w-4" />
                        ) : (
                          <Power className="h-4 w-4" />
                        )}
                      </button>

                      <button
                        className="btn btn-sm btn-outline btn-error p-1"
                        onClick={() => borrarUsuario(usuario.id)}
                        title="Eliminar permanentemente"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {currentItems.map((usuario) => (
            <div
              key={usuario.id}
              className="border border-black rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(usuario.id)}
                    onChange={() => toggleUserSelection(usuario.id)}
                    className="mr-2"
                  />
                  <div>
                    <div className="font-medium">
                      {usuario.nombre} {usuario.apellido}
                    </div>
                    <div className="text-sm text-gray-500">
                      {usuario.usuario || "-"}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setExpandedUser(
                      expandedUser === usuario.id ? null : usuario.id
                    )
                  }
                  className="text-gray-500 flex items-center gap-1"
                >
                  {expandedUser === usuario.id ? (
                    <>
                      <span className="text-xs">Cerrar</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span className="text-xs">Detalles</span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              {expandedUser === usuario.id && (
                <div className="mt-4 space-y-3 overflow-x-hidden">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Email:</span>
                      <span className="break-words">{usuario.email}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Rol:</span>
                      <span
                        className={`badge ${
                          usuario.rol === "admin"
                            ? "badge-primary"
                            : "badge-secondary"
                        } inline-block w-fit mt-1`}
                      >
                        {usuario.rol === "admin" ? "Administrador" : "Vendedor"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Estado:</span>
                      <span
                        className={`badge ${
                          usuario.isActive ? "badge-success" : "badge-error"
                        } inline-block w-fit mt-1`}
                      >
                        {usuario.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-3 mt-2 border-t">
                    <div className="grid grid-cols-3 gap-2 w-full">
                      <button
                        className="btn btn-sm btn-outline btn-primary flex items-center justify-center"
                        onClick={() => setUsuarioEditar(usuario)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        <span className="text-xs">Editar</span>
                      </button>
                      <button
                        className={`btn btn-sm btn-outline ${
                          usuario.isActive ? "btn-warning" : "btn-success"
                        } flex items-center justify-center`}
                        onClick={() =>
                          changeUserStatus(usuario.id, usuario.isActive)
                        }
                      >
                        {usuario.isActive ? (
                          <>
                            <Archive className="h-4 w-4 mr-1" />
                            <span className="text-xs">Desactivar</span>
                          </>
                        ) : (
                          <>
                            <Power className="h-4 w-4 mr-1" />
                            <span className="text-xs">Activar</span>
                          </>
                        )}
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error flex items-center justify-center"
                        onClick={() => borrarUsuario(usuario.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="text-xs">Eliminar</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {usuariosFiltrados.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No se encontraron usuarios que coincidan con los criterios de
            búsqueda
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination mt-6 flex justify-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${
                currentPage === index + 1 ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {showModal && (
        <UsuarioModal
          onClose={() => setShowModal(false)}
          onSave={agregarUsuario}
        />
      )}

      {usuarioEditar && (
        <UsuarioEditarModal
          usuario={usuarioEditar}
          onClose={() => setUsuarioEditar(null)}
          onSave={modificarUsuario}
        />
      )}
    </div>
  );
}
