"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
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
import { AuthContext } from "../../context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

const API_URL = apiUrls;

export default function Usuarios() {
  const { authData, setAuthData } = useContext(AuthContext);
  const { logout } = useAuth0();
  const router = useRouter();
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
  const [expandedUser, setExpandedUser] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isCurrentUser = (userId) => {
    return authData?.user?.id === userId;
  };

  const handleLogout = async () => {
    try {
      setAuthData(null);
      localStorage.removeItem("authData");
      await logout({ returnTo: window.location.origin });
      router.push("/login");
    } catch (error) {
      console.error("Error durante el logout:", error);
      window.location.href = "/login";
    }
  };

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

  const handleAsignarAdministrador = () => {
    if (selectedUsers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Ningún usuario seleccionado",
        text: "Por favor selecciona al menos un usuario para asignar roles",
      });
      return;
    }

    const currentUserInSelection = selectedUsers.some(isCurrentUser);

    Swal.fire({
      title: `Asignar rol de administrador`,
      html: `
        <div class="text-left">
          <p>¿Estás seguro de asignar el rol de <strong>administrador</strong> a <strong>${
            selectedUsers.length
          }</strong> usuario(s) seleccionado(s)?</p>
          ${
            currentUserInSelection
              ? '<div class="mt-2 text-red-500">Nota: Serás desconectado automáticamente si cambias tu propio rol</div>'
              : ""
          }
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

  const handleAsignarVendedor = () => {
    if (selectedUsers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Ningún usuario seleccionado",
        text: "Por favor selecciona al menos un usuario para asignar roles",
      });
      return;
    }

    const currentUserInSelection = selectedUsers.some(isCurrentUser);

    Swal.fire({
      title: "Asignar rol de vendedor",
      html: `
        <div class="text-left">
          <p>¿Estás seguro de asignar el rol de <strong>vendedor</strong> a <strong>${
            selectedUsers.length
          }</strong> usuario(s) seleccionado(s)?</p>
          ${
            currentUserInSelection
              ? '<div class="mt-2 text-red-500">Nota: Serás desconectado automáticamente si cambias tu propio rol</div>'
              : ""
          }
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, asignar vendedor (${selectedUsers.length})`,
      cancelButtonText: "Cancelar",
      reverseButtons: true,
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

      if (selectedUsers.some(isCurrentUser)) {
        Swal.fire({
          title: "Tu rol ha cambiado",
          text: "Serás redirigido al login para aplicar los cambios",
          icon: "info",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          handleLogout();
        });
      }
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

      // Solo cerrar sesión si es el usuario actual Y se modificó el rol
      if (isCurrentUser(id) && datosActualizados.rol) {
        Swal.fire({
          title: "Tu rol ha cambiado",
          text: "Serás redirigido al login para aplicar los cambios",
          icon: "info",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          handleLogout();
        });
      }
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

      if (isCurrentUser(id)) {
        Swal.fire({
          title: "Tu rol ha cambiado",
          text: "Serás redirigido al login para aplicar los cambios",
          icon: "info",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          handleLogout();
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Rol actualizado",
          text: `El rol ha sido actualizado a ${rol}`,
        });
      }
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
      <div className="p-2 md:p-4">
        <Header title="Usuarios" />
        <div className="flex justify-center items-center h-64">
          <p>Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-2 md:p-4">
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
    <div className="p-2 md:p-4">
      <Header title="Usuarios" />

      <div className="mb-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 w-full">
          {/* Campo de búsqueda */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="    Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input pl-8 w-full py-1 text-sm"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search className="text-gray-400 h-3 w-3" />
            </div>
          </div>

          {/* Botones de filtro y acción */}
          <div className="flex flex-wrap gap-2">
            <div className="flex gap-1">
              <button
                className={`btn btn-xs ${
                  filterMode === "active" ? "btn-warning" : "btn-outline"
                } flex items-center gap-1`}
                onClick={() => setFilterMode("active")}
              >
                <Eye className="h-3 w-3" />
                <span className="hidden sm:inline">Activos</span>
              </button>
              <button
                className={`btn btn-xs ${
                  filterMode === "inactive" ? "btn-warning" : "btn-outline"
                } flex items-center gap-1`}
                onClick={() => setFilterMode("inactive")}
              >
                <EyeOff className="h-3 w-3" />
                <span className="hidden sm:inline">Inactivos</span>
              </button>
              <button
                className={`btn btn-xs ${
                  filterMode === "all" ? "btn-warning" : "btn-outline"
                } flex items-center gap-1`}
                onClick={() => setFilterMode("all")}
              >
                <ListFilter className="h-3 w-3" />
                <span className="hidden sm:inline">Todos</span>
              </button>
            </div>

            <div className="flex gap-1">
              <button
                className="btn btn-xs btn-secondary flex items-center gap-1"
                onClick={handleAsignarVendedor}
                disabled={selectedUsers.length === 0}
              >
                <UserMinus className="h-3 w-3" />
                <span className="hidden sm:inline">Asignar Vendedor</span>
              </button>

              <button
                className="btn btn-xs btn-primary flex items-center gap-1"
                onClick={handleAsignarAdministrador}
                disabled={selectedUsers.length === 0}
              >
                <UserPlus className="h-3 w-3" />
                <span className="hidden sm:inline">Asignar Admin</span>
              </button>

              <button
                className="btn btn-xs btn-primary flex items-center gap-1"
                onClick={() => setShowModal(true)}
              >
                <Plus className="h-3 w-3" />
                <span className="hidden sm:inline">Agregar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="hidden md:block">
          <table className="table table-sm min-w-full compact-table">
            <thead>
              <tr>
                <th className="w-8 px-1">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === currentItems.length &&
                      currentItems.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="checkbox checkbox-xs"
                  />
                </th>
                <th className="px-1 text-xs">Usuario</th>
                <th className="px-1 text-xs">Nombre</th>
                <th className="px-1 text-xs">Email</th>
                <th className="px-1 text-xs">Rol</th>
                <th className="px-1 text-xs">Estado</th>
                <th className="px-1 text-xs w-32">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((usuario) => (
                <tr
                  key={usuario.id}
                  className={!usuario.isActive ? "opacity-70 bg-gray-50" : ""}
                >
                  <td className="px-1">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(usuario.id)}
                      onChange={() => toggleUserSelection(usuario.id)}
                      className="checkbox checkbox-xs"
                    />
                  </td>
                  <td className="px-1 text-xs">{usuario.usuario || "-"}</td>
                  <td className="px-1 text-xs">
                    {usuario.nombre} {usuario.apellido}
                  </td>
                  <td className="px-1 text-xs">{usuario.email}</td>
                  <td className="px-1">
                    <span
                      className={`badge badge-xs ${
                        usuario.rol === "admin"
                          ? "badge-primary"
                          : usuario.rol === "vendor"
                          ? "badge-secondary"
                          : "badge-neutral"
                      }`}
                    >
                      {usuario.rol === "admin"
                        ? "Admin"
                        : usuario.rol === "vendor"
                        ? "Vendedor"
                        : "Común"}
                    </span>
                  </td>
                  <td className="px-1">
                    <span
                      className={`badge badge-xs ${
                        usuario.isActive ? "badge-success" : "badge-error"
                      }`}
                    >
                      {usuario.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-1">
                    <div className="flex gap-1">
                      <button
                        className="btn btn-xs btn-outline btn-primary p-0.5"
                        onClick={() => setUsuarioEditar(usuario)}
                        title="Editar"
                      >
                        <Edit className="h-3 w-3" />
                      </button>

                      <button
                        className={`btn btn-xs btn-outline ${
                          usuario.isActive ? "btn-warning" : "btn-success"
                        } p-0.5`}
                        onClick={() =>
                          changeUserStatus(usuario.id, usuario.isActive)
                        }
                        title={usuario.isActive ? "Desactivar" : "Activar"}
                      >
                        {usuario.isActive ? (
                          <Archive className="h-3 w-3" />
                        ) : (
                          <Power className="h-3 w-3" />
                        )}
                      </button>

                      <button
                        className="btn btn-xs btn-outline btn-error p-0.5"
                        onClick={() => borrarUsuario(usuario.id)}
                        title="Eliminar permanentemente"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-2">
          {currentItems.map((usuario) => (
            <div
              key={usuario.id}
              className="border border-gray-300 rounded p-2 text-sm"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(usuario.id)}
                    onChange={() => toggleUserSelection(usuario.id)}
                    className="checkbox checkbox-xs mr-1"
                  />
                  <div>
                    <div className="font-medium text-xs">
                      {usuario.nombre} {usuario.apellido}
                    </div>
                    <div className="text-xs text-gray-500">
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
                  className="text-gray-500 flex items-center gap-1 text-xs"
                >
                  {expandedUser === usuario.id ? (
                    <>
                      <span>Cerrar</span>
                      <ChevronUp className="h-3 w-3" />
                    </>
                  ) : (
                    <>
                      <span>Detalles</span>
                      <ChevronDown className="h-3 w-3" />
                    </>
                  )}
                </button>
              </div>

              {expandedUser === usuario.id && (
                <div className="mt-2 space-y-2 overflow-x-hidden pt-2 border-t">
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs">Email:</span>
                      <span className="break-words text-xs">
                        {usuario.email}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs">Rol:</span>
                      <span
                        className={`badge badge-xs ${
                          usuario.rol === "admin"
                            ? "badge-primary"
                            : usuario.rol === "vendor"
                            ? "badge-secondary"
                            : "badge-neutral"
                        } inline-block w-fit mt-0.5`}
                      >
                        {usuario.rol === "admin"
                          ? "Administrador"
                          : usuario.rol === "vendor"
                          ? "Vendedor"
                          : "Común"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs">Estado:</span>
                      <span
                        className={`badge badge-xs ${
                          usuario.isActive ? "badge-success" : "badge-error"
                        } inline-block w-fit mt-0.5`}
                      >
                        {usuario.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2 mt-1 border-t">
                    <div className="grid grid-cols-3 gap-1 w-full">
                      <button
                        className="btn btn-xs btn-outline btn-primary flex items-center justify-center p-0.5"
                        onClick={() => setUsuarioEditar(usuario)}
                      >
                        <Edit className="h-3 w-3" />
                      </button>
                      <button
                        className={`btn btn-xs btn-outline ${
                          usuario.isActive ? "btn-warning" : "btn-success"
                        } flex items-center justify-center p-0.5`}
                        onClick={() =>
                          changeUserStatus(usuario.id, usuario.isActive)
                        }
                      >
                        {usuario.isActive ? (
                          <Archive className="h-3 w-3" />
                        ) : (
                          <Power className="h-3 w-3" />
                        )}
                      </button>
                      <button
                        className="btn btn-xs btn-outline btn-error flex items-center justify-center p-0.5"
                        onClick={() => borrarUsuario(usuario.id)}
                      >
                        <Trash2 className="h-3 w-3" />
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
        <div className="text-center py-6">
          <p className="text-gray-500 text-sm">No se encontraron usuarios</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination mt-4 flex justify-center gap-1">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn btn-xs ${
                currentPage === index + 1 ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              className="btn btn-xs btn-outline"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <ChevronRight className="h-3 w-3" />
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

      <style jsx>{`
        .compact-table th,
        .compact-table td {
          padding: 0.25rem;
        }
        .search-input {
          height: 2rem;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
