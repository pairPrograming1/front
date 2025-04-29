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
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  Users,
  ListFilter,
} from "lucide-react";
import Header from "../components/header";
import EventoModal from "../components/evento-modal";
import EventoEditarModal from "../components/evento-editar-modal";
import Swal from "sweetalert2";
import apiUrls from "@/app/components/utils/apiConfig";

const API_URL = apiUrls.local;

export default function Eventos() {
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("active"); // Options: "active", "inactive", "all"
  const [selectedEventos, setSelectedEventos] = useState([]);
  const [eventoEditar, setEventoEditar] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedEvento, setExpandedEvento] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchEventos();
    }
  }, [filterMode, isClient]);

  const removeAccents = (str) => {
    return str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
  };

  const fetchEventos = async () => {
    try {
      setLoading(true);
      console.log("Fetching eventos desde:", `${API_URL}/api/evento/`); // Agregar log para verificar la URL
      const response = await fetch(`${API_URL}/api/evento/`);

      if (!response.ok) {
        console.error(
          "Error en la respuesta de la API:",
          response.status,
          response.statusText
        ); // Log detallado
        throw new Error("Error al cargar los eventos");
      }

      const resultData = await response.json();
      console.log("Datos recibidos de la API:", resultData); // Log para verificar los datos recibidos

      if (resultData.success && Array.isArray(resultData.data)) {
        // Apply filter based on filterMode
        let filteredData;

        if (filterMode === "active") {
          filteredData = resultData.data.filter((evento) => evento.activo);
        } else if (filterMode === "inactive") {
          filteredData = resultData.data.filter((evento) => !evento.activo);
        } else {
          // "all" mode - no filtering
          filteredData = resultData.data;
        }

        const mappedEventos = filteredData.map((evento) => ({
          id: evento.id,
          nombre: evento.nombre,
          descripcion: evento.descripcion || "Sin descripción",
          fecha: evento.fecha,
          duracion: evento.duracion,
          capacidad: evento.capacidad,
          activo: evento.activo,
          salon: evento.salon || "Sin salón asignado",
        }));

        setEventos(mappedEventos);
      } else {
        console.error("Formato de respuesta incorrecto:", resultData); // Log para formato incorrecto
        setEventos([]);
        throw new Error("Formato de respuesta incorrecto");
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching eventos:", err); // Log del error
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
      removeAccents(evento.salon?.toLowerCase()).includes(searchText) ||
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

  const handleEventoAdded = async (eventoData) => {
    try {
      // Validar que eventoData sea un objeto y que el campo "nombre" esté definido y no vacío
      if (!eventoData || typeof eventoData !== "object") {
        throw new Error("Datos del evento no válidos.");
      }

      if (!eventoData.nombre || eventoData.nombre.trim() === "") {
        Swal.fire({
          title: "Error",
          text: "El nombre del evento es obligatorio.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      const response = await fetch(`${API_URL}/api/evento/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventoData),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el evento");
      }

      const result = await response.json();

      Swal.fire({
        title: "¡Éxito!",
        text: result.message || "El evento ha sido agregado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      fetchEventos();
      setShowModal(false);
    } catch (err) {
      console.error("Error al agregar evento:", err); // Log del error
      Swal.fire({
        title: "Error",
        text: err.message || "No se pudo agregar el evento.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleEventoUpdated = async (id, eventoData) => {
    try {
      const response = await fetch(`${API_URL}/api/evento/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventoData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el evento");
      }

      const result = await response.json();

      Swal.fire({
        title: "¡Éxito!",
        text: result.message || "El evento ha sido actualizado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      fetchEventos();
      setShowEditModal(false);
    } catch (err) {
      console.error("Error al actualizar evento:", err);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el evento.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleLogicalDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/evento/${id}`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Error al desactivar el evento");
      }

      const result = await response.json();

      Swal.fire({
        title: "¡Completado!",
        text: result.message || "El evento ha sido desactivado correctamente",
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
  };

  const handlePhysicalDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/evento/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el evento");
      }

      const result = await response.json();

      Swal.fire({
        title: "¡Eliminado!",
        text: result.message || "El evento ha sido eliminado permanentemente",
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
          fetch(`${API_URL}/api/evento/${id}`, {
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
          fetch(`${API_URL}/api/evento/${id}`, {
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
        const response = await fetch(`${API_URL}/api/evento/${id}`, {
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
      <div className="p-4 md:p-6">
        <Header title="Eventos" />
        <div className="flex justify-center items-center h-64">
          <p>Cargando eventos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <Header title="Eventos" />

      {/* Filtros y búsqueda */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="    Buscar eventos..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/4 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              className={`btn ${
                filterMode === "active" ? "btn-warning" : "btn-outline"
              } flex items-center gap-2 flex-1 md:flex-none`}
              onClick={() => setFilterMode("active")}
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Activos</span>
            </button>
            <button
              className={`btn ${
                filterMode === "inactive" ? "btn-warning" : "btn-outline"
              } flex items-center gap-2 flex-1 md:flex-none`}
              onClick={() => setFilterMode("inactive")}
            >
              <EyeOff className="h-4 w-4" />
              <span className="hidden sm:inline">Inactivos</span>
            </button>
            <button
              className={`btn ${
                filterMode === "all" ? "btn-warning" : "btn-outline"
              } flex items-center gap-2 flex-1 md:flex-none`}
              onClick={() => setFilterMode("all")}
            >
              <ListFilter className="h-4 w-4" />
              <span className="hidden sm:inline">Todos</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {selectedEventos.length > 0 && (
            <>
              <button
                className="btn btn-warning flex items-center gap-2 w-full md:w-auto"
                onClick={bulkLogicalDelete}
              >
                <Archive className="h-4 w-4" />
                Desactivar {selectedEventos.length}
              </button>
              <button
                className="btn btn-error flex items-center gap-2 w-full md:w-auto"
                onClick={bulkPhysicalDelete}
              >
                <Trash2 className="h-4 w-4" />
                Eliminar {selectedEventos.length}
              </button>
            </>
          )}

          <button
            className="btn btn-primary flex items-center gap-2 w-full md:w-auto"
            onClick={() => setShowModal(true)}
          >
            <Plus className="h-4 w-4" />
            Agregar evento
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tabla de eventos */}
      <div className="overflow-x-auto">
        {/* Vista de escritorio */}
        <div className="hidden md:block">
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
                <th>Descripción</th> {/* Nuevo encabezado */}
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
                    <td>{evento.descripcion}</td> {/* Nueva columna */}
                    <td>{evento.salon}</td>
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
                  <td colSpan="8" className="text-center py-10">
                    <p className="text-gray-500">
                      No se encontraron eventos que coincidan con los criterios
                      de búsqueda
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Vista móvil mejorada */}
        <div className="md:hidden space-y-4">
          {currentItems.length > 0 ? (
            currentItems.map((evento) => (
              <div
                key={evento.id}
                className={`border rounded-lg overflow-hidden ${
                  !evento.activo ? "opacity-70 bg-gray-50" : ""
                }`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedEventos.includes(evento.id)}
                          onChange={() => toggleEventoSelection(evento.id)}
                          className="mr-1"
                        />
                        <div>
                          <div className="font-medium text-lg">
                            {evento.nombre}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {evento.salon}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="truncate">
                          {formatDateTime(evento.fecha)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`badge ${
                          evento.activo ? "badge-success" : "badge-error"
                        } mb-2`}
                      >
                        {evento.activo ? "Activo" : "Inactivo"}
                      </span>
                      <button
                        onClick={() =>
                          setExpandedEvento(
                            expandedEvento === evento.id ? null : evento.id
                          )
                        }
                        className="text-gray-500 flex items-center gap-1"
                      >
                        {expandedEvento === evento.id ? (
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
                  </div>

                  {expandedEvento === evento.id && (
                    <div className="mt-4 space-y-3 overflow-x-hidden">
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-gray-500 text-sm">
                            Duración:
                          </span>
                          <span className="ml-2">
                            {evento.duracion || "N/A"} minutos
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-gray-500 text-sm">
                            Capacidad:
                          </span>
                          <span className="ml-2">
                            {evento.capacidad || "Sin límite"}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between pt-3 mt-2 border-t">
                        <div className="grid grid-cols-3 gap-2 w-full">
                          <button
                            className="btn btn-sm btn-outline btn-primary flex items-center justify-center"
                            onClick={() => handleEditEvento(evento)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            <span className="text-xs">Editar</span>
                          </button>
                          {evento.activo ? (
                            <button
                              className="btn btn-sm btn-outline btn-warning flex items-center justify-center"
                              onClick={() => handleLogicalDelete(evento.id)}
                            >
                              <Archive className="h-4 w-4 mr-1" />
                              <span className="text-xs">Desactivar</span>
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm btn-outline btn-success flex items-center justify-center"
                              onClick={() =>
                                handleEventoToggleActive(
                                  evento.id,
                                  evento.activo
                                )
                              }
                            >
                              <Power className="h-4 w-4 mr-1" />
                              <span className="text-xs">Activar</span>
                            </button>
                          )}
                          <button
                            className="btn btn-sm btn-outline btn-error flex items-center justify-center"
                            onClick={() => handlePhysicalDelete(evento.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span className="text-xs">Eliminar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 border rounded-lg">
              <p className="text-gray-500">
                No se encontraron eventos que coincidan con los criterios de
                búsqueda
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="pagination mt-6 flex flex-wrap justify-center gap-2">
          {currentPage > 1 && (
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </button>
          )}
          {[...Array(totalPages)].map((_, index) => {
            // Show limited page numbers on mobile
            if (
              index === 0 ||
              index === totalPages - 1 ||
              (index >= currentPage - 2 && index <= currentPage + 0)
            ) {
              return (
                <button
                  key={index}
                  className={`btn btn-sm ${
                    currentPage === index + 1 ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              );
            } else if (
              (index === currentPage - 3 && currentPage > 3) ||
              (index === currentPage + 1 && currentPage < totalPages - 2)
            ) {
              return (
                <span
                  key={index}
                  className="flex items-center justify-center px-2"
                >
                  ...
                </span>
              );
            }
            return null;
          })}
          {currentPage < totalPages && (
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Modales */}
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
