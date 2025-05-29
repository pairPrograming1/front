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

      // ✅ Probar diferentes nombres de campo que tu API podría esperar
      formData.append("image", file) // Cambié de "file" a "image"

     

      const res = await fetch(`${API_URL}/api/upload/image`, {
        method: "POST",
        body: formData,
      })

  

      // ✅ Manejar respuestas que no son JSON
      let data
      const contentType = res.headers.get("content-type")

      if (contentType && contentType.includes("application/json")) {
        data = await res.json()
      } else {
        // Si no es JSON, obtener como texto
        const textResponse = await res.text()
       

        if (!res.ok) {
          throw new Error(textResponse || `Error HTTP: ${res.status}`)
        }

        // Si es exitoso pero no JSON, asumir que el texto es la URL
        data = { url: textResponse }
      }

      if (!res.ok) {
        throw new Error(data.message || data.error || `Error HTTP: ${res.status}`)
      }



      // ✅ Extraer la URL de diferentes posibles estructuras
      const imageUrl =
        data.url || data.secure_url || data.data?.url || data.data?.secure_url || data.imageUrl || data.path || data

      if (!imageUrl || typeof imageUrl !== "string") {
        console.error("No se encontró URL válida en la respuesta:", data)
        throw new Error("No se pudo obtener la URL de la imagen")
      }

      // Opcional: Refrescar la lista de imágenes
      await fetchImages()

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
