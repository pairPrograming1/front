"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { X } from "lucide-react";
import ImageUploaderModal from "./image-uploader-modal";
import ImageGallery from "./ImageGallery";
import useImageFetcher from "./ImageFetcher";

export default function ColourRosarioModal({ punto, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState("informacion");
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [errorImages, setErrorImages] = useState(null);
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

  // Función para cargar las imágenes del punto de venta
  const fetchPuntoImages = async () => {
    // Solo realizar la solicitud si hay un ID de punto de venta
    if (!punto?.id) return;

    try {
      setLoadingImages(true);
      const response = await fetch(
        `http://localhost:4000/api/puntodeventa/${punto.id}`
      );

      if (!response.ok) {
        throw new Error(`Error al obtener imágenes: ${response.status}`);
      }

      const result = await response.json();

      // Actualiza el estado con las imágenes obtenidas
      if (result.success && result.data && result.data.imagenes) {
        setData({
          ...data,
          imagenes: result.data.imagenes,
        });
      }
    } catch (err) {
      console.error("Error fetching images:", err);
      setErrorImages(err.message);
    } finally {
      setLoadingImages(false);
    }
  };

  // Cargar imágenes cuando cambia el ID del punto
  useEffect(() => {
    if (punto?.id) {
      fetchPuntoImages();
    }
  }, [punto?.id]);

  // Function to handle adding new images to the data state
  const handleImageSelected = (imageUrl) => {
    // Find the first placeholder image and replace it
    const newImages = [...data.imagenes];
    const placeholderIndex = newImages.findIndex(
      (img) => img === "/placeholder.svg"
    );

    if (placeholderIndex !== -1) {
      newImages[placeholderIndex] = imageUrl;
      setData({
        ...data,
        imagenes: newImages,
      });
    } else {
      // If no placeholders remain, replace the first image
      newImages[0] = imageUrl;
      setData({
        ...data,
        imagenes: newImages,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      // Create a copy of the data with the correct image field
      const submitData = {
        ...data,
        // Use the first non-placeholder image as the main image
        image:
          data.imagenes.find((img) => img !== "/placeholder.svg") ||
          data.imagenes[0],
      };

      const endpoint = punto?.id
        ? `http://localhost:4000/api/puntodeventa/${punto.id}`
        : "http://localhost:4000/api/puntodeventa";

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
        className="fixed inset-0 bg-slate-900/40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal container */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal content */}
        <div className="inline-block align-bottom bg-slate-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Main Content */}
          <div className="p-6">
            {/* Form Fields */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <input
                type="text"
                placeholder="Razón Social"
                value={data.razon}
                onChange={(e) => setData({ ...data, razon: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
              <input
                type="text"
                placeholder="Nombre"
                value={data.nombre}
                onChange={(e) => setData({ ...data, nombre: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
              <input
                type="text"
                placeholder="Dirección"
                value={data.direccion}
                onChange={(e) =>
                  setData({ ...data, direccion: e.target.value })
                }
                className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
              <input
                type="text"
                placeholder="CUIT"
                value={data.cuit}
                onChange={(e) => setData({ ...data, cuit: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
              <input
                type="text"
                placeholder="Persona de Contacto"
                value={data.personaContacto}
                onChange={(e) =>
                  setData({ ...data, personaContacto: e.target.value })
                }
                className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
              <input
                type="text"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={data.telefono}
                onChange={(e) => setData({ ...data, telefono: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
              <input
                type="text"
                placeholder="WhatsApp"
                value={data.whatsapp}
                onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
              <div className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={data.es_online}
                    onChange={(e) =>
                      setData({ ...data, es_online: e.target.checked })
                    }
                    className="form-checkbox h-5 w-5 text-amber-600 rounded focus:ring-amber-600 border-slate-700 bg-slate-800"
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
                      className={`rounded-full px-6 py-1 ${
                        activeTab === "informacion"
                          ? "bg-amber-600 text-white"
                          : "bg-transparent text-white"
                      }`}
                      onClick={() => setActiveTab("informacion")}
                    >
                      Información
                    </button>
                    <button
                      className={`rounded-full px-6 py-1 ${
                        activeTab === "cobros"
                          ? "bg-amber-600 text-white"
                          : "bg-transparent text-white"
                      }`}
                      onClick={() => setActiveTab("cobros")}
                    >
                      Cobros
                    </button>
                  </div>

                  {activeTab === "informacion" && (
                    <div>
                      {/* Salones Habilitados */}
                      <div className="mb-8">
                        <h3 className="text-lg font-light text-amber-600 mb-4">
                          Salones Habilitados
                        </h3>
                        <div className="grid grid-cols-4 gap-4">
                          {data.salonesHabilitados &&
                            data.salonesHabilitados.map((salon, index) => (
                              <div
                                key={index}
                                className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden"
                              >
                                <div className="p-0 h-32 flex items-center justify-center">
                                  <span className="text-2xl font-light italic">
                                    {salon}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Vendedores asignados */}
                      <div>
                        <h3 className="text-lg font-light text-amber-600 mb-4">
                          Vendedores asignados
                        </h3>
                        <div className="grid grid-cols-4 gap-4">
                          {data.vendedoresAsignados &&
                            data.vendedoresAsignados.map((vendedor, index) => (
                              <div
                                key={index}
                                className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden"
                              >
                                <div className="p-4 h-32">
                                  <div className="space-y-1">
                                    <p className="font-medium">
                                      {vendedor.nombre}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      Teléfono: {vendedor.telefono}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      Email: {vendedor.email}
                                    </p>
                                    <p className="text-xs text-gray-400">
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
                      <h3 className="text-lg font-light text-amber-600 mb-4">
                        Información de Cobros
                      </h3>
                      <div className="w-72 mt-4">
                        <div className="space-y-4">
                          <div className="bg-slate-800 border border-slate-700 rounded-lg">
                            <div className="p-4">
                              <h4 className="mb-2">Mercado Pago</h4>
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
                                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
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
                                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="bg-slate-800 border border-slate-700 rounded-lg">
                            <div className="p-4">
                              <h4 className="mb-2">Transferencia</h4>
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
                                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
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
                                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="bg-slate-800 border border-slate-700 rounded-lg">
                            <div className="p-4">
                              <h4 className="mb-2">Efectivo</h4>
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
                    className="bg-amber-600 text-white px-3 py-1 rounded-md text-sm flex-1"
                    onClick={() => setShowImageUploader(true)}
                  >
                    Subir Imagen
                  </button>
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex-1"
                    onClick={() => setShowImageGallery(true)}
                  >
                    Galería
                  </button>
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded-md text-sm flex-1"
                    onClick={fetchPuntoImages}
                    disabled={loadingImages || !punto?.id}
                  >
                    {loadingImages ? "Cargando..." : "Actualizar"}
                  </button>
                </div>

                {errorImages && (
                  <div className="text-red-500 text-sm mb-2">
                    Error: {errorImages}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  {loadingImages ? (
                    <div className="col-span-2 h-32 flex items-center justify-center bg-slate-800 rounded-lg">
                      <p className="text-amber-600">Cargando imágenes...</p>
                    </div>
                  ) : data.imagenes && data.imagenes.length > 0 ? (
                    data.imagenes.map((imagen, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-amber-700/30 rounded-lg overflow-hidden"
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
                    <div className="col-span-2 h-32 flex items-center justify-center bg-slate-800 rounded-lg">
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
          <div className="bg-slate-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-full border border-slate-700 shadow-sm px-4 py-2 bg-slate-800 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
