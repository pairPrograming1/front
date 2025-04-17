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
} from "lucide-react";
import PuntoModal from "../components/punto-modal";
import EditarModal from "../components/editar-modal";
import EdicionCompleta from "../components/edicion-completa";
import Header from "../components/header";
import Swal from "sweetalert2";

export default function PuntosDeVenta() {
  const [showModal, setShowModal] = useState(false);
  const [puntos, setPuntos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [verInactivos, setVerInactivos] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [puntoAEditar, setPuntoAEditar] = useState(null);
  const [showEdicionCompleta, setShowEdicionCompleta] = useState(false);
  const [selectedPunto, setSelectedPunto] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPuntos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/puntodeventa");
        if (!response.ok)
          throw new Error("Error al obtener los puntos de venta");
        const data = await response.json();
        if (data.success) {
          setPuntos(data.data);
        } else {
          throw new Error(data.message || "Error en los datos recibidos");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching puntos de venta:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPuntos();
  }, []);

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filteredPuntos = puntos.filter((p) => {
    const searchText = removeAccents(searchTerm.toLowerCase());
    const matchSearch =
      removeAccents(p.nombre.toLowerCase()).includes(searchText) ||
      removeAccents(p.razon.toLowerCase()).includes(searchText) ||
      removeAccents(p.direccion.toLowerCase()).includes(searchText) ||
      removeAccents(p.email.toLowerCase()).includes(searchText) ||
      p.cuit.toString().includes(searchTerm) ||
      p.telefono.toString().includes(searchTerm);

    const matchActivo = verInactivos ? !p.isActive : p.isActive;

    return matchSearch && matchActivo;
  });

  const handleAddPunto = async (newPunto) => {
    try {
      const response = await fetch("http://localhost:4000/api/puntodeventa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPunto),
      });

      if (!response.ok) throw new Error("Error al crear el punto de venta");

      await refreshPuntos();
      setShowModal(false);

      Swal.fire({
        icon: "success",
        title: "Punto creado",
        text: "El punto de venta fue creado correctamente",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear punto",
        text: error.message || "Hubo un error al crear el punto de venta",
      });
    }
  };

  const refreshPuntos = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/puntodeventa");
      const data = await res.json();
      if (data.success) {
        setPuntos(data.data);
      }
    } catch (error) {
      console.error("Error refreshing puntos:", error);
    }
  };

  const handleUpdatePunto = async () => {
    await refreshPuntos();
  };

  const handleDeletePunto = async (id) => {
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
        const response = await fetch(
          `http://localhost:4000/api/puntodeventa/delete/${id}`,
          { method: "DELETE" }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Error al eliminar el punto de venta"
          );
        }

        Swal.fire("Eliminado", data.message, "success");
        await refreshPuntos();
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const handleTogglePuntoStatus = async (id, isCurrentlyActive) => {
    const newStatus = !isCurrentlyActive;
    const actionText = newStatus ? "activar" : "desactivar";

    const confirmResult = await Swal.fire({
      title: `¿${newStatus ? "Activar" : "Desactivar"} punto de venta?`,
      text: `Estás a punto de ${actionText} este punto de venta.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, ${actionText}`,
      cancelButtonText: "Cancelar",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost:4000/api/puntodeventa/soft-delete/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || `Error al ${actionText} el punto`);
      }

      setPuntos((prevPuntos) =>
        prevPuntos.map((punto) =>
          punto.id === id ? { ...punto, isActive: newStatus } : punto
        )
      );

      await Swal.fire({
        title: `Punto ${newStatus ? "activado" : "desactivado"}`,
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

  const totalPages = Math.ceil(filteredPuntos.length / itemsPerPage);
  const currentItems = filteredPuntos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="p-6">
        <Header title="Puntos de Venta" />
        <div className="flex justify-center items-center h-64">
          <p>Cargando puntos de venta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Header title="Puntos de Venta" />
        <div className="alert alert-error">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2">
      <Header title="Puntos de Venta" />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="relative w-full sm:w-2/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Buscar por nombre, razón social, dirección, email, CUIT o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            className={`btn ${
              verInactivos ? "btn-warning" : "btn-outline"
            } flex items-center gap-2 w-full sm:w-auto`}
            onClick={() => setVerInactivos((prev) => !prev)}
          >
            {verInactivos ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            {verInactivos ? "Ver activos" : "Ver inactivos"}
          </button>

          <button
            className="btn btn-primary flex items-center gap-2 w-full sm:w-auto"
            onClick={() => setShowModal(true)}
          >
            <Plus className="h-4 w-4" />
            Agregar
          </button>
        </div>
      </div>

      <div className="table-container overflow-x-auto">
        <table className="table min-w-full">
          <thead>
            <tr>
              <th>Razón Social</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>CUIT</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th className="w-48">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((punto) => (
              <tr
                key={punto.id}
                className={`cursor-pointer ${
                  !punto.isActive ? "opacity-70 bg-gray-50" : ""
                }`}
                onClick={() => {
                  setSelectedPunto(punto);
                  setShowEdicionCompleta(true);
                }}
              >
                <td>{punto.razon}</td>
                <td>{punto.nombre}</td>
                <td>{punto.direccion}</td>
                <td>{punto.cuit}</td>
                <td>{punto.email}</td>
                <td>{punto.telefono}</td>
                <td>{punto.es_online ? "Online" : "Físico"}</td>
                <td>
                  <span
                    className={`badge ${
                      punto.isActive ? "badge-success" : "badge-error"
                    }`}
                  >
                    {punto.isActive ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-outline btn-primary p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPuntoAEditar(punto);
                      }}
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    <button
                      className={`btn btn-sm btn-outline ${
                        punto.isActive ? "btn-warning" : "btn-success"
                      } p-1`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePuntoStatus(punto.id, punto.isActive);
                      }}
                      title={punto.isActive ? "Desactivar" : "Activar"}
                    >
                      {punto.isActive ? (
                        <Archive className="h-4 w-4" />
                      ) : (
                        <Power className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      className="btn btn-sm btn-outline btn-error p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePunto(punto.id);
                      }}
                      title="Eliminar permanentemente"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination mt-4 flex justify-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`pagination-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              className="pagination-item"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {showModal && (
        <PuntoModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddPunto}
        />
      )}

      {puntoAEditar && (
        <EditarModal
          punto={puntoAEditar}
          onClose={() => setPuntoAEditar(null)}
          onUpdate={handleUpdatePunto}
        />
      )}

      {showEdicionCompleta && selectedPunto && (
        <EdicionCompleta
          punto={selectedPunto}
          onClose={() => {
            setShowEdicionCompleta(false);
            setSelectedPunto(null);
          }}
          onUpdate={() => {
            refreshPuntos();
            setShowEdicionCompleta(false);
            setSelectedPunto(null);
          }}
        />
      )}
    </div>
  );
}
