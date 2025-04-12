"use client";

import { useState, useEffect } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";
import PuntoModal from "../components/punto-modal";
import Header from "../components/header";
import Swal from "sweetalert2";

export default function PuntosDeVenta() {
  const [showModal, setShowModal] = useState(false);
  const [puntos, setPuntos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch puntos de venta from API
  useEffect(() => {
    const fetchPuntos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/puntodeventa");
        if (!response.ok) {
          throw new Error("Error al obtener los puntos de venta");
        }
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

  const handleAddPunto = async (newPunto) => {
    try {
      const puntoData = {
        razon: newPunto.razon,
        nombre: newPunto.nombre,
        direccion: newPunto.direccion,
        telefono: newPunto.telefono,
        cuit: newPunto.cuit,
        email: newPunto.email,
        es_online: newPunto.es_online,
      };

      const response = await fetch("http://localhost:4000/api/puntodeventa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(puntoData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el punto de venta");
      }

      // Refresh the list after successful creation
      const refreshResponse = await fetch(
        "http://localhost:4000/api/puntodeventa"
      );
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        if (refreshData.success) {
          setPuntos(refreshData.data);
        }
      }

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

  // Función para borrado físico
  const handleDeletePunto = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/puntodeventa/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Error al eliminar el punto de venta");
      }

      Swal.fire("Eliminado", data.message, "success");

      // Actualizar la lista
      const updated = await fetch("http://localhost:4000/api/puntodeventa");
      const updatedData = await updated.json();
      setPuntos(updatedData.data);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

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
    <div className="p-6">
      <Header title="Puntos de Venta" />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Buscar Punto de Venta"
            className="search-input pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button className="btn btn-outline w-full sm:w-auto">
            Ver Puntos de Venta Inactivos
          </button>
          <button className="btn btn-outline w-full sm:w-auto">Borrar</button>
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
              <th className="w-10">
                <input type="checkbox" />
              </th>
              <th>Razón Social</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>CUIT</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Tipo</th>
              <th className="w-32">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {puntos.map((punto) => (
              <tr key={punto.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{punto.razon}</td>
                <td>{punto.nombre}</td>
                <td>{punto.direccion}</td>
                <td>{punto.cuit}</td>
                <td>{punto.email}</td>
                <td>{punto.telefono}</td>
                <td>{punto.es_online ? "Online" : "Físico"}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-outline py-1 px-2">
                      Editar
                    </button>
                    <button
                      className="btn btn-outline py-1 px-2"
                      onClick={() => handleDeletePunto(punto.id)}
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination mt-4 flex justify-center gap-2">
        <button className="pagination-item active">1</button>
        <button className="pagination-item">2</button>
        <button className="pagination-item">3</button>
        <button className="pagination-item">4</button>
        <button className="pagination-item">5</button>
        <button className="pagination-item">30</button>
        <button className="pagination-item">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {showModal && (
        <PuntoModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddPunto}
        />
      )}
    </div>
  );
}
