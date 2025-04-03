"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import Sidebar from "@/app/components/user/sidebarUser"

export default function UsersLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen flex-col bg-xevent-dark font-manrope">
      {/* Navbar */}
      <header className="flex h-16 items-center justify-between border-b border-xevent-medium px-4 md:px-6">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 rounded-md p-2 text-xevent-light hover:bg-xevent-medium"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/users" className="text-2xl font-bold text-xevent-light">
            XEVENT
          </Link>
        </div>
      </header>

      <div className="relative flex flex-1 overflow-hidden">
        {/* Sidebar Component */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-xevent-dark">{children}</main>
      </div>
    </div>
  )
}

