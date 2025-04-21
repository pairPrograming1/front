"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import apiUrls from "@/app/components/utils/apiConfig";

const API_URL = apiUrls.production

export default function EventoEditarModal({
  evento,
  onClose,
  onEventoUpdated,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    fecha: "",
    duracion: 60,
    capacidad: 1,
    activo: true,
    salonId: "",
  });

  const [salones, setSalones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingSalones, setFetchingSalones] = useState(true);
  const [error, setError] = useState(null);

  // Initialize form with existing event data
  useEffect(() => {
    if (evento) {
      // Format the date for the datetime-local input
      const eventDate = new Date(evento.fecha);
      const formattedDate = eventDate.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:MM

      setFormData({
        nombre: evento.nombre || "",
        fecha: formattedDate,
        duracion: evento.duracion || 60,
        capacidad: evento.capacidad || 1,
        activo: evento.activo !== undefined ? evento.activo : true,
        salonId: evento.salonId || "",
      });
    }
  }, [evento]);

  // Fetch salones for dropdown
  useEffect(() => {
    const fetchSalones = async () => {
      try {
        setFetchingSalones(true);
        const response = await fetch(`${API_URL}/api/salon/`);
        if (!response.ok) {
          throw new Error("Error al cargar los salones");
        }

        const data = await response.json();
        console.log("Salones data:", data);

        // Handle different response formats
        let salonesData = [];
        if (data.success && Array.isArray(data.data)) {
          salonesData = data.data;
        } else if (Array.isArray(data)) {
          salonesData = data;
        }

        // Validate that each salon has a valid UUID using the correct property name 'Id'
        const validSalones = salonesData.filter((salon) => {
          const uuidPattern =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          return salon.Id && uuidPattern.test(salon.Id.toString());
        });

        console.log("Valid salones with UUIDs:", validSalones);
        setSalones(validSalones);

        if (validSalones.length === 0) {
          setError(
            "No hay salones disponibles o los salones no tienen IDs válidos"
          );
        }
      } catch (err) {
        console.error("Error fetching salones:", err);
        setError("No se pudieron cargar los salones: " + err.message);
      } finally {
        setFetchingSalones(false);
      }
    };

    fetchSalones();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0,
      });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate salonId is a valid UUID
      const uuidPattern =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!formData.salonId || !uuidPattern.test(formData.salonId)) {
        throw new Error(
          `Por favor seleccione un salón válido (ID actual: ${formData.salonId})`
        );
      }

      // Format date for API
      const formattedData = {
        ...formData,
        fecha: new Date(formData.fecha).toISOString(),
      };

      console.log("Sending updated data to API:", formattedData);

      const response = await fetch(
        `${API_URL}/api/evento/${evento.Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();

      if (result.success) {
        if (onEventoUpdated) onEventoUpdated();
        onClose();
      } else {
        throw new Error(
          result.message || "Error desconocido al actualizar el evento"
        );
      }
    } catch (err) {
      console.error("Error updating evento:", err);
      setError(
        err.message ||
          "No se pudo actualizar el evento. Por favor intente nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  // Get min date (today) for date picker
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal bg-[#181f2a] rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Editar Evento</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Nombre del Evento
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del Evento"
              className="input w-full bg-[#232b38] border border-[#2a3545] rounded p-2"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Salón</label>
            {fetchingSalones ? (
              <div className="p-2 text-center">Cargando salones...</div>
            ) : (
              <>
                {salones.length > 0 ? (
                  <select
                    name="salonId"
                    className="input w-full bg-[#232b38] border border-[#2a3545] rounded p-2"
                    value={formData.salonId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar Salón</option>
                    {salones.map((salon) => (
                      <option key={salon.Id} value={salon.Id}>
                        {salon.salon || salon.nombre}{" "}
                        {salon.capacidad
                          ? `(Capacidad: ${salon.capacidad})`
                          : ""}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                    No hay salones disponibles. Por favor, agregue un salón
                    primero.
                  </div>
                )}
              </>
            )}
            {formData.salonId && (
              <div className="text-xs mt-1 text-gray-400">
                ID del salón seleccionado: {formData.salonId}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Fecha y Hora
              </label>
              <input
                type="datetime-local"
                name="fecha"
                className="input w-full bg-[#232b38] border border-[#2a3545] rounded p-2"
                value={formData.fecha}
                onChange={handleChange}
                min={getTodayString()}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Duración (min)
              </label>
              <input
                type="number"
                name="duracion"
                placeholder="Duración en minutos"
                className="input w-full bg-[#232b38] border border-[#2a3545] rounded p-2"
                value={formData.duracion}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Capacidad
              </label>
              <input
                type="number"
                name="capacidad"
                placeholder="Capacidad"
                className="input w-full bg-[#232b38] border border-[#2a3545] rounded p-2"
                value={formData.capacidad}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                name="activo"
                id="activo"
                className="mr-2"
                checked={formData.activo}
                onChange={handleChange}
              />
              <label htmlFor="activo" className="text-sm font-medium">
                Evento Activo
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4 p-2 rounded"
            disabled={loading || fetchingSalones || salones.length === 0}
          >
            {loading ? "Actualizando..." : "Actualizar Evento"}
          </button>
        </form>
      </div>
    </div>
  );
}
