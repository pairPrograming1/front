"use client";

import { useState, useEffect } from "react";
import {
  X,
  Plus,
  Check,
  AlertCircle,
  Edit,
  Trash2,
  DollarSign,
  UserCheck,
} from "lucide-react";
import Swal from "sweetalert2";
import EventoDetalles from "./EventoDetalles";
import FormularioPrincipal from "./FormularioPrincipal";
import SubtiposManager from "./SubtiposManager";

export default function GestionEntradas({ evento, API_URL, setActiveTab }) {
  const [showModal, setShowModal] = useState(false);
  const [entradaSeleccionada, setEntradaSeleccionada] = useState(null);
  const [formData, setFormData] = useState({
    tipo_entrada: "",
    descripcion: "",
    precio: "",
    cantidad_total: evento.capacidad || 0,
    fecha_inicio_venta: "",
    fecha_fin_venta: "",
    estatus: "disponible",
    subtipos: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [remainingCapacity, setRemainingCapacity] = useState(
    evento.capacidad || 0
  );
  const [entradas, setEntradas] = useState([]);
  const [loadingEntradas, setLoadingEntradas] = useState(false);
  const [errorEntradas, setErrorEntradas] = useState(null);

  useEffect(() => {
    if (evento?.id) {
      fetchEntradas();
    }
  }, [evento?.id]);

  useEffect(() => {
    if (!entradaSeleccionada) {
      // Create mode
      const fetchRemaining = async () => {
        try {
          const response = await fetch(`${API_URL}/api/entrada/${evento.id}`);
          if (!response.ok) throw new Error("Error fetching entries");
          const { data } = await response.json();
          const totalUsed = data.reduce((sum, e) => sum + e.cantidad_total, 0);
          setRemainingCapacity((evento.capacidad || 0) - totalUsed);
          setFormData((prev) => ({
            ...prev,
            cantidad_total: (evento.capacidad || 0) - totalUsed,
            tipo_entrada: "",
            descripcion: "",
            precio: "",
            fecha_inicio_venta: "",
            fecha_fin_venta: "",
            estatus: "disponible",
            subtipos: [],
          }));
        } catch (err) {
          setError("Error calculating remaining capacity: " + err.message);
        }
      };
      fetchRemaining();
    } else {
      // Edit mode
      setFormData({
        tipo_entrada: entradaSeleccionada.tipo_entrada || "",
        descripcion: entradaSeleccionada.descripcion || "",
        precio: parseFloat(entradaSeleccionada.precio) || "",
        cantidad_total:
          entradaSeleccionada.cantidad_total || evento.capacidad || 0,
        fecha_inicio_venta: entradaSeleccionada.fecha_inicio_venta || "",
        fecha_fin_venta: entradaSeleccionada.fecha_fin_venta || "",
        estatus: entradaSeleccionada.estatus || "disponible",
        subtipos: entradaSeleccionada.subtipos || [],
      });
      const fetchRemaining = async () => {
        try {
          const response = await fetch(`${API_URL}/api/entrada/${evento.id}`);
          if (!response.ok) throw new Error("Error fetching entries");
          const { data } = await response.json();
          const totalOthers = data.reduce(
            (sum, e) =>
              e.id !== entradaSeleccionada.id ? sum + e.cantidad_total : sum,
            0
          );
          setRemainingCapacity((evento.capacidad || 0) - totalOthers);
        } catch (err) {
          setError("Error calculating remaining capacity: " + err.message);
        }
      };
      fetchRemaining();
    }
  }, [entradaSeleccionada, evento.id, evento.capacidad, API_URL]);

  const fetchEntradas = async () => {
    setLoadingEntradas(true);
    setErrorEntradas(null);
    try {
      const res = await fetch(`${API_URL}/api/entrada/${evento.id}`);
      if (!res.ok) throw new Error("No se pudieron obtener las entradas");
      const data = await res.json();
      if (data.success && data.data) {
        setEntradas(data.data);
      } else if (Array.isArray(data)) {
        setEntradas(data);
      } else {
        setEntradas([]);
      }
    } catch (err) {
      setErrorEntradas(err.message || "Error al obtener entradas");
    } finally {
      setLoadingEntradas(false);
    }
  };

  const handleEliminarEntrada = async (entradaId) => {
    const result = await Swal.fire({
      title: "¿Eliminar tipo de entrada?",
      text: "Esta acción eliminará todos los subtipos asociados. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setLoadingEntradas(true);
    setErrorEntradas(null);
    try {
      const res = await fetch(`${API_URL}/api/entrada/${entradaId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("No se pudo eliminar la entrada");

      Swal.fire({
        icon: "success",
        title: "Tipo de entrada eliminado",
        text: "El tipo de entrada y sus subtipos han sido eliminados correctamente.",
      });

      fetchEntradas();
    } catch (err) {
      setErrorEntradas(err.message || "Error al eliminar entrada");
    } finally {
      setLoadingEntradas(false);
    }
  };

  const handleEliminarSubtipo = async (subtipoId, subtipoNombre) => {
    const result = await Swal.fire({
      title: "¿Eliminar subtipo?",
      text: `¿Estás seguro de que deseas eliminar el subtipo "${subtipoNombre}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    setLoadingEntradas(true);
    setErrorEntradas(null);
    try {
      const res = await fetch(`${API_URL}/api/entrada/subtipo/${subtipoId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "No se pudo eliminar el subtipo");
      }

      Swal.fire({
        icon: "success",
        title: "Subtipo eliminado",
        text: "El subtipo ha sido eliminado correctamente.",
      });

      fetchEntradas();
    } catch (err) {
      setErrorEntradas(err.message || "Error al eliminar subtipo");
    } finally {
      setLoadingEntradas(false);
    }
  };

  const handleAgregarSubtipo = (entradaId) => {
    // Open modal with existing entry data for adding a subtipo
    const entrada = entradas.find((e) => e.id === entradaId);
    setEntradaSeleccionada(entrada);
    setShowModal(true);
  };

  const handleEditarSubtipo = (entradaId, subtipo) => {
    // Open modal with existing entry data for editing a subtipo
    const entrada = entradas.find((e) => e.id === entradaId);
    setEntradaSeleccionada(entrada);
    setFormData((prev) => ({
      ...prev,
      subtipos: prev.subtipos.map((s) =>
        s.id === subtipo.id ? { ...subtipo } : s
      ),
    }));
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.tipo_entrada.trim()) {
      setError("El tipo de entrada es obligatorio");
      return;
    }

    if (!formData.cantidad_total || formData.cantidad_total <= 0) {
      setError("La cantidad total debe ser mayor que cero");
      return;
    }

    if (formData.cantidad_total > remainingCapacity) {
      setError(
        `La cantidad total no puede exceder el disponible: ${remainingCapacity}`
      );
      return;
    }

    // Validar que la suma de subtipos no exceda la cantidad total
    const totalSubtipos = formData.subtipos.reduce(
      (total, subtipo) => total + parseInt(subtipo.cantidad_disponible || 0),
      0
    );

    if (totalSubtipos > formData.cantidad_total) {
      setError(
        `La suma de los subtipos (${totalSubtipos}) excede la cantidad total (${formData.cantidad_total})`
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const entradaData = {
        tipo_entrada: formData.tipo_entrada,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio) || null,
        cantidad_total: parseInt(formData.cantidad_total),
        fecha_inicio_venta: formData.fecha_inicio_venta || null,
        fecha_fin_venta: formData.fecha_fin_venta || null,
        estatus: formData.estatus,
        eventoId: evento.id,
        subtipos: formData.subtipos,
      };

      if (entradaSeleccionada) {
        entradaData.id = entradaSeleccionada.id;
      }

      const response = await fetch(`${API_URL}/api/entrada/`, {
        method: entradaSeleccionada ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entradaData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al guardar la entrada");
      }

      const result = await response.json();

      Swal.fire({
        title: entradaSeleccionada
          ? "¡Entrada Actualizada!"
          : "¡Entradas Creadas!",
        text:
          result.message ||
          (entradaSeleccionada
            ? "El tipo de entrada ha sido actualizado correctamente."
            : "El tipo de entrada ha sido creado correctamente."),
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#BF8D6B",
        timer: 3000,
        timerProgressBar: true,
      });

      setShowModal(false);
      setEntradaSeleccionada(null);
      fetchEntradas();
    } catch (err) {
      console.error("Error al guardar entrada:", err);
      setError(err.message || "No se pudo guardar la entrada");

      Swal.fire({
        title: "Error",
        text:
          err.message ||
          "No se pudieron guardar las entradas. Intente nuevamente.",
        icon: "error",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#b91c1c",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEntradaSeleccionada(null);
    setFormData({
      tipo_entrada: "",
      descripcion: "",
      precio: "",
      cantidad_total: evento.capacidad || 0,
      fecha_inicio_venta: "",
      fecha_fin_venta: "",
      estatus: "disponible",
      subtipos: [],
    });
    setError(null);
  };

  const handleEditarEntrada = (entrada) => {
    setEntradaSeleccionada(entrada);
    setShowModal(true);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm md:text-base font-semibold text-white mb-2">
        Tipos de Entrada del Evento
      </h3>

      <div className="mb-3">
        <button
          onClick={() => {
            setEntradaSeleccionada(null);
            setShowModal(true);
          }}
          className="px-3 py-2 bg-[#BF8D6B] hover:bg-[#a67454] text-white rounded text-xs flex items-center gap-1"
        >
          <Plus className="h-3 w-3" />
          <span>Agregar Tipo de Entrada</span>
        </button>
      </div>

      {errorEntradas && (
        <div className="p-2 bg-red-900/50 text-red-300 text-xs rounded border border-red-700 mb-2">
          {errorEntradas}
        </div>
      )}

      {loadingEntradas ? (
        <div className="py-4 md:py-6 text-center text-[#BF8D6B]">
          <div className="animate-spin h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 border-2 border-[#BF8D6B] border-t-transparent rounded-full"></div>
          <p className="text-xs">Cargando entradas...</p>
        </div>
      ) : (
        <>
          {entradas.length > 0 ? (
            <div className="space-y-4">
              {entradas.map((entrada) => (
                <div
                  key={entrada.id}
                  className="border border-[#BF8D6B] rounded p-3 bg-gray-900"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-[#BF8D6B] font-medium text-sm">
                        {entrada.tipo_entrada}
                      </h4>
                      <p className="text-gray-400 text-xs">
                        {entrada.descripcion || "Sin descripción"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="text-blue-400 hover:text-blue-300 text-xs"
                        onClick={() => handleEditarEntrada(entrada)}
                        title="Editar entrada"
                      >
                        <Edit className="h-3 w-3" />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-300 text-xs"
                        onClick={() => handleEliminarEntrada(entrada.id)}
                        title="Eliminar entrada"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <span className="text-gray-400">Total: </span>
                      <span className="text-white">
                        {entrada.cantidad_total}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Disponible: </span>
                      <span className="text-white">
                        {entrada.cantidad_real || entrada.cantidad_total}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Precio: </span>
                      <span className="text-white">
                        {entrada.subtipos && entrada.subtipos.length > 0
                          ? (() => {
                              const preciosValidos = entrada.subtipos
                                .map((subtipo) => subtipo.precio)
                                .filter(
                                  (precio) =>
                                    typeof precio === "number" && !isNaN(precio)
                                );
                              if (preciosValidos.length === 0)
                                return "N/A (Subtipos)";
                              const minPrecio = Math.min(...preciosValidos);
                              const maxPrecio = Math.max(...preciosValidos);
                              return minPrecio === maxPrecio
                                ? `$${minPrecio}`
                                : `$${minPrecio} - $${maxPrecio}`;
                            })()
                          : entrada.precio
                          ? `$${entrada.precio}`
                          : "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Estatus: </span>
                      <span
                        className={`${
                          entrada.estatus === "disponible"
                            ? "text-green-400"
                            : entrada.estatus === "agotado"
                            ? "text-red-400"
                            : entrada.estatus === "suspendido"
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }`}
                      >
                        {entrada.estatus}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Subtipos: </span>
                      <span className="text-white">
                        {entrada.subtipos?.length || 0}
                      </span>
                    </div>
                  </div>

                  {entrada.subtipos && entrada.subtipos.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-gray-400 text-xs font-medium mb-2">
                        Subtipos:
                      </h5>
                      <div className="space-y-2">
                        {entrada.subtipos.map((subtipo) => (
                          <div
                            key={subtipo.id}
                            className="bg-gray-800 p-2 rounded text-xs"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="text-white font-medium">
                                  {subtipo.nombre}
                                </div>
                                {subtipo.descripcion && (
                                  <div className="text-gray-400 text-xs mt-1">
                                    {subtipo.descripcion}
                                  </div>
                                )}
                              </div>
                              {/* <div className="flex gap-1">
                                <button
                                  className="text-blue-400 hover:text-blue-300"
                                  onClick={() =>
                                    handleEditarSubtipo(entrada.id, subtipo)
                                  }
                                  title="Editar subtipo"
                                >
                                  <Edit className="h-3 w-3" />
                                </button>
                                <button
                                  className="text-red-400 hover:text-red-300"
                                  onClick={() =>
                                    handleEliminarSubtipo(
                                      subtipo.id,
                                      subtipo.nombre
                                    )
                                  }
                                  title="Eliminar subtipo"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div> */}
                            </div>
                            <div className="grid grid-cols-2 gap-1 mt-2">
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3 text-[#BF8D6B]" />
                                <span>${subtipo.precio}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">
                                  Disponible:{" "}
                                </span>
                                <span className="text-white">
                                  {subtipo.cantidad_disponible}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400">
                                  Vendidas:{" "}
                                </span>
                                <span className="text-white">
                                  {subtipo.cantidad_vendida || 0}
                                </span>
                              </div>
                              {subtipo.edad_minima && (
                                <div className="flex items-center gap-1">
                                  <UserCheck className="h-3 w-3 text-[#BF8D6B]" />
                                  <span>
                                    Edad: {subtipo.edad_minima}
                                    {subtipo.edad_maxima
                                      ? `-${subtipo.edad_maxima}`
                                      : "+"}
                                  </span>
                                </div>
                              )}
                              {subtipo.requiere_documentacion && (
                                <div className="flex items-center gap-1 col-span-2 text-yellow-400">
                                  <AlertCircle className="h-3 w-3" />
                                  <span>Requiere documentación</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-4 text-center text-gray-400 border border-dashed border-gray-600 rounded text-xs md:text-sm">
              No hay tipos de entrada para este evento.
            </div>
          )}
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-[#1a1a1a] rounded-lg p-3 md:p-4 w-full max-w-xs md:max-w-3xl max-h-[95vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-3 md:mb-3">
              <h2 className="text-base md:text-lg font-bold text-white">
                {entradaSeleccionada
                  ? "Editar Tipo de Entrada"
                  : "Crear Tipo de Entrada"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white p-1 md:p-0"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>

            <EventoDetalles evento={evento} />

            {error && (
              <div className="p-2 md:p-2 bg-red-900/50 text-red-300 text-xs md:text-sm rounded border border-red-700 mb-3 md:mb-3 flex items-start">
                <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormularioPrincipal
                formData={formData}
                handleChange={handleChange}
                evento={{ ...evento, remainingCapacity }}
              />

              <SubtiposManager
                formData={formData}
                setFormData={setFormData}
                evento={evento}
              />

              <div className="pt-4 border-t border-[#BF8D6B]">
                <button
                  type="submit"
                  className="w-full font-bold py-2 md:py-2 px-2 rounded bg-[#BF8D6B] text-white text-xs md:text-sm flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    "Guardando..."
                  ) : (
                    <>
                      <Check className="h-3 w-3 md:h-4 md:w-4" />
                      <span>
                        {entradaSeleccionada
                          ? "Actualizar Tipo de Entrada"
                          : "Crear Tipo de Entrada"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-end mt-3">
        <button
          type="button"
          onClick={() => setActiveTab("info")}
          className="px-2 py-1 md:px-3 md:py-1 text-[#BF8D6B] hover:text-[#a67454] border border-[#BF8D6B] rounded text-xs transition-colors"
        >
          Volver
        </button>
      </div>
    </div>
  );
}
