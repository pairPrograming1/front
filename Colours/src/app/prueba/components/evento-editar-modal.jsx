"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import apiUrls from "@/app/components/utils/apiConfig";

const API_URL = apiUrls.production;

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

  useEffect(() => {
    if (evento) {
      const eventDate = new Date(evento.fecha);
      const formattedDate = eventDate.toISOString().slice(0, 16);

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

  useEffect(() => {
    const fetchSalones = async () => {
      try {
        setFetchingSalones(true);
        const response = await fetch(`${API_URL}/api/salon/`);
        if (!response.ok) {
          throw new Error("Error al cargar los salones");
        }

        const data = await response.json();
        let salonesData = [];
        if (data.success && Array.isArray(data.data)) {
          salonesData = data.data;
        } else if (Array.isArray(data)) {
          salonesData = data;
        }

        const validSalones = salonesData.filter((salon) => {
          const uuidPattern =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          return salon.Id && uuidPattern.test(salon.Id.toString());
        });

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
      const uuidPattern =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!formData.salonId || !uuidPattern.test(formData.salonId)) {
        throw new Error(
          `Por favor seleccione un salón válido (ID actual: ${formData.salonId})`
        );
      }

      const formattedData = {
        ...formData,
        fecha: new Date(formData.fecha).toISOString(),
      };

      const response = await fetch(`${API_URL}/api/evento/${evento.Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

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
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg border-2 border-yellow-600 p-6 w-full max-w-md mx-4 shadow-lg shadow-yellow-800/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Editar Evento</h2>
          <button
            onClick={onClose}
            className="text-yellow-500 hover:text-yellow-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Nombre del Evento
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del Evento"
              className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Salón
            </label>
            {fetchingSalones ? (
              <div className="p-3 text-center bg-gray-700 rounded-lg border border-yellow-600 text-yellow-500">
                Cargando salones...
              </div>
            ) : (
              <>
                {salones.length > 0 ? (
                  <select
                    name="salonId"
                    className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
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
                  <div className="bg-yellow-900/50 border border-yellow-600 text-yellow-300 px-4 py-3 rounded">
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Fecha y Hora
              </label>
              <input
                type="datetime-local"
                name="fecha"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                value={formData.fecha}
                onChange={handleChange}
                min={getTodayString()}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Duración (min)
              </label>
              <input
                type="number"
                name="duracion"
                placeholder="Duración en minutos"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                value={formData.duracion}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Capacidad
              </label>
              <input
                type="number"
                name="capacidad"
                placeholder="Capacidad"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                value={formData.capacidad}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="activo"
                id="activo"
                className="mr-2 h-5 w-5 text-yellow-600 bg-gray-700 border-yellow-600 rounded focus:ring-yellow-500"
                checked={formData.activo}
                onChange={handleChange}
              />
              <label
                htmlFor="activo"
                className="text-sm font-medium text-white"
              >
                Evento Activo
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg border border-yellow-600 transition-colors duration-300"
            disabled={loading || fetchingSalones || salones.length === 0}
          >
            {loading ? "Actualizando..." : "Actualizar Evento"}
          </button>
        </form>
      </div>
    </div>
  );
}
