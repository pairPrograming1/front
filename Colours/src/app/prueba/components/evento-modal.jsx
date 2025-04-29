"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Clock, Users, Home, Check } from "lucide-react";
import apiUrls from "@/app/components/utils/apiConfig";

const API_URL = apiUrls.local;

export default function EventoModal({ onClose, onEventoAdded }) {
  const [formData, setFormData] = useState({
    nombre: "",
    fecha: "",
    duracion: 60,
    capacidad: 1,
    activo: true,
    salonId: "",
    image: "", // Nuevo campo
    descripcion: "", // Nuevo campo
  });

  const [salones, setSalones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingSalones, setFetchingSalones] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalones = async () => {
      try {
        setFetchingSalones(true);
        const response = await fetch(`${API_URL}/api/salon?limit=100`); // Aumentar el límite para obtener todos los salones
        if (!response.ok) {
          throw new Error("Error al cargar los salones");
        }

        const data = await response.json();
        let salonesData = [];

        // Manejar diferentes formatos de respuesta
        if (data.success && Array.isArray(data.data)) {
          salonesData = data.data;
        } else if (Array.isArray(data)) {
          salonesData = data;
        } else if (data.salones && Array.isArray(data.salones)) {
          salonesData = data.salones;
        }

        // Filtrar solo salones activos
        const activeSalones = salonesData.filter(
          (salon) =>
            salon.estatus === true ||
            salon.isActive === true ||
            salon.activo === true
        );

        // Asegurarse de que todos los salones tengan un ID válido
        const validSalones = activeSalones.filter((salon) => {
          return salon.Id || salon.id || salon._id;
        });

        // Mapear los salones para normalizar la estructura
        const normalizedSalones = validSalones.map((salon) => ({
          Id: salon.Id || salon.id || salon._id,
          nombre: salon.salon || salon.nombre || "Salón sin nombre",
          capacidad: salon.capacidad,
        }));

        setSalones(normalizedSalones);

        if (normalizedSalones.length === 0) {
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
        [name]: Number.parseInt(value) || 0,
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
      if (!formData.salonId) {
        throw new Error("Por favor seleccione un salón válido");
      }

      const formattedData = {
        ...formData,
        salonId: formData.salonId, // Asegurar que el salonId se incluya
        fecha: new Date(formData.fecha).toISOString(),
        image: formData.image || null, // Validar campo opcional
        descripcion: formData.descripcion || null, // Validar campo opcional
      };

      const response = await fetch(`${API_URL}/api/evento/`, {
        method: "POST",
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
        if (onEventoAdded) onEventoAdded();
        onClose();
      } else {
        throw new Error(
          result.message || "Error desconocido al crear el evento"
        );
      }
    } catch (err) {
      console.error("Error creating evento:", err);
      setError(
        err.message ||
          "No se pudo crear el evento. Por favor intente nuevamente."
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
    <div className="fixed inset-0 z-50 overflow-y-auto  flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg border-2 border-yellow-600 p-4 sm:p-6 w-full max-w-md mx-auto shadow-lg shadow-yellow-800/20 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6 sticky top-0 bg-gray-800 pb-2 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Agregar Evento</h2>
          <button
            onClick={onClose}
            className="text-yellow-500 hover:text-yellow-300 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Nombre del Evento
            </label>
            <div className="relative">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del Evento"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-5 w-5" />
            </div>
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
                  <div className="relative">
                    <select
                      name="salonId"
                      className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors appearance-none"
                      value={formData.salonId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccionar Salón</option>
                      {salones.map((salon) => (
                        <option key={salon.Id} value={salon.Id}>
                          {salon.nombre}{" "}
                          {salon.capacidad
                            ? `(Capacidad: ${salon.capacidad})`
                            : ""}
                        </option>
                      ))}
                    </select>
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-5 w-5" />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-yellow-500" />
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-900/50 border border-yellow-600 text-yellow-300 px-4 py-3 rounded text-sm">
                    No hay salones disponibles. Por favor, agregue un salón
                    primero.
                  </div>
                )}
              </>
            )}
            {formData.salonId && (
              <div className="text-xs mt-1 text-gray-400 truncate">
                ID: {formData.salonId}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Fecha y Hora
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  name="fecha"
                  className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                  value={formData.fecha}
                  onChange={handleChange}
                  min={getTodayString()}
                  required
                />
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-5 w-5" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Duración (min)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="duracion"
                  placeholder="Duración en minutos"
                  className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                  value={formData.duracion}
                  onChange={handleChange}
                  min="1"
                  required
                />
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Capacidad
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="capacidad"
                  placeholder="Capacidad"
                  className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                  value={formData.capacidad}
                  onChange={handleChange}
                  min="1"
                  required
                />
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center h-full pt-6">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="activo"
                    id="activo"
                    className="sr-only"
                    checked={formData.activo}
                    onChange={handleChange}
                  />
                  <div
                    className={`block w-14 h-8 rounded-full transition-colors ${
                      formData.activo ? "bg-yellow-600" : "bg-gray-600"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                      formData.activo ? "transform translate-x-6" : ""
                    }`}
                  ></div>
                </div>
                <div className="ml-3 text-white text-sm">
                  {formData.activo ? "Evento Activo" : "Evento Inactivo"}
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              URL de la Imagen (opcional)
            </label>
            <div className="relative">
              <input
                type="url"
                name="image"
                placeholder="https://example.com/imagen.jpg"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                value={formData.image}
                onChange={handleChange}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-5 w-5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Descripción del Evento (opcional)
            </label>
            <textarea
              name="descripcion"
              placeholder="Descripción detallada del evento"
              className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
              value={formData.descripcion}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg border border-yellow-600 transition-colors duration-300 flex items-center justify-center gap-2"
            disabled={loading || fetchingSalones || salones.length === 0}
          >
            {loading ? (
              "Creando..."
            ) : (
              <>
                <Check className="h-5 w-5" />
                <span>Crear Evento</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function ChevronDown(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
