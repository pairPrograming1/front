"use client"

import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import apiUrls from "@/app/components/utils/apiConfig"

const API_URL = apiUrls

const useImageFetcher = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [uploading, setUploading] = useState(false)

  const fetchImages = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/api/upload/images`, {
        cache: "no-store",
      })
      if (!res.ok) throw new Error("No se pudieron obtener las imágenes")
      const data = await res.json()
      setImages(data)
    } catch (err) {
      console.error("Error al cargar imágenes:", err)
      setError(err.message)
      Swal.fire({
        icon: "error",
        title: "Error al obtener imágenes",
        text: err.message || "Ocurrió un error al obtener las imágenes",
      })
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file) => {
    setUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append("image", file)

      const res = await fetch(`${API_URL}/api/upload/image`, {
        method: "POST",
        body: formData,
      })

      // --- IMPORTANTE: Verificar si la respuesta es OK antes de intentar parsear ---
      if (!res.ok) {
        const errorText = await res.text() // Obtener el texto crudo de la respuesta de error
        console.error("El servidor respondió con un error HTTP:", res.status, errorText)
        throw new Error(`Error del servidor (${res.status}): ${errorText || "Respuesta vacía"}`)
      }

      // Si la respuesta es OK, intentar parsear como JSON o asumir texto es URL
      let data
      const contentType = res.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        data = await res.json()
     
      } else {
        const textResponse = await res.text()
       
        data = { fileUrl: textResponse }
      }

      // Extraer la URL, incluyendo 'fileUrl'
      const imageUrl =
        data.fileUrl ||
        data.url ||
        data.secure_url ||
        data.data?.url ||
        data.data?.secure_url ||
        data.imageUrl ||
        data.path ||
        data

      if (!imageUrl || typeof imageUrl !== "string") {
        console.error("No se encontró URL válida en la respuesta exitosa:", data)
        throw new Error("No se pudo obtener la URL de la imagen de la respuesta exitosa")
      }

    
      return imageUrl
    } catch (err) {
      console.error("Error al subir imagen:", err)
      setError(err.message)
      Swal.fire({
        icon: "error",
        title: "Error al subir imagen",
        text: err.message || "Ocurrió un error al subir la imagen",
      })
      throw err
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const refreshImages = () => {
    fetchImages()
  }

  return {
    images,
    loading,
    error,
    uploading,
    refreshImages,
    uploadImage,
  }
}

export default useImageFetcher

