"use client";
import { useState, useEffect } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";
import UsuarioModal from "../components/usuario-modal";
import UsuarioEditarModal from "../components/usuario-editar-modal";
import Header from "../components/header";
import Swal from "sweetalert2"; // Importar SweetAlert2

export default function Usuarios() {
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterInactive, setFilterInactive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isClient) {
      fetchUsuarios();
    }
  }, [filterInactive, isClient]);

  const changeUserStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/users/soft-delete/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: !currentStatus }),
        }
      );

      if (response.ok) {
        await fetchUsuarios();
      } else {
        console.error(
          "Error al cambiar el estado del usuario:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
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
      if (response.ok) {
        await fetchUsuarios(); // 🔄 recarga la lista desde el backend
      } else {
        console.error("Error al agregar usuario:", await response.text());
      }
    } catch (error) {
      console.error("Error al agregar usuario:", error);
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
      if (response.ok) {
        setUsuarios(
          usuarios.map((usuario) =>
            usuario.id === id ? { ...usuario, ...datosActualizados } : usuario
          )
        );
      } else {
        console.error("Error al modificar usuario:", await response.text());
      }
    } catch (error) {
      console.error("Error al modificar usuario:", error);
    }
  };

  const borrarUsuario = async (id) => {
    // Muestra el SweetAlert2 de confirmación
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción eliminará al usuario permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    // Si el usuario confirma, procede con el borrado
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/users/delete/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
          Swal.fire(
            "Eliminado!",
            "El usuario ha sido eliminado correctamente.",
            "success"
          );
        } else {
          console.error("Error al borrar usuario:", await response.text());
          Swal.fire(
            "Error!",
            "Hubo un problema al eliminar el usuario.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error al borrar usuario:", error);
        Swal.fire(
          "Error!",
          "Hubo un problema al eliminar el usuario.",
          "error"
        );
      }
    }
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    `${usuario.usuario} ${usuario.nombre} ${usuario.apellido} ${usuario.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (!isClient) return null;

  return (
    <div className="p-6">
      <Header title="Usuarios" />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Buscar Usuario"
            className="search-input pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            className="btn btn-outline w-full sm:w-auto"
            onClick={() => setFilterInactive((prev) => !prev)}
          >
            {filterInactive ? "Ver Usuarios Activos" : "Ver Usuarios Inactivos"}
          </button>

          <button className="btn btn-outline w-full sm:w-auto">
            Quitar Roles
          </button>
          <button className="btn btn-outline w-full sm:w-auto">
            Asignar Roles
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

      {!loading && (
        <div className="table-container overflow-x-auto">
          <table className="table min-w-full">
            <thead>
              <tr>
                <th className="w-10">
                  <input type="checkbox" />
                </th>
                <th>Usuario</th>
                <th>Nombre y Apellido</th>
                <th>Email</th>
                <th>Tipo de Usuario</th>
                <th className="w-32">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario, index) => {
                const key = usuario.id ?? `usuario-${index}`;
                return (
                  <tr key={key}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{usuario.usuario}</td>
                    <td>
                      {usuario.nombre} {usuario.apellido}
                    </td>
                    <td>{usuario.email}</td>
                    <td>{usuario.tipo}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-outline py-1 px-2"
                          onClick={() => setUsuarioEditar(usuario)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-outline py-1 px-2"
                          onClick={() => borrarUsuario(usuario.id)}
                        >
                          Borrar
                        </button>
                        <select
                          value={usuario.isActive ? "true" : "false"}
                          onChange={() =>
                            changeUserStatus(usuario.id, usuario.isActive)
                          }
                          className="ml-2 p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                        >
                          <option value="true">Activo</option>
                          <option value="false">Inactivo</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="pagination mt-4 flex justify-center gap-2">
        <button className="pagination-item active">1</button>
        <button className="pagination-item">2</button>
        <button className="pagination-item">3</button>
        <button className="pagination-item">4</button>
        <button className="pagination-item">5</button>
        <button className="pagination-item">30</button>
        <button className="pagination-item">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

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
