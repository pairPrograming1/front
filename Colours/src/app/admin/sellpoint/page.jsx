"use client"

import { useState } from "react"
import Sidebar from "@/app/components/admin/sidebar"
import PuntosVentaTable from "@/app/components/puntos-venta/punto-ventas-table"
import SearchBar from "@/app/components/puntos-venta/search-bar-ventas"
import ActionButtons from "@/app/components/puntos-venta/action-buttons-venta"

import TopNavbar from "@/app/components/admin/top-navbar"
import { Menu } from "lucide-react"

export default function PuntosVentaPage() {
    
  
    return (
      <>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <SearchBar />
          <ActionButtons  />
        </div>
  
        <div className="mt-6">
          <PuntosVentaTable />
        </div>
  
      
      </>
    )
  }
  

