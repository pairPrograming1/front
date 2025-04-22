"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { X } from "lucide-react";
import ImageUploaderModal from "./image-uploader-modal";
import ImageGallery from "./ImageGallery";
import apiUrls from "@/app/components/utils/apiConfig";

const API_URL = apiUrls.production;

export default function ColourRosarioModal({ punto, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState("informacion");
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [errorImages, setErrorImages] = useState(null);
  const [salones, setSalones] = useState([]);
  const [loadingSalones, setLoadingSalones] = useState(false);
  const [errorSalones, setErrorSalones] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [data, setData] = useState({
    razon: punto?.razon || "",
    nombre: punto?.nombre || "",
    direccion: punto?.direccion || "",
    cuit: punto?.cuit || "",
    personaContacto: punto?.personaContacto || "",
    email: punto?.email || "",
    whatsapp: punto?.whatsapp || "",
    telefono: punto?.telefono || "",
    es_online: punto?.es_online || false,
    salonesHabilitados: punto?.salonesHabilitados || [],
    vendedoresAsignados: punto?.vendedoresAsignados || [],
    imagenes: punto?.imagenes || [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    tiposCobro: {
      mercadoPago: {
        apiKey: punto?.tiposCobro?.mercadoPago?.apiKey || "",
        secretId: punto?.tiposCobro?.mercadoPago?.secretId || "",
      },
      transferencia: {
        cbu: punto?.tiposCobro?.transferencia?.cbu || "",
        entidadCobro: punto?.tiposCobro?.transferencia?.entidadCobro || "",
      },
    },
  });

  useEffect(() => {
    if (punto) {
      setData({
        razon: punto.razon || "",
        nombre: punto.nombre || "",
        direccion: punto.direccion || "",
        cuit: punto.cuit || "",
        personaContacto: punto.personaContacto || "",
        email: punto.email || "",
        whatsapp: punto.whatsapp || "",
        telefono: punto.telefono || "",
        es_online: punto.es_online || false,
        salonesHabilitados: punto.salonesHabilitados || [],
        vendedoresAsignados: punto.vendedoresAsignados || [],
        imagenes: punto.image || ["/placeholder.svg"],
        tiposCobro: {
          mercadoPago: {
            apiKey: punto.tiposCobro?.mercadoPago?.apiKey || "",
            secretId: punto.tiposCobro?.mercadoPago?.secretId || "",
          },
          transferencia: {
            cbu: punto.tiposCobro?.transferencia?.cbu || "",
            entidadCobro: punto.tiposCobro?.transferencia?.entidadCobro || "",
          },
        },
      });
    }
  }, [punto]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Validación especial para teléfono
    if (name === "telefono") {
      const validatedValue = value.replace(/[^0-9+]/g, "");
      if (validatedValue.includes("+")) {
        const parts = validatedValue.split("+");
        if (parts.length > 2 || (parts.length === 2 && parts[0] !== "")) {
          return;
        }
      }
      setData((prev) => ({ ...prev, [name]: validatedValue }));
      return;
    }

    // Validación especial para whatsapp
    if (name === "whatsapp") {
      const validatedValue = value.replace(/[^0-9+]/g, "");
      if (validatedValue.includes("+")) {
        const parts = validatedValue.split("+");
        if (parts.length > 2 || (parts.length === 2 && parts[0] !== "")) {
          return;
        }
      }
      setData((prev) => ({ ...prev, [name]: validatedValue }));
      return;
    }

    // Validación especial para CUIT
    if (name === "cuit") {
      const digits = value.replace(/\D/g, "");
      setData((prev) => ({ ...prev, [name]: digits }));
      return;
    }

    // Para los demás campos
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const formatCUIT = (cuit) => {
    const digits = cuit.replace(/\D/g, "");
    if (digits.length === 11) {
      return `${digits.substring(0, 2)}-${digits.substring(
        2,
        10
      )}-${digits.substring(10)}`;
    }
    return digits;
  };

  const fetchSalones = async () => {
    try {
      setLoadingSalones(true);
      const response = await fetch(`${API_URL}/api/salon?limit=100`); // Aumentamos el límite a 100
      if (!response.ok) {
        throw new Error(`Error al obtener salones: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.data) {
        const salonesActivos = result.data.filter(
          (salon) => salon.estatus === true
        );
        setSalones(salonesActivos);
      } else {
        throw new Error(result.message || "Error al obtener los salones");
      }
    } catch (err) {
      console.error("Error fetching salones:", err);
      setErrorSalones(err.message);
    } finally {
      setLoadingSalones(false);
    }
  };

  useEffect(() => {
    fetchSalones();
  }, []);

  const fetchPuntoImages = async () => {
    if (!punto?.id) return;

    try {
      setLoadingImages(true);
      const response = await fetch(`${API_URL}/api/puntodeventa/${punto.id}`);

      if (!response.ok) {
        throw new Error(`Error al obtener imágenes: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.data && result.data.imagenes) {
        setData((prev) => ({
          ...prev,
          imagenes: result.data.imagenes,
        }));
      }
    } catch (err) {
      console.error("Error fetching images:", err);
      setErrorImages(err.message);
    } finally {
      setLoadingImages(false);
    }
  };

  useEffect(() => {
    if (punto?.id) {
      fetchPuntoImages();
    }
  }, [punto?.id]);

  const handleImageSelected = (imageUrl) => {
    const newImages = [...data.imagenes];
    const placeholderIndex = newImages.findIndex(
      (img) => img === "/placeholder.svg"
    );

    if (placeholderIndex !== -1) {
      newImages[placeholderIndex] = imageUrl;
    } else {
      newImages[0] = imageUrl;
    }

    setData((prev) => ({
      ...prev,
      imagenes: newImages,
    }));
  };

  const validateForm = () => {
    // Validar campos requeridos
    const requiredFields = ["razon", "nombre", "direccion", "cuit", "email"];

    for (const field of requiredFields) {
      if (!data[field] || data[field].trim() === "") {
        return `El campo ${field} es requerido`;
      }
    }

    // Validar teléfono
    if (data.telefono && !/^\+?\d+$/.test(data.telefono)) {
      return "El teléfono solo puede contener números y un + al inicio";
    }

    // Validar whatsapp
    if (data.whatsapp && !/^\+?\d+$/.test(data.whatsapp)) {
      return "El WhatsApp solo puede contener números y un + al inicio";
    }

    // Validar CUIT
    const formattedCUIT = formatCUIT(data.cuit);
    const cuitPattern = /^\d{2}-\d{8}-\d{1}$/;
    if (!cuitPattern.test(formattedCUIT)) {
      return "El CUIT debe tener 11 dígitos con formato XX-XXXXXXXX-X";
    }

    // Validar email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      return "El formato del correo electrónico es inválido";
    }

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setValidationError(validationError);
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: validationError,
      });
      return;
    }

    try {
      const formattedCUIT = formatCUIT(data.cuit);
      const submitData = {
        ...data,
        cuit: formattedCUIT,
        image:
          data.imagenes.find((img) => img !== "/placeholder.svg") ||
          data.imagenes[0],
      };

      const endpoint = punto?.id
        ? `${API_URL}/api/puntodeventa/${punto.id}`
        : `${API_URL}/api/puntodeventa`;

      const method = punto?.id ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Error al guardar los datos");
      }

      setValidationError(null);
      onUpdate?.();
      onClose();

      Swal.fire({
        icon: "success",
        title: punto?.id ? "Actualizado" : "Creado",
        text: punto?.id
          ? "Punto de venta actualizado correctamente"
          : "Punto de venta creado correctamente",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal container */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal content */}
        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full border-2 border-yellow-600">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-yellow-500 hover:text-yellow-300 focus:outline-none transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Main Content */}
          <div className="p-6">
            {validationError && (
              <div className="mb-4 p-3 bg-red-900/50 text-red-300 text-sm rounded-lg border border-red-700">
                {validationError}
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <input
                type="text"
                name="razon"
                placeholder="Razón Social *"
                value={data.razon}
                onChange={handleChange}
                className="bg-gray-700 border border-yellow-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                required
              />
              <input
                type="text"
                name="nombre"
                placeholder="Nombre *"
                value={data.nombre}
                onChange={handleChange}
                className="bg-gray-700 border border-yellow-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                required
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección *"
                value={data.direccion}
                onChange={handleChange}
                className="bg-gray-700 border border-yellow-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                required
              />
              <div className="relative">
                <input
                  type="text"
                  name="cuit"
                  placeholder="CUIT (11 dígitos) *"
                  value={data.cuit}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-yellow-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                  maxLength="11"
                  required
                />
                {data.cuit.length === 11 && (
                  <span className="absolute right-3 top-3 text-green-400 text-sm">
                    {formatCUIT(data.cuit)}
                  </span>
                )}
              </div>
              <input
                type="email"
                name="email"
                placeholder="E-mail *"
                value={data.email}
                onChange={handleChange}
                className="bg-gray-700 border border-yellow-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                required
              />

              <div className="relative">
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono (solo números, + opcional)"
                  value={data.telefono}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-yellow-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2 text-white">
                  <input
                    type="checkbox"
                    name="es_online"
                    checked={data.es_online}
                    onChange={handleChange}
                    className="h-5 w-5 text-yellow-600 rounded focus:ring-yellow-500 border-yellow-600 bg-gray-700"
                  />
                  <span>Es Online</span>
                </label>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="flex mb-6">
              <div className="flex-1">
                {/* Tabs */}
                <div className="mb-6">
                  <div className="flex space-x-2 mb-4">
                    <button
                      className={`rounded-lg px-6 py-2 ${
                        activeTab === "informacion"
                          ? "bg-yellow-700 text-white"
                          : "bg-gray-700 text-white hover:bg-gray-600"
                      } transition-colors`}
                      onClick={() => setActiveTab("informacion")}
                    >
                      Información
                    </button>
                    <button
                      className={`rounded-lg px-6 py-2 ${
                        activeTab === "cobros"
                          ? "bg-yellow-700 text-white"
                          : "bg-gray-700 text-white hover:bg-gray-600"
                      } transition-colors`}
                      onClick={() => setActiveTab("cobros")}
                    >
                      Cobros
                    </button>
                  </div>

                  {activeTab === "informacion" && (
                    <div>
                      {/* Salones Habilitados */}
                      <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-yellow-500">
                            Salones Habilitados ({salones.length})
                          </h3>
                          <div className="text-sm text-gray-400">
                            Mostrando todos los salones activos
                          </div>
                        </div>

                        {/* Contenedor con scroll para todos los salones */}
                        <div
                          className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto p-2"
                          style={{ scrollbarWidth: "thin" }}
                        >
                          {loadingSalones ? (
                            <div className="col-span-4 h-32 flex items-center justify-center bg-gray-700 rounded-lg border border-yellow-600">
                              <p className="text-yellow-500">
                                Cargando salones...
                              </p>
                            </div>
                          ) : errorSalones ? (
                            <div className="col-span-4 h-32 flex items-center justify-center bg-gray-700 rounded-lg border border-yellow-600">
                              <p className="text-red-400">
                                Error: {errorSalones}
                              </p>
                            </div>
                          ) : salones.length > 0 ? (
                            salones.map((salon) => (
                              <div
                                key={salon.id}
                                className={`bg-gray-700 border border-yellow-600 rounded-lg overflow-hidden hover:bg-gray-600 transition-colors cursor-pointer ${
                                  data.salonesHabilitados.some(
                                    (s) => s.id === salon.id
                                  )
                                    ? "bg-yellow-700/20 border-yellow-500"
                                    : ""
                                }`}
                                onClick={() => {
                                  const isSelected =
                                    data.salonesHabilitados.some(
                                      (s) => s.id === salon.id
                                    );
                                  setData((prev) => ({
                                    ...prev,
                                    salonesHabilitados: isSelected
                                      ? prev.salonesHabilitados.filter(
                                          (s) => s.id !== salon.id
                                        )
                                      : [...prev.salonesHabilitados, salon],
                                  }));
                                }}
                              >
                                <div className="p-0 h-32 flex flex-col items-center justify-center">
                                  <span className="text-xl font-light italic text-white text-center">
                                    {salon.nombre}
                                  </span>
                                  {data.salonesHabilitados.some(
                                    (s) => s.id === salon.id
                                  ) && (
                                    <span className="text-green-400 text-xs mt-1">
                                      Seleccionado
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="col-span-4 h-32 flex items-center justify-center bg-gray-700 rounded-lg border border-yellow-600">
                              <p className="text-gray-400">
                                No hay salones activos disponibles
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Vendedores asignados */}
                      <div>
                        <h3 className="text-lg font-semibold text-yellow-500 mb-4">
                          Vendedores asignados
                        </h3>
                        <div className="grid grid-cols-4 gap-4">
                          {data.vendedoresAsignados &&
                            data.vendedoresAsignados.map((vendedor, index) => (
                              <div
                                key={index}
                                className="bg-gray-700 border border-yellow-600 rounded-lg overflow-hidden"
                              >
                                <div className="p-4 h-32">
                                  <div className="space-y-1 text-white">
                                    <p className="font-medium">
                                      {vendedor.nombre}
                                    </p>
                                    <p className="text-xs text-gray-300">
                                      Teléfono: {vendedor.telefono}
                                    </p>
                                    <p className="text-xs text-gray-300">
                                      Email: {vendedor.email}
                                    </p>
                                    <p className="text-xs text-gray-300">
                                      WhatsApp: {vendedor.whatsapp}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "cobros" && (
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-500 mb-4">
                        Información de Cobros
                      </h3>
                      <div className="w-72 mt-4">
                        <div className="space-y-4">
                          <div className="bg-gray-700 border border-yellow-600 rounded-lg">
                            <div className="p-4">
                              <h4 className="mb-2 text-white">Mercado Pago</h4>
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  placeholder="API Key"
                                  value={data.tiposCobro.mercadoPago.apiKey}
                                  onChange={(e) =>
                                    setData({
                                      ...data,
                                      tiposCobro: {
                                        ...data.tiposCobro,
                                        mercadoPago: {
                                          ...data.tiposCobro.mercadoPago,
                                          apiKey: e.target.value,
                                        },
                                      },
                                    })
                                  }
                                  className="w-full bg-gray-800 border border-yellow-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                />
                                <input
                                  type="text"
                                  placeholder="Secret ID"
                                  value={data.tiposCobro.mercadoPago.secretId}
                                  onChange={(e) =>
                                    setData({
                                      ...data,
                                      tiposCobro: {
                                        ...data.tiposCobro,
                                        mercadoPago: {
                                          ...data.tiposCobro.mercadoPago,
                                          secretId: e.target.value,
                                        },
                                      },
                                    })
                                  }
                                  className="w-full bg-gray-800 border border-yellow-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-700 border border-yellow-600 rounded-lg">
                            <div className="p-4">
                              <h4 className="mb-2 text-white">Transferencia</h4>
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  placeholder="CBU"
                                  value={data.tiposCobro.transferencia.cbu}
                                  onChange={(e) =>
                                    setData({
                                      ...data,
                                      tiposCobro: {
                                        ...data.tiposCobro,
                                        transferencia: {
                                          ...data.tiposCobro.transferencia,
                                          cbu: e.target.value,
                                        },
                                      },
                                    })
                                  }
                                  className="w-full bg-gray-800 border border-yellow-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                />
                                <input
                                  type="text"
                                  placeholder="Entidad de Cobro"
                                  value={
                                    data.tiposCobro.transferencia.entidadCobro
                                  }
                                  onChange={(e) =>
                                    setData({
                                      ...data,
                                      tiposCobro: {
                                        ...data.tiposCobro,
                                        transferencia: {
                                          ...data.tiposCobro.transferencia,
                                          entidadCobro: e.target.value,
                                        },
                                      },
                                    })
                                  }
                                  className="w-full bg-gray-800 border border-yellow-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-700 border border-yellow-600 rounded-lg">
                            <div className="p-4">
                              <h4 className="mb-2 text-white">Efectivo</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-72 ml-6">
                {/* Opciones de imagen */}
                <div className="flex space-x-2 mb-4">
                  <button
                    className="bg-yellow-700 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm flex-1 transition-colors"
                    onClick={() => setShowImageUploader(true)}
                  >
                    Subir Imagen
                  </button>
                  <button
                    className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex-1 transition-colors"
                    onClick={() => setShowImageGallery(true)}
                  >
                    Galería
                  </button>
                  <button
                    className="bg-green-700 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm flex-1 transition-colors"
                    onClick={fetchPuntoImages}
                    disabled={loadingImages || !punto?.id}
                  >
                    {loadingImages ? "Cargando..." : "Actualizar"}
                  </button>
                </div>

                {errorImages && (
                  <div className="text-red-400 text-sm mb-2">
                    Error: {errorImages}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  {loadingImages ? (
                    <div className="col-span-2 h-32 flex items-center justify-center bg-gray-700 rounded-lg border border-yellow-600">
                      <p className="text-yellow-500">Cargando imágenes...</p>
                    </div>
                  ) : data.imagenes && data.imagenes.length > 0 ? (
                    data.imagenes.map((imagen, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-yellow-700/30 rounded-lg overflow-hidden border border-yellow-600"
                      >
                        <Image
                          src={imagen}
                          alt="Imagen de galería"
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 h-32 flex items-center justify-center bg-gray-700 rounded-lg border border-yellow-600">
                      <p className="text-gray-400">
                        No hay imágenes disponibles
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer with action buttons */}
          <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-yellow-600">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-yellow-700 text-base font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-lg border border-yellow-600 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

      {/* Image Uploader Modal */}
      {showImageUploader && (
        <ImageUploaderModal
          onClose={() => setShowImageUploader(false)}
          onImageSelected={(imageUrl) => {
            handleImageSelected(imageUrl);
            setShowImageUploader(false);
          }}
        />
      )}

      {/* Image Gallery Modal */}
      {showImageGallery && (
        <ImageGallery
          onClose={() => setShowImageGallery(false)}
          onImageSelected={(imageUrl) => {
            handleImageSelected(imageUrl);
            setShowImageGallery(false);
          }}
          puntoId={punto?.id}
        />
      )}
    </div>
  );
}
