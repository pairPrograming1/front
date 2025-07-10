"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Clock, Users, Home, Check, Image } from "lucide-react";
import apiUrls from "@/app/components/utils/apiConfig";
import Swal from "sweetalert2";

const API_URL = apiUrls;

export default function EventoModal({ onClose, onEventoAdded }) {
  const [formData, setFormData] = useState({
    nombre: "",
    fecha: "",
    duracion: 60,
    capacidad: 1,
    activo: true,
    salonId: "",
    image: "", // Ahora mantenemos este campo para la URL de la imagen
    descripcion: "",
  });

  const [salones, setSalones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingSalones, setFetchingSalones] = useState(true);
  const [error, setError] = useState(null);

  // Nuevos estados para manejar imágenes
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingImages, setLoadingImages] = useState(false);
  const [activeTab, setActiveTab] = useState("info"); // Para alternar entre "info", "imagenes" y "contrato"
  const [capacidadError, setCapacidadError] = useState(""); // Nuevo estado para error de capacidad

  // Estado para los datos del contrato
  const [contrato, setContrato] = useState({
    numeroContrato: "",
    fechaContrato: "",
    montoContrato: "",
    cantidadGraduados: "",
    minimoCenas: "",
    minimoBrindis: "",
    firmantes: [
      {
        nombre: "",
        apellido: "",
        telefono: "",
        mail: "",
      },
    ],
    fechaFirma: "",
    vendedor: "",
    observaciones: "",
    fechaSenia: "",
    pdf: "", // Ahora es una URL, no un archivo
    eventoId: "",
  });

  useEffect(() => {
    const fetchSalones = async () => {
      try {
        setFetchingSalones(true);
        const response = await fetch(`${API_URL}/api/salon?limit=100`);
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
        } else {
          // Seleccionar automáticamente el primer salón activo si existe
          setFormData((prev) => ({
            ...prev,
            salonId: normalizedSalones[0].Id,
          }));
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

  // Función para cargar imágenes - similar a la de SalonModal
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
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let newValue;
    if (type === "number") {
      newValue = Number.parseInt(value) || 0;
    } else if (type === "checkbox") {
      newValue = e.target.checked;
    } else {
      newValue = value;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Validar capacidad al cambiar el campo
    if (name === "capacidad" || name === "salonId") {
      let capacidad = name === "capacidad" ? newValue : formData.capacidad;
      let salonId = name === "salonId" ? newValue : formData.salonId;
      const selectedSalon = salones.find((salon) => salon.Id === salonId);
      if (
        selectedSalon &&
        selectedSalon.capacidad &&
        capacidad > selectedSalon.capacidad
      ) {
        setCapacidadError(
          `La capacidad del evento (${capacidad}) supera la capacidad máxima del salón (${selectedSalon.capacidad}).`
        );
      } else {
        setCapacidadError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo 'nombre' es obligatorio.",
      });
      return;
    }

    // Buscar el salón seleccionado
    const selectedSalon = salones.find(
      (salon) => salon.Id === formData.salonId
    );
    if (!selectedSalon) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe seleccionar un salón válido.",
      });
      return;
    }

    // Validar que la capacidad del evento no supere la del salón (sin SweetAlert)
    if (
      selectedSalon.capacidad &&
      formData.capacidad > selectedSalon.capacidad
    ) {
      setCapacidadError(
        `La capacidad del evento (${formData.capacidad}) supera la capacidad máxima del salón (${selectedSalon.capacidad}).`
      );
      return;
    } else {
      setCapacidadError("");
    }

    // Enviar tanto el ID como el nombre del salón
    onEventoAdded({
      ...formData,
      salonId: selectedSalon.Id,
      salonNombre: selectedSalon.nombre,
    });
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

  // Manejar cambios en el formulario de contrato
  const handleContratoChange = (e) => {
    const { name, value } = e.target;
    setContrato((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar cambios en los firmantes
  const handleFirmanteChange = (idx, e) => {
    const { name, value } = e.target;
    setContrato((prev) => {
      const updated = [...prev.firmantes];
      updated[idx][name] = value;
      return { ...prev, firmantes: updated };
    });
  };

  // Agregar nuevo firmante
  const addFirmante = () => {
    setContrato((prev) => ({
      ...prev,
      firmantes: [
        ...prev.firmantes,
        { nombre: "", apellido: "", telefono: "", mail: "" },
      ],
    }));
  };

  // Eliminar firmante
  const removeFirmante = (idx) => {
    setContrato((prev) => {
      const updated = prev.firmantes.filter((_, i) => i !== idx);
      return { ...prev, firmantes: updated };
    });
  };

  // Manejar carga de PDF (ahora solo URL)
  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      // Simulación: en un caso real deberías subir el PDF y obtener la URL
      const fakeUrl = URL.createObjectURL(file);
      setContrato((prev) => ({
        ...prev,
        pdf: fakeUrl,
      }));
    } else {
      setContrato((prev) => ({
        ...prev,
        pdf: "",
      }));
      Swal.fire({
        icon: "error",
        title: "Archivo inválido",
        text: "Solo se permite cargar archivos PDF.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg border-2 border-yellow-600 p-4 sm:p-6 w-full max-w-3xl mx-auto shadow-lg shadow-yellow-800/20 max-h-[90vh] overflow-y-auto">
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

        {/* Pestañas para cambiar entre formulario, imágenes y contrato */}
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
          <button
            onClick={() => setActiveTab("contrato")}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "contrato"
                ? "text-yellow-500 border-b-2 border-yellow-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Detalle de contrato
          </button>
        </div>

        {activeTab === "info" ? (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-white">
                Nombre del Evento
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                  value={formData.nombre || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  required
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-5 w-5" />
              </div>
            </div>

            <div className="md:col-span-2">
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
              {capacidadError && (
                <div className="text-xs text-red-400 mt-1">
                  {capacidadError}
                </div>
              )}
            </div>

            <div className="flex items-center">
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

            {/* Campo de URL de imagen - ahora muestra la imagen seleccionada si hay una */}
            <div className="md:col-span-2">
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
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Vista previa"
                    className="h-20 rounded-lg border border-yellow-600"
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-2">
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

            <div className="md:col-span-2">
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
            </div>
          </form>
        ) : activeTab === "imagenes" ? (
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
        ) : (
          // Formulario de Detalle de contrato
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Número de contrato
              </label>
              <input
                type="text"
                name="numeroContrato"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white"
                value={contrato.numeroContrato}
                onChange={handleContratoChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Fecha del contrato
              </label>
              <input
                type="date"
                name="fechaContrato"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white"
                value={contrato.fechaContrato}
                onChange={handleContratoChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Monto del contrato
              </label>
              <input
                type="number"
                name="montoContrato"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white"
                value={contrato.montoContrato}
                onChange={handleContratoChange}
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Cantidad de graduados
              </label>
              <input
                type="number"
                name="cantidadGraduados"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white"
                value={contrato.cantidadGraduados}
                onChange={handleContratoChange}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Mínimo de cenas
              </label>
              <input
                type="number"
                name="minimoCenas"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white"
                value={contrato.minimoCenas}
                onChange={handleContratoChange}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Mínimo de brindis
              </label>
              <input
                type="number"
                name="minimoBrindis"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white"
                value={contrato.minimoBrindis}
                onChange={handleContratoChange}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Firmantes
              </label>
              {contrato.firmantes.map((firmante, idx) => (
                <div
                  key={idx}
                  className="mb-2 p-2 border border-yellow-600 rounded-lg bg-gray-700"
                >
                  <div className="flex gap-2 mb-1">
                    <input
                      type="text"
                      name="apellido"
                      placeholder="Apellido*"
                      className="flex-1 bg-gray-800 border border-yellow-600 rounded-lg p-2 text-white"
                      value={firmante.apellido}
                      onChange={(e) => handleFirmanteChange(idx, e)}
                      required
                    />
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre*"
                      className="flex-1 bg-gray-800 border border-yellow-600 rounded-lg p-2 text-white"
                      value={firmante.nombre}
                      onChange={(e) => handleFirmanteChange(idx, e)}
                      required
                    />
                  </div>
                  <div className="flex gap-2 mb-1">
                    <input
                      type="tel"
                      name="telefono"
                      placeholder="Teléfono"
                      className="flex-1 bg-gray-800 border border-yellow-600 rounded-lg p-2 text-white"
                      value={firmante.telefono}
                      onChange={(e) => handleFirmanteChange(idx, e)}
                    />
                    <input
                      type="email"
                      name="mail"
                      placeholder="Mail"
                      className="flex-1 bg-gray-800 border border-yellow-600 rounded-lg p-2 text-white"
                      value={firmante.mail}
                      onChange={(e) => handleFirmanteChange(idx, e)}
                    />
                  </div>
                  {contrato.firmantes.length > 1 && (
                    <button
                      type="button"
                      className="text-xs text-red-400 ml-2"
                      onClick={() => removeFirmante(idx)}
                    >
                      Quitar
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="mt-1 text-xs text-yellow-500 hover:text-yellow-300"
                onClick={addFirmante}
              >
                + Agregar firmante
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Fecha de firma
              </label>
              <input
                type="date"
                name="fechaFirma"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white"
                value={contrato.fechaFirma}
                onChange={handleContratoChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Vendedor
              </label>
              <input
                type="text"
                name="vendedor"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white"
                value={contrato.vendedor}
                onChange={handleContratoChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Observaciones
              </label>
              <textarea
                name="observaciones"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white"
                value={contrato.observaciones}
                onChange={handleContratoChange}
                rows="2"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Fecha de seña
              </label>
              <input
                type="date"
                name="fechaSenia"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white"
                value={contrato.fechaSenia}
                onChange={handleContratoChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                URL del PDF del contrato
              </label>
              <input
                type="url"
                name="pdf"
                placeholder="https://tuservidor.com/contratos/CT-2025-001.pdf"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white"
                value={contrato.pdf}
                onChange={handleContratoChange}
              />
              {contrato.pdf && (
                <div className="text-xs text-green-400 mt-1">
                  PDF cargado:{" "}
                  <a
                    href={contrato.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {contrato.pdf}
                  </a>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                ID del evento (opcional)
              </label>
              <input
                type="text"
                name="eventoId"
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 text-white"
                value={contrato.eventoId}
                onChange={handleContratoChange}
              />
            </div>
            {/* Botón para enviar el contrato */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg border border-yellow-600 transition-colors flex items-center gap-2"
                onClick={async () => {
                  if (!contrato.eventoId) {
                    Swal.fire({
                      icon: "warning",
                      title: "ID de evento requerido",
                      text: "Por favor, ingrese el ID del evento para asociar el contrato.",
                    });
                    return;
                  }
                  try {
                    const res = await fetch(
                      `${API_URL}/api/evento/${contrato.eventoId}/contrato`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(contrato),
                      }
                    );
                    if (!res.ok) {
                      const errorData = await res.json();
                      throw new Error(
                        errorData.message || "Error al guardar el contrato"
                      );
                    }
                    Swal.fire({
                      icon: "success",
                      title: "Contrato guardado",
                      text: "El contrato se ha guardado correctamente.",
                    });
                  } catch (err) {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: err.message,
                    });
                  }
                }}
              >
                <Check className="h-5 w-5" />
                <span>Guardar contrato</span>
              </button>
            </div>
          </form>
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

function RefreshCw(props) {
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
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function Loader(props) {
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
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
