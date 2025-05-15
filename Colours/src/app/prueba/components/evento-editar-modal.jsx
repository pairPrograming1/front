"use client";

import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  Users,
  Home,
  Check,
  Image,
  RefreshCw,
  Loader,
} from "lucide-react";
import apiUrls from "@/app/components/utils/apiConfig";
import Swal from "sweetalert2";

const API_URL = apiUrls;

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
    descripcion: "",
    image: "", // Campo para URL de imagen
  });

  const [salones, setSalones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingSalones, setFetchingSalones] = useState(true);
  const [error, setError] = useState(null);

  // Nuevos estados para manejar imágenes
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingImages, setLoadingImages] = useState(false);
  const [activeTab, setActiveTab] = useState("info"); // Para alternar entre "info" e "imagenes"
  const [imageError, setImageError] = useState(false);

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
        descripcion: evento.descripcion || "",
        image: evento.image || "", // Inicializar con la URL de la imagen existente
      });

      // Si el evento tiene una imagen, seleccionarla
      if (evento.image) {
        setSelectedImage(evento.image);
        setImageError(false); // Reset error state
      }
    }
  }, [evento]);

  useEffect(() => {
    if (!evento?.id) {
      Swal.fire({
        title: "Error",
        text: "El evento no tiene un ID válido. No se puede editar.",
        icon: "error",
      });
      onClose();
    }
  }, [evento]);

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
          nombre: salon.salon || salon.nombre || "Salón sin nombre", // Mostrar el campo 'salon'
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
    // Cargar imágenes al iniciar el componente
    fetchImages();
  }, []);

  // Función para cargar imágenes
  const fetchImages = async () => {
    setLoadingImages(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/upload/images`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("No se pudieron obtener las imágenes");

      const data = await res.json();
      console.log("Imágenes cargadas:", data);
      setImages(data);
    } catch (err) {
      console.error("Error al cargar imágenes:", err);
      setError("Error al obtener imágenes: " + err.message);
    } finally {
      setLoadingImages(false);
    }
  };

  // Función para seleccionar una imagen de la galería
  const selectImage = (url) => {
    setSelectedImage(url);
    setImageError(false); // Reset error state when selecting a new image
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
  };

  const handleImageError = () => {
    setImageError(true);
  };

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

      // Reset image error when URL changes
      if (name === "image") {
        setImageError(false);
        setSelectedImage(value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!evento?.id) {
        throw new Error(
          "El ID del evento no está definido. No se puede actualizar el evento."
        );
      }

      const formattedData = {
        ...formData,
        fecha: new Date(formData.fecha).toISOString(),
        salonNombre:
          salones.find((salon) => salon.Id === formData.salonId)?.nombre ||
          evento.salon ||
          "", // Mantener el salón asignado si no se selecciona uno nuevo
      };

      const response = await fetch(`${API_URL}/api/evento/${evento.id}`, {
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

  // Render image preview component
  const ImagePreview = ({ url, className = "" }) => {
    if (!url) return null;

    return (
      <div className={`relative ${className}`}>
        <div className="w-full rounded-lg overflow-hidden border border-yellow-600 bg-gray-800">
          <img
            src={url}
            alt="Vista previa"
            className="w-full h-40 object-contain"
            onError={handleImageError}
          />
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/80 text-yellow-500">
              <div className="text-center p-4">
                <Image className="h-8 w-8 mx-auto mb-2 opacity-70" />
                <p className="text-sm">Error al cargar la imagen</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg border-2 border-yellow-600 p-4 sm:p-6 w-full max-w-3xl mx-auto shadow-lg shadow-yellow-800/20 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6 sticky top-0 bg-gray-800 pb-2 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Editar Evento</h2>
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

        {/* Display Current Image Preview At The Top */}
        {formData.image && (
          <div className="mb-6">
            <div className="text-sm font-medium text-white mb-2 flex justify-between items-center">
              <span>Imagen Actual</span>
              <button
                type="button"
                onClick={() => setActiveTab("imagenes")}
                className="text-xs text-yellow-500 hover:text-yellow-300 flex items-center"
              >
                <Image className="h-3 w-3 mr-1" /> Cambiar Imagen
              </button>
            </div>
            <ImagePreview url={formData.image} />
          </div>
        )}

        {/* Pestañas para cambiar entre formulario e imágenes */}
        <div className="flex border-b border-gray-700 mb-4">
          <button
            onClick={() => setActiveTab("info")}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "info"
                ? "text-yellow-500 border-b-2 border-yellow-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Información del Evento
          </button>
          <button
            onClick={() => setActiveTab("imagenes")}
            className={`py-2 px-4 text-sm font-medium flex items-center ${
              activeTab === "imagenes"
                ? "text-yellow-500 border-b-2 border-yellow-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Image className="h-4 w-4 mr-1" />
            Seleccionar Imagen
          </button>
        </div>

        {activeTab === "info" ? (
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
              {evento?.salon && (
                <div className="p-3 bg-gray-700 rounded-lg border border-yellow-600 text-yellow-500 mb-4">
                  Salón asignado: {evento.salon}
                </div>
              )}
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

            {/* Campo de URL de imagen - ahora se mueve abajo ya que la previsualización se muestra arriba */}
            <div>
              <label className="block text-sm font-medium mb-1 text-white flex justify-between">
                <span>URL de la Imagen</span>
                <button
                  type="button"
                  className="text-xs text-yellow-500 hover:text-yellow-300"
                  onClick={() => setActiveTab("imagenes")}
                >
                  Seleccionar de la galería
                </button>
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
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-5 w-5" />
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
                "Actualizando..."
              ) : (
                <>
                  <Check className="h-5 w-5" />
                  <span>Actualizar Evento</span>
                </>
              )}
            </button>
          </form>
        ) : (
          // Vista de selección de imágenes
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">
                Seleccionar imagen para el evento
              </h3>
              <button
                onClick={fetchImages}
                className="text-xs text-yellow-500 hover:text-yellow-300 flex items-center"
              >
                <RefreshCw className="h-3 w-3 mr-1" /> Actualizar
              </button>
            </div>

            {/* Mostrar la imagen actual seleccionada */}
            {formData.image && (
              <div className="mb-4">
                <div className="text-sm text-yellow-500 mb-1">
                  Imagen actual seleccionada:
                </div>
                <ImagePreview url={formData.image} />
              </div>
            )}

            {loadingImages ? (
              <div className="py-8 text-center text-yellow-500">
                <Loader className="animate-spin h-8 w-8 mx-auto mb-2" />
                <p>Cargando imágenes...</p>
              </div>
            ) : images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={image.id || index} className="relative">
                    <img
                      src={image.url}
                      alt={`Imagen ${index + 1}`}
                      className={`w-full h-32 object-cover rounded-lg border cursor-pointer ${
                        selectedImage === image.url
                          ? "border-green-500 ring-2 ring-green-500"
                          : "border-yellow-600 hover:border-yellow-400"
                      }`}
                      onClick={() => selectImage(image.url)}
                    />
                    {selectedImage === image.url && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-400 border border-dashed border-gray-600 rounded-lg">
                <Image className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No hay imágenes disponibles</p>
              </div>
            )}

            <div className="flex justify-end mt-4 space-x-3">
              <button
                type="button"
                onClick={() => setActiveTab("info")}
                className="px-4 py-2 text-yellow-500 hover:text-yellow-300 border border-yellow-600 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (selectedImage) {
                    setFormData((prev) => ({ ...prev, image: selectedImage }));
                    setActiveTab("info");
                  } else {
                    Swal.fire({
                      icon: "warning",
                      title: "Ninguna imagen seleccionada",
                      text: "Por favor seleccione una imagen o vuelva al formulario.",
                    });
                  }
                }}
                className="px-4 py-2 bg-yellow-700 hover:bg-yellow-600 text-white rounded-lg border border-yellow-600 transition-colors flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                <span>Usar imagen seleccionada</span>
              </button>
            </div>
          </div>
        )}
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
