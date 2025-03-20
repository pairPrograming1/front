"use client"

import { useState } from "react"
import Sidebar from "@/component/admin/sidebar"
import UserTable from "@/component/admin/user-table"
import SearchBar from "@/component/admin/search-bar"
import ActionButtons from "@/component/admin/action-buttons"
import UserModal from "@/component/admin/user-modal"
import TopNavbar from "@/component/admin/top-navbar"
import { Menu } from "lucide-react"

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen)

  return (
    <div className="flex min-h-screen bg-slate-900 text-gray-100">
      {/* Sidebar para pantallas medianas y grandes */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar móvil */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 z-50 w-64">
            <Sidebar />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar />

        <header className="bg-slate-800 p-4 flex items-center gap-4">
          <button onClick={toggleMobileSidebar} className="md:hidden text-gray-300 hover:text-white">
            <Menu size={24} />
          </button>

          <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <SearchBar />
            <ActionButtons onAddUser={openModal} />
          </div>
        </header>

        <div className="p-2 md:p-6 flex-1 overflow-auto">
          <UserTable />
        </div>
      </main>

      {isModalOpen && <UserModal onClose={closeModal} />}
    </div>
  )
}


