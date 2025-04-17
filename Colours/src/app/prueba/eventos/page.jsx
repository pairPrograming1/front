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
} from "lucide-react";
import Header from "../components/header";
import EventoModal from "../components/evento-modal";
import EventoEditarModal from "../components/evento-editar-modal";
import Swal from "sweetalert2";

export default function Eventos() {
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [selectedEventos, setSelectedEventos] = useState([]);
  const [eventoEditar, setEventoEditar] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchEventos();
    }
  }, [showInactive, isClient]);

  const removeAccents = (str) => {
    return str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
  };

  const fetchEventos = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/evento/");

      if (!response.ok) {
        throw new Error("Error al cargar los eventos");
      }

      const resultData = await response.json();

      if (resultData.success && Array.isArray(resultData.data)) {
        const filteredData = showInactive
          ? resultData.data
          : resultData.data.filter((evento) => evento.activo);

        const mappedEventos = filteredData.map((evento) => ({
          id: evento.Id || evento.id,
          Id: evento.Id || evento.id,
          nombre: evento.nombre,
          fecha: evento.fecha,
          duracion: evento.duracion || evento.duraccion,
          capacidad: evento.capacidad,
          activo: evento.activo,
          salonId: evento.salonId,
          salonNombre: evento.salon?.nombre || "Sin salón asignado",
        }));

        setEventos(mappedEventos);
      } else {
        setEventos([]);
        throw new Error("Formato de respuesta incorrecto");
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching eventos:", err);
      setError(
        "No se pudieron cargar los eventos. Por favor intente nuevamente."
      );
      Swal.fire({
        icon: "error",
        title: "Error al cargar eventos",
        text: err.message || "Hubo un problema al cargar los eventos",
      });
      setEventos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString || "Fecha no disponible";
    }
  };

  const eventosFiltrados = eventos.filter((evento) => {
    const searchText = removeAccents(searchTerm.toLowerCase());
    return (
      removeAccents(evento.nombre?.toLowerCase()).includes(searchText) ||
      removeAccents(evento.salonNombre?.toLowerCase()).includes(searchText) ||
      formatDateTime(evento.fecha)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (evento.duracion?.toString() || "").includes(searchTerm) ||
      (evento.capacidad?.toString() || "").includes(searchTerm)
    );
  });

  const toggleEventoSelection = (id) => {
    setSelectedEventos((prev) =>
      prev.includes(id)
        ? prev.filter((eventoId) => eventoId !== id)
        : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    if (selectedEventos.length === currentItems.length) {
      setSelectedEventos([]);
    } else {
      setSelectedEventos(currentItems.map((evento) => evento.id));
    }
  };

  const handleEventoAdded = () => {
    setShowModal(false);
    fetchEventos();
    Swal.fire({
      title: "¡Éxito!",
      text: "El evento ha sido agregado correctamente",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  };

  const handleEventoUpdated = () => {
    setShowEditModal(false);
    fetchEventos();
    Swal.fire({
      title: "¡Éxito!",
      text: "El evento ha sido actualizado correctamente",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  };

  const handleLogicalDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Desactivar evento?",
      text: "El evento será desactivado pero permanecerá en la base de datos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:4000/api/evento/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al desactivar el evento");
        }

        const data = await response.json();

        Swal.fire({
          title: "¡Completado!",
          text: data.message || "El evento ha sido desactivado correctamente",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000,
          showConfirmButton: false,
        });

        fetchEventos();
      } catch (err) {
        console.error("Error al desactivar evento:", err);
        Swal.fire({
          title: "Error",
          text: "No se pudo desactivar el evento.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handlePhysicalDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar permanentemente?",
      text: "Esta acción no se puede deshacer y el evento será eliminado permanentemente",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar permanentemente",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const secondConfirm = await Swal.fire({
          title: "¿Está completamente seguro?",
          html: `
            <div class="text-left">
              <p>No podrá recuperar este evento después de eliminarlo</p>
              <p class="text-red-500 font-bold mt-2">Esta acción es IRREVERSIBLE.</p>
            </div>
          `,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Sí, eliminar definitivamente",
          cancelButtonText: "Cancelar",
        });

        if (!secondConfirm.isConfirmed) return;

        const response = await fetch(`http://localhost:4000/api/evento/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Error al eliminar el evento");
        }

        const data = await response.json();

        Swal.fire({
          title: "¡Eliminado!",
          text: data.message || "El evento ha sido eliminado permanentemente",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000,
          showConfirmButton: false,
        });

        fetchEventos();
      } catch (err) {
        console.error("Error al eliminar evento:", err);
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el evento.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const bulkLogicalDelete = async () => {
    if (selectedEventos.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Ningún evento seleccionado",
        text: "Por favor selecciona al menos un evento para desactivar",
      });
      return;
    }

    const result = await Swal.fire({
      title: "¿Desactivar eventos seleccionados?",
      text: `¿Desea desactivar los ${selectedEventos.length} eventos seleccionados?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, desactivar (${selectedEventos.length})`,
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "Procesando...",
          text: "Desactivando eventos seleccionados",
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const updatePromises = selectedEventos.map((id) =>
          fetch(`http://localhost:4000/api/evento/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          })
        );

        await Promise.all(updatePromises);

        Swal.fire({
          title: "¡Completado!",
          text: "Los eventos seleccionados han sido desactivados",
          icon: "success",
          confirmButtonText: "OK",
        });

        fetchEventos();
        setSelectedEventos([]);
      } catch (err) {
        console.error("Error al desactivar eventos:", err);
        Swal.fire({
          title: "Error",
          text: "No se pudieron desactivar los eventos seleccionados.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const bulkPhysicalDelete = async () => {
    if (selectedEventos.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Ningún evento seleccionado",
        text: "Por favor selecciona al menos un evento para eliminar",
      });
      return;
    }

    const result = await Swal.fire({
      title: "¿Eliminar permanentemente?",
      text: `¿Desea eliminar permanentemente los ${selectedEventos.length} eventos seleccionados? Esta acción no se puede deshacer.`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Sí, eliminar (${selectedEventos.length})`,
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const secondConfirm = await Swal.fire({
        title: "¿Está completamente seguro?",
        html: `
          <div class="text-left">
            <p>No podrá recuperar estos ${selectedEventos.length} eventos después de eliminarlos.</p>
            <p class="text-red-500 font-bold mt-2">Esta acción es IRREVERSIBLE.</p>
          </div>
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar definitivamente",
        cancelButtonText: "Cancelar",
      });

      if (!secondConfirm.isConfirmed) return;

      try {
        Swal.fire({
          title: "Procesando...",
          text: "Eliminando eventos seleccionados",
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const deletePromises = selectedEventos.map((id) =>
          fetch(`http://localhost:4000/api/evento/${id}`, {
            method: "DELETE",
          })
        );

        await Promise.all(deletePromises);

        Swal.fire({
          title: "¡Eliminados!",
          text: "Los eventos seleccionados han sido eliminados permanentemente",
          icon: "success",
          confirmButtonText: "OK",
        });

        fetchEventos();
        setSelectedEventos([]);
      } catch (err) {
        console.error("Error al eliminar eventos:", err);
        Swal.fire({
          title: "Error",
          text: "No se pudieron eliminar los eventos seleccionados.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleEventoToggleActive = async (id, currentActiveState) => {
    const action = currentActiveState ? "desactivar" : "activar";

    const result = await Swal.fire({
      title: `¿${currentActiveState ? "Desactivar" : "Activar"} evento?`,
      text: `¿Desea ${action} este evento?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, ${action}`,
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:4000/api/evento/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ activo: !currentActiveState }),
        });

        if (!response.ok) {
          throw new Error(`Error al ${action} el evento`);
        }

        Swal.fire({
          title: "¡Completado!",
          text: `El evento ha sido ${action}do correctamente`,
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000,
          showConfirmButton: false,
        });

        fetchEventos();
      } catch (err) {
        console.error(`Error al ${action} evento:`, err);
        Swal.fire({
          title: "Error",
          text: `No se pudo ${action} el evento.`,
          icon: "error",
          confirmButtonText: "OK",
        });
        setError(`No se pudo ${action} el evento.`);
      }
    }
  };

  const handleEditEvento = (evento) => {
    setEventoEditar(evento);
    setShowEditModal(true);
  };

  const totalPages = Math.ceil(eventosFiltrados.length / itemsPerPage);
  const currentItems = eventosFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!isClient) return null;

  if (loading) {
    return (
      <div className="p-6">
        <Header title="Eventos" />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Header title="Eventos" />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Buscar por nombre, salón, fecha, duración o capacidad..."
            className="search-input pl-10 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {selectedEventos.length > 0 && (
            <>
              <button
                className="btn btn-warning w-full sm:w-auto flex items-center gap-2"
                onClick={bulkLogicalDelete}
              >
                <Archive className="h-4 w-4" />
                Desactivar {selectedEventos.length}
              </button>
              <button
                className="btn btn-error w-full sm:w-auto flex items-center gap-2"
                onClick={bulkPhysicalDelete}
              >
                <Trash2 className="h-4 w-4" />
                Eliminar {selectedEventos.length}
              </button>
            </>
          )}

          <button
            className={`btn ${
              showInactive ? "btn-warning" : "btn-outline"
            } flex items-center gap-2 w-full sm:w-auto`}
            onClick={() => setShowInactive(!showInactive)}
          >
            {showInactive ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            {showInactive ? "Ver Activos" : "Ver Inactivos"}
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

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="table-container overflow-x-auto">
        <table className="table min-w-full">
          <thead>
            <tr>
              <th className="w-10">
                <input
                  type="checkbox"
                  checked={
                    selectedEventos.length === currentItems.length &&
                    currentItems.length > 0
                  }
                  onChange={toggleAllSelection}
                />
              </th>
              <th>Nombre del Evento</th>
              <th>Salón</th>
              <th>Fecha y Hora</th>
              <th>Duración</th>
              <th>Capacidad</th>
              <th>Estado</th>
              <th className="w-40">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((evento) => (
                <tr
                  key={evento.id}
                  className={!evento.activo ? "opacity-70 bg-gray-50" : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedEventos.includes(evento.id)}
                      onChange={() => toggleEventoSelection(evento.id)}
                    />
                  </td>
                  <td>{evento.nombre}</td>
                  <td>{evento.salonNombre}</td>
                  <td>{formatDateTime(evento.fecha)}</td>
                  <td>{evento.duracion || "N/A"} minutos</td>
                  <td>{evento.capacidad || "Sin límite"}</td>
                  <td>
                    <span
                      className={`badge ${
                        evento.activo ? "badge-success" : "badge-error"
                      }`}
                    >
                      {evento.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-outline btn-primary p-1"
                        onClick={() => handleEditEvento(evento)}
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {evento.activo ? (
                        <button
                          className="btn btn-sm btn-outline btn-warning p-1"
                          onClick={() => handleLogicalDelete(evento.id)}
                          title="Desactivar"
                        >
                          <Archive className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline btn-success p-1"
                          onClick={() =>
                            handleEventoToggleActive(evento.id, evento.activo)
                          }
                          title="Activar"
                        >
                          <Power className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-outline btn-error p-1"
                        onClick={() => handlePhysicalDelete(evento.id)}
                        title="Eliminar permanentemente"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No se encontraron eventos
                </td>
              </tr>
            )}
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
        <EventoModal
          onClose={() => setShowModal(false)}
          onEventoAdded={handleEventoAdded}
        />
      )}

      {showEditModal && eventoEditar && (
        <EventoEditarModal
          evento={eventoEditar}
          onClose={() => {
            setShowEditModal(false);
            setEventoEditar(null);
          }}
          onEventoUpdated={handleEventoUpdated}
        />
      )}
    </div>
  );
}
