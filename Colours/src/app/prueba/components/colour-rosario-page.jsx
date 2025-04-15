"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ColourRosarioPage() {
  const [activeTab, setActiveTab] = useState("informacion");

  // Estado para almacenar los datos traídos
  const [data, setData] = useState({
    direccion: "",
    cuit: "",
    personaContacto: "",
    email: "",
    whatsapp: "",
    salonesHabilitados: [],
    vendedoresAsignados: [],
    imagenes: [],
    tiposCobro: {
      mercadoPago: {
        apiKey: "",
        secretId: "",
      },
      transferencia: {
        cbu: "",
        entidadCobro: "",
      },
    },
  });

  // Simulando la obtención de datos (esto normalmente se haría con fetch o axios)
  useEffect(() => {
    const fetchData = async () => {
      // Simulación de una llamada a la API o base de datos
      const fetchedData = {
        direccion: "Av. Siempre Viva 123",
        cuit: "20-12345678-9",
        personaContacto: "Juan Pérez",
        email: "juan@example.com",
        whatsapp: "+5491123456789",
        salonesHabilitados: ["aires", "salon 2"],
        vendedoresAsignados: [
          {
            nombre: "Uriel Casado",
            telefono: "1122334455",
            email: "uriel@example.com",
            whatsapp: "+5491122334455",
          },
        ],
        imagenes: [
          "/placeholder.svg",
          "/placeholder.svg",
          "/placeholder.svg",
          "/placeholder.svg",
        ],
        tiposCobro: {
          mercadoPago: {
            apiKey: "API_KEY_EXAMPLE",
            secretId: "SECRET_ID_EXAMPLE",
          },
          transferencia: {
            cbu: "1234567890123456789012",
            entidadCobro: "Banco Ejemplo",
          },
        },
      };
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900/40 text-white">
      {/* Main Content */}
      <div className="p-6">
        {/* Form Fields */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Dirección"
            value={data.direccion}
            onChange={(e) => setData({ ...data, direccion: e.target.value })}
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
            placeholder="WhatsApp"
            value={data.whatsapp}
            onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
            className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
          />
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
                      {data.salonesHabilitados.map((salon, index) => (
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
                      {data.vendedoresAsignados.map((vendedor, index) => (
                        <div
                          key={index}
                          className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden"
                        >
                          <div className="p-4 h-32">
                            <div className="space-y-1">
                              <p className="font-medium">{vendedor.nombre}</p>
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
                  <p className="text-gray-400">
                    Contenido de la pestaña de cobros
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-72 ml-6">
            <div className="border border-dashed border-amber-600/50 rounded-lg p-4 mb-4 flex items-center justify-center h-40">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <p className="text-xs text-gray-400">Agregar Imagen</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {data.imagenes.map((imagen, index) => (
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
              ))}
            </div>
          </div>
        </div>

        {/* Tipos de Cobro */}
        <div className="w-72 mt-4">
          <h3 className="text-lg font-light text-amber-600 mb-4">
            Tipos de Cobro
          </h3>

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
                    value={data.tiposCobro.transferencia.entidadCobro}
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
    </div>
  );
}
