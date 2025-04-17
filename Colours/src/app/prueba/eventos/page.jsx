"use client";

import { useState, useEffect } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";
import Header from "../components/header";
import EventoModal from "../components/evento-modal";

export default function Eventos() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [selectedEventos, setSelectedEventos] = useState([]);

  useEffect(() => {
    fetchEventos();
  }, [currentPage, showInactive]);

  const fetchEventos = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/evento/");

      if (!response.ok) {
        throw new Error("Error al cargar los eventos");
      }

      const resultData = await response.json();
      console.log("Eventos data:", resultData);

      // Based on your controller, the events are in data property
      if (resultData.success && Array.isArray(resultData.data)) {
        const filteredData = showInactive
          ? resultData.data
          : resultData.data.filter((evento) => evento.activo);

        // Map the API response to handle potential property name differences
        const mappedEventos = filteredData.map((evento) => ({
          id: evento.Id || evento.id, // Handle both Id and id
          nombre: evento.nombre,
          fecha: evento.fecha,
          duracion: evento.duracion || evento.duraccion, // Handle both spellings
          capacidad: evento.capacidad,
          activo: evento.activo,
          salonId: evento.salonId,
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
      setEventos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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

  const toggleEventoSelection = (id) => {
    if (selectedEventos.includes(id)) {
      setSelectedEventos(selectedEventos.filter((eventoId) => eventoId !== id));
    } else {
      setSelectedEventos([...selectedEventos, id]);
    }
  };

  const toggleAllSelection = () => {
    if (selectedEventos.length === filteredEventos.length) {
      setSelectedEventos([]);
    } else {
      setSelectedEventos(filteredEventos.map((evento) => evento.id));
    }
  };

  const handleEventoAdded = () => {
    setShowModal(false);
    fetchEventos();
  };

  const handleEventoToggleActive = async (id, currentActiveState) => {
    const action = currentActiveState ? "desactivar" : "activar";
    if (confirm(`¿Está seguro de que desea ${action} este evento?`)) {
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

        // Refresh the list
        fetchEventos();
      } catch (err) {
        console.error(`Error al ${action} evento:`, err);
        setError(`No se pudo ${action} el evento.`);
      }
    }
  };

  const bulkDeactivateEventos = async () => {
    if (
      confirm("¿Está seguro de que desea desactivar los eventos seleccionados?")
    ) {
      try {
        const updatePromises = selectedEventos.map((id) =>
          fetch(`http://localhost:4000/api/evento/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ activo: false }),
          })
        );

        await Promise.all(updatePromises);
        fetchEventos();
        setSelectedEventos([]);
      } catch (err) {
        console.error("Error al desactivar eventos:", err);
        setError("No se pudieron desactivar los eventos seleccionados.");
      }
    }
  };

  const filteredEventos = eventos.filter((evento) =>
    evento.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <Header title="Eventos" />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Buscar Eventos"
            className="search-input pl-10 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            className={`btn ${
              showInactive ? "btn-primary" : "btn-outline"
            } w-full sm:w-auto`}
            onClick={() => setShowInactive(!showInactive)}
          >
            Ver Eventos {showInactive ? "Activos" : "Inactivos"}
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

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="table-container overflow-x-auto">
            <table className="table min-w-full">
              <thead>
                <tr>
                  <th className="w-10">
                    <input
                      type="checkbox"
                      checked={
                        selectedEventos.length === filteredEventos.length &&
                        filteredEventos.length > 0
                      }
                      onChange={toggleAllSelection}
                    />
                  </th>
                  <th>Nombre del Evento</th>
                  <th>Fecha y Hora</th>
                  <th>Duración</th>
                  <th>Capacidad</th>
                  <th>Estado</th>
                  <th className="w-32">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredEventos.length > 0 ? (
                  filteredEventos.map((evento) => (
                    <tr key={evento.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedEventos.includes(evento.id)}
                          onChange={() => toggleEventoSelection(evento.id)}
                        />
                      </td>
                      <td>{evento.nombre}</td>
                      <td>{formatDateTime(evento.fecha)}</td>
                      <td>{evento.duracion || "N/A"} minutos</td>
                      <td>{evento.capacidad || "Sin límite"}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            evento.activo
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {evento.activo ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-outline py-1 px-2"
                            onClick={() => {
                              // Implementar edición
                              console.log("Editar evento:", evento.id);
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-outline py-1 px-2"
                            onClick={() =>
                              handleEventoToggleActive(evento.id, evento.activo)
                            }
                          >
                            {evento.activo ? "Desactivar" : "Activar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No se encontraron eventos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination mt-4 flex justify-center gap-2">
            <button
              className={`pagination-item ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(Math.min(5, Math.ceil(eventos.length / 10)))].map(
              (_, index) => (
                <button
                  key={index}
                  className={`pagination-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              className="pagination-item"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= Math.ceil(eventos.length / 10)}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}

      {showModal && (
        <EventoModal
          onClose={() => setShowModal(false)}
          onEventoAdded={handleEventoAdded}
        />
      )}
    </div>
  );
}
