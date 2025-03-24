"use client"

import { useState } from "react"
import Sidebar from "@/app/components/admin/sidebar"
import UserTable from "@/app/components/admin/user-table"
import SearchBar from "@/app/components/admin/search-bar"
import ActionButtons from "@/app/components/admin/action-buttons"
import UserModal from "@/app/components/admin/user-modal"
import TopNavbar from "@/app/components/admin/top-navbar"
import { Menu } from "lucide-react"

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ">
        <SearchBar />
        <ActionButtons onAddUser={openModal} />
      </div>

      <div className="mt-6">
        <UserTable />
      </div>

      {isModalOpen && <UserModal onClose={closeModal} />}
    </>
  )
}