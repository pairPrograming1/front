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
} from "lucide-react";
import UsuarioModal from "../components/usuario-modal";
import UsuarioEditarModal from "../components/usuario-editar-modal";
import Header from "../components/header";
import Swal from "sweetalert2";

export default function Usuarios() {
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRolModal, setShowRolModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterInactive, setFilterInactive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("vendor");

  const itemsPerPage = 10;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const statusQuery = filterInactive ? "false" : "true";
      const response = await fetch(
        `http://localhost:4000/api/users/usuarios?status=${statusQuery}`
      );
      if (!response.ok) throw new Error("Error al cargar usuarios");
      const data = await response.json();
      setUsuarios(data);
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Error al cargar usuarios",
        text: err.message || "Hubo un problema al cargar los usuarios",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isClient) {
      fetchUsuarios();
    }
  }, [filterInactive, isClient]);

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
    setShowRolModal(true);
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
      title: "¿Asignar rol de vendor?",
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
      const promises = selectedUsers.map((userId) =>
        fetch(`http://localhost:4000/api/users/change-role/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rol }),
        })
      );

      const results = await Promise.allSettled(promises);

      const exitosos = results.filter(
        (result) => result.status === "fulfilled"
      ).length;
      const fallidos = results.length - exitosos;

      await fetchUsuarios();
      setShowRolModal(false);
      setSelectedUsers([]);

      Swal.fire({
        icon: exitosos > 0 ? "success" : "error",
        title: exitosos > 0 ? "Roles asignados" : "Error",
        text: `${exitosos} usuario(s) actualizados con éxito. ${
          fallidos > 0
            ? `${fallidos} usuario(s) no pudieron ser actualizados.`
            : ""
        }`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al asignar roles",
        text: error.message || "Ocurrió un error al asignar los roles",
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
      const response = await fetch(
        `http://localhost:4000/api/users/soft-delete/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: newStatus }),
        }
      );

      if (!response.ok) throw new Error(`Error al ${actionText} el usuario`);

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
      });
    }
  };

  const agregarUsuario = async (nuevoUsuario) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/users/create-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoUsuario),
        }
      );

      if (!response.ok) throw new Error("Error al crear el usuario");

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
        text: error.message || "Hubo un error al crear el usuario",
      });
    }
  };

  const modificarUsuario = async (id, datosActualizados) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/users/perfil/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datosActualizados),
        }
      );

      if (!response.ok) throw new Error("Error al modificar el usuario");

      await fetchUsuarios();
      setUsuarioEditar(null);
      Swal.fire({
        icon: "success",
        title: "Usuario modificado",
        text: "Los datos del usuario han sido modificados correctamente",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al modificar usuario",
        text: error.message || "Hubo un error al modificar el usuario",
      });
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
        const response = await fetch(
          `http://localhost:4000/api/users/delete/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) throw new Error("Error al eliminar el usuario");

        await fetchUsuarios();
        Swal.fire(
          "Eliminado",
          "El usuario ha sido eliminado correctamente",
          "success"
        );
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const cambiarRolUsuario = async (id, rol) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/users/change-role/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rol }),
        }
      );

      if (!response.ok) throw new Error("Error al cambiar el rol del usuario");

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
      });
    }
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    `${usuario.usuario} ${usuario.nombre} ${usuario.apellido} ${usuario.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(usuariosFiltrados.length / itemsPerPage);
  const currentItems = usuariosFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!isClient) return null;

  if (loading) {
    return (
      <div className="p-6">
        <Header title="Usuarios" />
        <div className="flex justify-center items-center h-64">
          <p>Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Header title="Usuarios" />
        <div className="alert alert-error">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Header title="Usuarios" />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Buscar Usuario"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            className={`btn ${
              filterInactive ? "btn-warning" : "btn-outline"
            } flex items-center gap-2 w-full sm:w-auto`}
            onClick={() => setFilterInactive((prev) => !prev)}
          >
            {filterInactive ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            {filterInactive ? "Ver Activos" : "Ver Inactivos"}
          </button>

          <button
            className="btn btn-outline flex items-center gap-2 w-full sm:w-auto"
            onClick={handleQuitarRoles}
            disabled={selectedUsers.length === 0}
          >
            <UserMinus className="h-4 w-4" />
            Asignar Vendor
          </button>

          <button
            className="btn btn-outline flex items-center gap-2 w-full sm:w-auto"
            onClick={handleAsignarRoles}
            disabled={selectedUsers.length === 0}
          >
            <UserPlus className="h-4 w-4" />
            Asignar Admin
          </button>

          <button
            className="btn btn-primary flex items-center gap-2 w-full sm:w-auto"
            onClick={() => setShowModal(true)}
          >
            <Plus className="h-4 w-4" />
            Agregar
          </button>
        </div>
      </div>

      <div className="table-container overflow-x-auto">
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
                <td>{usuario.usuario}</td>
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
                    {usuario.rol || "vendor"}
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

      {totalPages > 1 && (
        <div className="pagination mt-4 flex justify-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`pagination-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              className="pagination-item"
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

      {showRolModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              Asignar rol de administrador
            </h3>
            <p className="mb-6">
              ¿Estás seguro de que deseas asignar el rol de administrador a los{" "}
              {selectedUsers.length} usuario(s) seleccionado(s)?
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="btn btn-outline"
                onClick={() => setShowRolModal(false)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                onClick={() => asignarRolMultiple("admin")}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
