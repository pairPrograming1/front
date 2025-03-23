"use client"

import { useState } from "react"
import Sidebar from "@/app/components/admin/sidebar"
import PuntosVentaTable from "@/app/components/puntos-venta/punto-ventas-table"
import SearchBar from "@/app/components/puntos-venta/search-bar-ventas"
import ActionButtons from "@/app/components/puntos-venta/action-buttons-venta"
import PuntoVentaModal from "@/app/components/puntos-venta/punto-ventas-modal"
import TopNavbar from "@/app/components/admin/top-navbar"
import { Menu } from "lucide-react"

export default function PuntosVentaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen)

  return (
    <div className="flex min-h-screen bg-[#0a1929] text-gray-100">
      {/* Sidebar para pantallas medianas y grandes */}
      <div className="hidden md:block h-screen">
        <Sidebar activePage="puntos-venta" />
      </div>

      {/* Sidebar móvil */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 z-50 w-64 h-full">
            <Sidebar activePage="puntos-venta" />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar />

        <header className="bg-[#0f2744] p-4 flex items-center gap-4">
          <button onClick={toggleMobileSidebar} className="md:hidden text-gray-300 hover:text-white">
            <Menu size={24} />
          </button>

          <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <SearchBar />
            <ActionButtons onAddPuntoVenta={openModal} />
          </div>
        </header>

        <div className="p-2 md:p-6 flex-1 overflow-auto bg-[#0a1929]">
          <PuntosVentaTable />
        </div>
      </main>

      {isModalOpen && <PuntoVentaModal onClose={closeModal} />}
    </div>
  )
}

