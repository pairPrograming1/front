"use client";

import { useState } from "react";
import {
  X,
  AlertCircle,
  DollarSign,
  Tag,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import Swal from "sweetalert2";
import apiUrls from "@/app/components/utils/apiConfig";

const API_URL = apiUrls;

export default function EntradasModal({ evento, onClose }) {
  const [formData, setFormData] = useState({
    tipo_entrada: "",
    descripcion: "",
    cantidad_total: evento.capacidad || 0,
    fecha_inicio_venta: "",
    fecha_fin_venta: "",
    estatus: "disponible",
    subtipos: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSubtipoForm, setShowSubtipoForm] = useState(false);
  const [currentSubtipo, setCurrentSubtipo] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad_disponible: "",
    edad_minima: "",
    edad_maxima: "",
    requiere_documentacion: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubtipoChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCurrentSubtipo({
      ...currentSubtipo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addSubtipo = () => {
    if (
      !currentSubtipo.nombre ||
      !currentSubtipo.precio ||
      !currentSubtipo.cantidad_disponible
    ) {
      setError("Nombre, precio y cantidad son obligatorios para el subtipo");
      return;
    }

    const nuevoSubtipo = {
      ...currentSubtipo,
      precio: parseFloat(currentSubtipo.precio),
      cantidad_disponible: parseInt(currentSubtipo.cantidad_disponible),
      edad_minima: currentSubtipo.edad_minima
        ? parseInt(currentSubtipo.edad_minima)
        : null,
      edad_maxima: currentSubtipo.edad_maxima
        ? parseInt(currentSubtipo.edad_maxima)
        : null,
    };

    setFormData({
      ...formData,
      subtipos: [...formData.subtipos, nuevoSubtipo],
    });

    // Resetear formulario de subtipo
    setCurrentSubtipo({
      nombre: "",
      descripcion: "",
      precio: "",
      cantidad_disponible: "",
      edad_minima: "",
      edad_maxima: "",
      requiere_documentacion: false,
    });

    setShowSubtipoForm(false);
    setError(null);
  };

  const removeSubtipo = (index) => {
    const nuevosSubtipos = [...formData.subtipos];
    nuevosSubtipos.splice(index, 1);
    setFormData({
      ...formData,
      subtipos: nuevosSubtipos,
    });
  };

  const calculateAvailableForGeneral = () => {
    const totalSubtipos = formData.subtipos.reduce(
      (total, subtipo) => total + parseInt(subtipo.cantidad_disponible),
      0
    );
    return formData.cantidad_total - totalSubtipos;
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

    // Validar que la suma de subtipos no exceda la cantidad total
    const totalSubtipos = formData.subtipos.reduce(
      (total, subtipo) => total + parseInt(subtipo.cantidad_disponible),
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
        cantidad_total: parseInt(formData.cantidad_total),
        fecha_inicio_venta: formData.fecha_inicio_venta || null,
        fecha_fin_venta: formData.fecha_fin_venta || null,
        estatus: formData.estatus,
        eventoId: evento.id,
        subtipos: formData.subtipos,
      };

      const response = await fetch(`${API_URL}/api/entrada/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entradaData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear la entrada");
      }

      const result = await response.json();

      Swal.fire({
        title: "¡Entradas Creadas!",
        text: result.message,
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#BF8D6B",
        timer: 3000,
        timerProgressBar: true,
      });

      onClose();
    } catch (err) {
      console.error("Error al crear entrada:", err);
      setError(err.message || "No se pudo crear la entrada");

      Swal.fire({
        title: "Error",
        text:
          err.message ||
          "No se pudieron crear las entradas. Intente nuevamente.",
        icon: "error",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#b91c1c",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-2 md:p-4 ">
      <div className="bg-[#1a1a1a] rounded-lg p-3 md:p-4 w-full max-w-xs md:max-w-3xl max-h-[95vh] overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center mb-3 md:mb-3">
          <h2 className="text-base md:text-lg font-bold text-white">
            Crear Tipo de Entrada
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 md:p-0"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        <div className="mb-3 p-2 bg-transparent border border-[#BF8D6B] rounded text-xs">
          <h3 className="text-[#BF8D6B] font-medium">Detalles del Evento</h3>
          <p className="text-white mt-1">{evento.nombre}</p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-gray-300">
            <div>
              Capacidad:{" "}
              <span className="text-[#BF8D6B]">
                {evento.capacidad || "Sin límite"}
              </span>
            </div>
            <div>
              Salón:{" "}
              <span className="text-[#BF8D6B]">
                {evento.salon || "Sin asignar"}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-2 md:p-2 bg-red-900/50 text-red-300 text-xs md:text-sm rounded border border-red-700 mb-3 md:mb-3 flex items-start">
            <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <label className="block text-xs md:text-sm text-white mb-1">
                Tipo de Entrada *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="tipo_entrada"
                  value={formData.tipo_entrada}
                  onChange={handleChange}
                  className="w-full p-2 md:p-2 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-xs md:text-sm pl-8"
                  placeholder="Ej: Vip, Estudiante, General"
                  required
                />
                {/* <Tag className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#BF8D6B] h-3 w-3 md:h-4 md:w-4" /> */}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs md:text-sm text-white mb-1">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="w-full p-2 md:p-2 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-xs md:text-sm"
                placeholder="Descripción del tipo de entrada"
                rows="2"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm text-white mb-1">
                Cantidad Total *
              </label>
              <input
                type="number"
                name="cantidad_total"
                value={formData.cantidad_total}
                onChange={handleChange}
                className="w-full p-2 md:p-2 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-xs md:text-sm"
                min="1"
                max={evento.capacidad}
                required
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm text-white mb-1">
                Estatus
              </label>
              <select
                name="estatus"
                value={formData.estatus}
                onChange={handleChange}
                className="w-full p-2 md:p-2 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-xs md:text-sm"
              >
                <option value="disponible">Disponible</option>
                <option value="suspendido">Suspendido</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs md:text-sm text-white mb-1">
                Fecha Inicio Venta
              </label>
              <input
                type="datetime-local"
                name="fecha_inicio_venta"
                value={formData.fecha_inicio_venta}
                onChange={handleChange}
                className="w-full p-2 md:p-2 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-xs md:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm text-white mb-1">
                Fecha Fin Venta
              </label>
              <input
                type="datetime-local"
                name="fecha_fin_venta"
                value={formData.fecha_fin_venta}
                onChange={handleChange}
                className="w-full p-2 md:p-2 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-xs md:text-sm"
              />
            </div>
          </div>

          {/* Sección de Subtipos */}
          <div className="border-t border-[#BF8D6B] pt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm md:text-base font-bold text-white">
                Subtipos de Entrada
              </h3>
              <button
                type="button"
                onClick={() => setShowSubtipoForm(!showSubtipoForm)}
                className="flex items-center text-[#BF8D6B] text-xs md:text-sm"
              >
                {showSubtipoForm ? (
                  <>
                    <Minus className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    Ocultar formulario
                  </>
                ) : (
                  <>
                    <Plus className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    Agregar Subtipo
                  </>
                )}
              </button>
            </div>

            {showSubtipoForm && (
              <div className="bg-[#2a2a2a] p-3 rounded mb-3">
                <h4 className="text-[#BF8D6B] text-sm font-medium mb-2">
                  Nuevo Subtipo
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="md:col-span-2">
                    <label className="block text-xs text-white mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={currentSubtipo.nombre}
                      onChange={handleSubtipoChange}
                      className="w-full p-2 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-xs"
                      placeholder="Ej: Cena Mayor, Cena Menor"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white mb-1">
                      Precio *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="precio"
                        value={currentSubtipo.precio}
                        onChange={handleSubtipoChange}
                        className="w-full p-2 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-xs pl-8"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#BF8D6B] h-3 w-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white mb-1">
                      Cantidad *
                    </label>
                    <input
                      type="number"
                      name="cantidad_disponible"
                      value={currentSubtipo.cantidad_disponible}
                      onChange={handleSubtipoChange}
                      className="w-full p-2 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-xs"
                      placeholder="0"
                      min="1"
                      max={calculateAvailableForGeneral()}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white mb-1">
                      Edad Mínima
                    </label>
                    <input
                      type="number"
                      name="edad_minima"
                      value={currentSubtipo.edad_minima}
                      onChange={handleSubtipoChange}
                      className="w-full p-2 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-xs"
                      placeholder="Ej: 18"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white mb-1">
                      Edad Máxima
                    </label>
                    <input
                      type="number"
                      name="edad_maxima"
                      value={currentSubtipo.edad_maxima}
                      onChange={handleSubtipoChange}
                      className="w-full p-2 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-xs"
                      placeholder="Ej: 65"
                      min="0"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs text-white mb-1">
                      Descripción
                    </label>
                    <textarea
                      name="descripcion"
                      value={currentSubtipo.descripcion}
                      onChange={handleSubtipoChange}
                      className="w-full p-2 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-xs"
                      placeholder="Descripción del subtipo"
                      rows="2"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center">
                    <input
                      type="checkbox"
                      id="requiere_documentacion"
                      name="requiere_documentacion"
                      checked={currentSubtipo.requiere_documentacion}
                      onChange={handleSubtipoChange}
                      className="mr-2"
                    />
                    <label
                      htmlFor="requiere_documentacion"
                      className="text-xs text-white"
                    >
                      Requiere documentación
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="button"
                      onClick={addSubtipo}
                      className="w-full py-1 px-2 rounded bg-[#BF8D6B] text-white text-xs flex items-center justify-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      Agregar Subtipo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Lista de subtipos agregados */}
            {formData.subtipos.length > 0 ? (
              <div className="space-y-2">
                {formData.subtipos.map((subtipo, index) => (
                  <div
                    key={index}
                    className="bg-[#2a2a2a] p-2 rounded flex justify-between items-center"
                  >
                    <div>
                      <div className="text-white text-sm font-medium">
                        {subtipo.nombre}
                      </div>
                      <div className="text-[#BF8D6B] text-xs">
                        ${subtipo.precio} - {subtipo.cantidad_disponible}{" "}
                        unidades
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSubtipo(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400 text-xs italic p-2 text-center">
                No hay subtipos agregados. La entrada tendrá disponibilidad
                general.
              </div>
            )}

            {/* Resumen de disponibilidad */}
            <div className="mt-3 p-2 bg-[#BF8D6B]/20 border border-[#BF8D6B] rounded text-[#BF8D6B] text-xs">
              <p>
                <strong>Resumen de disponibilidad:</strong>
              </p>
              <p>Cantidad total: {formData.cantidad_total}</p>
              <p>
                Asignado a subtipos:{" "}
                {formData.subtipos.reduce(
                  (total, subtipo) =>
                    total + parseInt(subtipo.cantidad_disponible),
                  0
                )}
              </p>
              <p>
                Disponible para venta general: {calculateAvailableForGeneral()}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#BF8D6B]">
            <button
              type="submit"
              className="w-full font-bold py-2 md:py-2 px-2 rounded bg-[#BF8D6B] text-white text-xs md:text-sm flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                "Creando..."
              ) : (
                <>
                  <Check className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Crear Tipo de Entrada</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
