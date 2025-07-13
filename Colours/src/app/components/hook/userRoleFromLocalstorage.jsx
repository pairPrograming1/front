"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook para obtener el rol del usuario desde localStorage ('b').
 * Maneja la carga asíncrona y la disponibilidad de 'window'.
 * returns {{ userRole: string | null }}
 */
export default function useUserRoleFromLocalStorage() {
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedRole = localStorage.getItem("b")
        if (storedRole) {
          setUserRole(storedRole)
         
        } else {
          console.warn("Rol del usuario no encontrado en localStorage 'b'.")
          setUserRole(null)
        }
      } catch (error) {
        console.error("Error al obtener el rol del usuario desde localStorage:", error)
        setUserRole(null)
      } 
    } else {
      
      setUserRole(null)
    }
  }, []) // Se ejecuta solo una vez al montar el componente

  return { userRole }
}
