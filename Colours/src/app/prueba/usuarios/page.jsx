"use client";

import { useState } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";
import UsuarioModal from "../components/usuario-modal";
import Header from "../components/header";

export default function Usuarios() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Datos de ejemplo
  const usuarios = [
    {
      id: 1,
      usuario: "Boggino",
      nombre: "Mariano Boggino",
      email: "boggino@nakama.ar",
      tipo: "Administrador, Vendedor",
    },
    {
      id: 2,
      usuario: "Boggino",
      nombre: "Mariano Boggino",
      email: "boggino@nakama.ar",
      tipo: "Graduado",
    },
    {
      id: 3,
      usuario: "Boggino",
      nombre: "Mariano Boggino",
      email: "boggino@nakama.ar",
      tipo: "Administrador",
    },
    {
      id: 4,
      usuario: "Boggino",
      nombre: "Mariano Boggino",
      email: "boggino@nakama.ar",
      tipo: "Administrador",
    },
    {
      id: 5,
      usuario: "Boggino",
      nombre: "Mariano Boggino",
      email: "boggino@nakama.ar",
      tipo: "Administrador",
    },
    {
      id: 6,
      usuario: "Boggino",
      nombre: "Mariano Boggino",
      email: "boggino@nakama.ar",
      tipo: "Administrador",
    },
    {
      id: 7,
      usuario: "Boggino",
      nombre: "Mariano Boggino",
      email: "boggino@nakama.ar",
      tipo: "Administrador",
    },
    {
      id: 8,
      usuario: "Boggino",
      nombre: "Mariano Boggino",
      email: "boggino@nakama.ar",
      tipo: "Administrador",
    },
    {
      id: 9,
      usuario: "Boggino",
      nombre: "Mariano Boggino",
      email: "boggino@nakama.ar",
      tipo: "Administrador",
    },
    {
      id: 10,
      usuario: "Boggino",
      nombre: "Mariano Boggino",
      email: "boggino@nakama.ar",
      tipo: "Administrador",
    },
  ];

  return (
    <div className="p-6">
      <Header title="Usuarios" />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Buscar Usuario"
            className="search-input pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button className="btn btn-outline w-full sm:w-auto">
            Ver Usuarios Inactivos
          </button>
          <button className="btn btn-outline w-full sm:w-auto">Borrar</button>
          <button className="btn btn-outline w-full sm:w-auto">
            Quitar Roles
          </button>
          <button className="btn btn-outline w-full sm:w-auto">
            Asignar Roles
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
              <th className="w-10">
                <input type="checkbox" />
              </th>
              <th>Usuario</th>
              <th>Nombre y Apellido</th>
              <th>Email</th>
              <th>Tipo de Usuario</th>
              <th className="w-32">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{usuario.usuario}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.tipo}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-outline py-1 px-2">
                      Editar
                    </button>
                    <button className="btn btn-outline py-1 px-2">
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

      {showModal && <UsuarioModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
