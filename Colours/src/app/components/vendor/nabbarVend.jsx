"use client"

import { ArrowLeft, LogOut, Menu, User } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Only show back button if not on home page and not on vendor page
  const showBackButton = pathname !== "/" && pathname !== "/vendor"

  // Show logout button only on vendor page
  const showLogoutButton = pathname === "/vendor"

  const handleLogout = () => {
    // Aquí iría la lógica de cierre de sesión
    // Por ahora solo redirigimos a la página principal
    router.push("/")
  }

  return (
    <nav className="w-full bg-[#1E2330] text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
          <Menu className="h-6 w-6" />
        </button>

        {menuOpen && (
          <div className="absolute left-0 top-14 mt-2 w-48 bg-[#252e3f] rounded-md shadow-lg z-50">
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm hover:bg-[#1e2533] flex items-center"
              onClick={() => setMenuOpen(false)}
            >
              <User className="h-4 w-4 mr-2" />
              Mi Perfil
            </Link>
          </div>
        )}
      </div>
      <Link href="/" className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2">
        XEVENT
      </Link>
      {showBackButton && (
        <button onClick={() => router.back()} className="p-2">
          <ArrowLeft className="h-6 w-6" />
        </button>
      )}
      {showLogoutButton && (
        <button onClick={handleLogout} className="p-2 flex items-center text-sm">
          <LogOut className="h-5 w-5 mr-1" />
          <span>Salir</span>
        </button>
      )}
      {!showBackButton && !showLogoutButton && <div className="w-10"></div>} {/* Spacer when no button is shown */}
    </nav>
  )
}
