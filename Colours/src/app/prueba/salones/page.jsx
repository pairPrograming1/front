"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  ChevronRight,
  Eye,
  EyeOff,
  Trash2,
  Power,
  Archive,
  Edit,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
} from "lucide-react";
import SalonModal from "../components/salon-modal";
import SalonEditarModal from "../components/salon-editar-modal";
import Header from "../components/header";
import Swal from "sweetalert2";
import apiUrls from "@/app/components/utils/apiConfig";

const API_URL = apiUrls.production;

export default function Salones() {
  const [showModal, setShowModal] = useState(false);
  const [salones, setSalones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [verInactivos, setVerInactivos] = useState(false);
  const [salonAEditar, setSalonAEditar] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSalon, setExpandedSalon] = useState(null);

  const itemsPerPage = 10;

  const removeAccents = (str) => {
    return str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
  };

  const fetchSalones = async (
    pageNum = 1,
    limitNum = 10,
    search = "",
    includeInactive = false
  ) => {
    try {
      setLoading(true);

      // Construir URL con parámetros de consulta
      let url = `${API_URL}/api/salon?page=${pageNum}&limit=${limitNum}`;

      // Añadir término de búsqueda si existe
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      // Añadir parámetro para incluir eliminados según el estado de verInactivos
      if (includeInactive) {
        url += "&includeDeleted=true";
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Verificar si la respuesta incluye información de paginación
      if (data.pagination) {
        // Actualizar el estado con la información de paginación
        setTotalPages(data.pagination.totalPages);
        setCurrentPage(data.pagination.page);

        // Guardar los salones desde data.data
        setSalones(Array.isArray(data.data) ? data.data : []);
      } else {
        // Manejar respuestas antiguas o sin paginación
        const salonesData = Array.isArray(data)
          ? data
          : data.data
          ? data.data
          : data.salones
          ? data.salones
          : [data];

        setSalones(salonesData);

        // Calcular paginación manual si la API no la proporciona
        setTotalPages(Math.ceil(salonesData.length / limitNum));
      }
    } catch (err) {
      setError(err.message);
      setSalones([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalones(currentPage, itemsPerPage, searchTerm, verInactivos);
  }, [verInactivos]);

  const refreshSalones = async () => {
    await fetchSalones(currentPage, itemsPerPage, searchTerm, verInactivos);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchSalones(newPage, itemsPerPage, searchTerm, verInactivos);
  };

  const handleAddSalon = async (newSalon) => {
    try {
      const response = await fetch(`${API_URL}/api/salon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSalon),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      await refreshSalones();
      setShowModal(false);

      Swal.fire({
        icon: "success",
        title: "Salón creado",
        text: "El salón fue creado correctamente",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear salón",
        text: error.message || "Hubo un error al crear el salón",
      });
    }
  };

  const handleUpdateSalon = async (updated) => {
    if (updated) {
      await refreshSalones();
      Swal.fire({
        icon: "success",
        title: "Salón actualizado",
        text: "El salón fue actualizado correctamente",
        timer: 2000,
        showConfirmButton: false,
      });
    }
    setSalonAEditar(null);
  };

  const handleDeleteSalon = async (id) => {
    const confirmResult = await Swal.fire({
      title: "¿Eliminar permanentemente?",
      text: "Esta acción no se puede deshacer. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/api/salon/physical/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Error al eliminar el salón");
        }

        Swal.fire("Eliminado", data.message, "success");
        await refreshSalones();
      } catch (error) {
        console.error("Error al eliminar:", error);
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const handleToggleSalonStatus = async (id, isCurrentlyActive) => {
    const newStatus = !isCurrentlyActive;
    const actionText = newStatus ? "activar" : "desactivar";

    const confirmResult = await Swal.fire({
      title: `¿${newStatus ? "Activar" : "Desactivar"} salón?`,
      text: `Estás a punto de ${actionText} este salón.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, ${actionText}`,
      cancelButtonText: "Cancelar",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(`${API_URL}/api/salon/toggle-status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || `Error al ${actionText} el salón`);
      }

      // Actualizar la lista en lugar de solo actualizar el estado local
      await refreshSalones();

      await Swal.fire({
        title: `Salón ${newStatus ? "activado" : "desactivado"}`,
        text: data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    // Debounce para buscar después de que el usuario deje de escribir
    const searchValue = e.target.value;
    const handler = setTimeout(() => {
      fetchSalones(1, itemsPerPage, searchValue, verInactivos);
    }, 300);
    return () => clearTimeout(handler);
  };

  const toggleVerInactivos = () => {
    setVerInactivos((prev) => !prev);
    setCurrentPage(1); // Resetear a la primera página al cambiar el filtro
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <Header title="Salones" />
        <div className="flex justify-center items-center h-64">
          <p>Cargando salones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <Header title="Salones" />
        <div className="alert alert-error">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <Header title="Salones" />

      {/* Filtros y búsqueda */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="   Buscar por nombre, contacto, email, CUIT o WhatsApp..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          <button
            className={`btn ${
              verInactivos ? "btn-warning" : "btn-outline"
            } flex items-center gap-2 w-full md:w-auto`}
            onClick={toggleVerInactivos}
          >
            {verInactivos ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            {verInactivos ? "Ver activos" : "Ver inactivos"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            className="btn btn-primary flex items-center gap-2 w-full md:w-auto"
            onClick={() => setShowModal(true)}
          >
            <Plus className="h-4 w-4" />
            Agregar salón
          </button>
        </div>
      </div>

      {/* Tabla de salones */}
      <div className="overflow-x-auto">
        {/* Vista de escritorio */}
        <div className="hidden md:block">
          <table className="table min-w-full">
            <thead>
              <tr>
                <th>Salón</th>
                <th>CUIT</th>
                <th>Nombre del Contacto</th>
                <th>Email</th>
                <th>WhatsApp</th>
                <th>Capacidad</th>
                <th>Estado</th>
                <th className="w-48">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {salones.length > 0 ? (
                salones.map((salon) => {
                  const isActive = salon.isActive ?? salon.estatus ?? true;

                  return (
                    <tr
                      key={salon.id || salon._id || salon.Id}
                      className={`cursor-pointer ${
                        !isActive ? "opacity-70 bg-gray-50" : ""
                      }`}
                    >
                      <td>{salon.salon || salon.nombre}</td>
                      <td>{salon.cuit}</td>
                      <td>{salon.contacto || salon.nombre}</td>
                      <td>{salon.email}</td>
                      <td>{salon.whatsapp}</td>
                      <td>{salon.capacidad || "N/A"}</td>
                      <td>
                        <span
                          className={`badge ${
                            isActive ? "badge-success" : "badge-error"
                          }`}
                        >
                          {isActive ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-sm btn-outline btn-primary p-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSalonAEditar(salon);
                            }}
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            className={`btn btn-sm btn-outline ${
                              isActive ? "btn-warning" : "btn-success"
                            } p-1`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleSalonStatus(
                                salon.id || salon._id || salon.Id,
                                isActive
                              );
                            }}
                            title={isActive ? "Desactivar" : "Activar"}
                          >
                            {isActive ? (
                              <Archive className="h-4 w-4" />
                            ) : (
                              <Power className="h-4 w-4" />
                            )}
                          </button>

                          <button
                            className="btn btn-sm btn-outline btn-error p-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSalon(
                                salon.id || salon._id || salon.Id
                              );
                            }}
                            title="Eliminar permanentemente"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No se encontraron salones
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Vista móvil */}
        <div className="md:hidden space-y-4">
          {salones.length > 0 ? (
            salones.map((salon) => {
              const isActive = salon.isActive ?? salon.estatus ?? true;

              return (
                <div
                  key={salon.id || salon._id || salon.Id}
                  className={`border rounded-lg p-4 ${
                    !isActive ? "opacity-70 bg-gray-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">
                        {salon.salon || salon.nombre}
                      </div>
                      <div className="text-sm text-gray-500">
                        {salon.contacto || salon.nombre}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setExpandedSalon(
                          expandedSalon === (salon.id || salon._id || salon.Id)
                            ? null
                            : salon.id || salon._id || salon.Id
                        )
                      }
                      className="text-gray-500"
                    >
                      {expandedSalon === (salon.id || salon._id || salon.Id) ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </button>
                  </div>

                  {expandedSalon === (salon.id || salon._id || salon.Id) && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">CUIT:</span>
                        <span>{salon.cuit}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Email:</span>
                        <span>{salon.email}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">WhatsApp:</span>
                        <span>{salon.whatsapp}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Capacidad:</span>
                        <span>{salon.capacidad || "N/A"}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Estado:</span>
                        <span
                          className={`badge ${
                            isActive ? "badge-success" : "badge-error"
                          }`}
                        >
                          {isActive ? "Activo" : "Inactivo"}
                        </span>
                      </div>

                      <div className="flex justify-between pt-2">
                        <button
                          className="btn btn-sm btn-outline btn-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSalonAEditar(salon);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className={`btn btn-sm btn-outline ${
                            isActive ? "btn-warning" : "btn-success"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSalonStatus(
                              salon.id || salon._id || salon.Id,
                              isActive
                            );
                          }}
                        >
                          {isActive ? (
                            <Archive className="h-4 w-4" />
                          ) : (
                            <Power className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          className="btn btn-sm btn-outline btn-error"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSalon(
                              salon.id || salon._id || salon.Id
                            );
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-4 border rounded-lg">
              No se encontraron salones
            </div>
          )}
        </div>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="pagination mt-6 flex justify-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${
                currentPage === index + 1 ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              className="btn btn-sm btn-outline"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Modales */}
      {showModal && (
        <SalonModal
          onClose={() => setShowModal(false)}
          onAddSalon={handleAddSalon}
          API_URL={`${API_URL}/api/salon`}
        />
      )}

      {salonAEditar && (
        <SalonEditarModal
          salon={salonAEditar}
          onClose={handleUpdateSalon}
          API_URL={`${API_URL}/api/salon`}
        />
      )}
    </div>
  );
}
