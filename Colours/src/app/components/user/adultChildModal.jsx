"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

export default function Modal({ isOpen, onClose, children, title }) {
  const modalRef = useRef(null)

  // Cerrar modal al presionar Escape
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => document.removeEventListener("keydown", handleEscapeKey)
  }, [isOpen, onClose])

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Cerrar al hacer clic fuera del modal
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-lg p-6"
        style={{ backgroundColor: "#2D3443" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300" aria-label="Cerrar">
            <X className="h-6 w-6" />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}

