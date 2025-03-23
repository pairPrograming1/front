"use client"

import { useState } from "react"
import Sidebar from "@/app/components/admin/sidebar"
import TopNavbar from "@/app/components/admin/top-navbar"
import { Menu } from "lucide-react"

export default function AdminLayout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen)

  return (
    <div className="flex min-h-screen bg-[#0a1929] text-gray-100">
      {/* Sidebar para pantallas medianas y grandes */}
      <div className="hidden md:block h-screen">
        <Sidebar />
      </div>

      {/* Sidebar móvil */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 z-50 w-64 h-full">
            <Sidebar />
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
        </header>

        <div className="p-2 md:p-6 flex-1 overflow-auto bg-[#0a1929]">{children}</div>
      </main>
    </div>
  )
}

