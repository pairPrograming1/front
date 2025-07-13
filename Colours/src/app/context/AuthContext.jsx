"use client"
import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(() => {
    if (typeof window !== "undefined") {
      const storedAuthData = localStorage.getItem("authData")
      return storedAuthData ? JSON.parse(storedAuthData) : null
    }
    return null
  })

  // Efecto para persistir en localStorage y guardar 'a' y 'b'
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (authData) {
        localStorage.setItem("authData", JSON.stringify(authData))

        //modificacion en login para guardar id y rol
        const userId = authData?.user?.id || null
        const userRole = authData?.user?.rol || null

        if (userId) {
          localStorage.setItem("a", userId)
       
        } else {
          localStorage.removeItem("a")
         
        }

        if (userRole) {
          localStorage.setItem("b", userRole)
          
        } else {
          localStorage.removeItem("b")
          
        }
      } else {
        localStorage.removeItem("authData")
        localStorage.removeItem("a") // Limpiar 'a' si no hay authData
        localStorage.removeItem("b") // Limpiar 'b' si no hay authData
        
      }
    }
  }, [authData])

  // Efecto para verificar cambios en el rol y cerrar sesión si es necesario
  useEffect(() => {
    if (authData?.user?.rol !== undefined && authData?.roleChanged) {
      // Si el rol ha cambiado, cerrar sesión
      setAuthData(null)
      console.log("Sesión cerrada debido a cambio de rol")
      // Opcional: redirigir al usuario a la página de login
      // window.location.href = '/login';
    }
  }, [authData?.user?.rol, authData?.roleChanged])

  // Efecto para loguear los datos cuando cambian
  useEffect(() => {
    console.log("Datos actualizados del usuario:", authData)
    if (authData?.token) {
      console.log("Usuario autenticado con token")
    } else if (authData?.auth?.provider === "auth0") {
      console.log("Usuario autenticado con Auth0")
    } else if (authData === null) {
      console.log("No hay usuario logueado")
    }
  }, [authData])

  return <AuthContext.Provider value={{ authData, setAuthData }}>{children}</AuthContext.Provider>
}

