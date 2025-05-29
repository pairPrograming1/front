"use client"

import { useState } from "react"
import { X, Search, Check } from "lucide-react"
import useImageFetcher from "./imageFetcher"

export default function ImageUploaderModal({ onClose, onImageSelected }) {
  const { images, loading, error } = useImageFetcher()
  const [selectedImage, setSelectedImage] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar imágenes por término de búsqueda
  const filteredImages = images.filter((img) => {
    if (!searchTerm) return true
    return (
      img.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // Seleccionar imagen
  const handleSelectImage = (imageUrl) => {
    setSelectedImage(imageUrl)
  }

  // Confirmar selección
  const handleConfirm = () => {
    if (selectedImage) {
      onImageSelected(selectedImage)
    }
  }

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="bg-gray-800 rounded-lg border-2 border-[#BF8D6B] p-4 sm:p-6 w-full max-w-2xl mx-auto shadow-lg shadow-[#BF8D6B]/20 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6 sticky top-0 bg-gray-800 pb-2 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Seleccionar Comprobante</h2>
          <button
            onClick={onClose}
            className="text-[#BF8D6B] hover:text-[#A67A5B] transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Buscador */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar imágenes..."
            className="w-full bg-gray-700 border border-[#BF8D6B] rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-[#BF8D6B] transition-colors"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BF8D6B] h-5 w-5" />
        </div>

        {/* Estado de carga */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BF8D6B]"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded mb-4">{error}</div>
        )}

        {/* Grid de imágenes */}
        {!loading && !error && (
          <>
            {filteredImages.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No se encontraron imágenes{searchTerm ? " para '" + searchTerm + "'" : ""}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                      selectedImage === image.url ? "border-green-500" : "border-transparent"
                    } hover:border-[#BF8D6B] transition-all`}
                    onClick={() => handleSelectImage(image.url)}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.nombre || "Imagen " + (index + 1)}
                      className="w-full h-32 object-cover"
                    />
                    {selectedImage === image.url && (
                      <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-1 text-xs text-white truncate">
                      {image.nombre || "Imagen " + (index + 1)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Botones de acción */}
        <div className="flex justify-between mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#BF8D6B] text-[#BF8D6B] hover:bg-[#BF8D6B]/10 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedImage}
            className={`px-4 py-2 ${
              !selectedImage ? "bg-gray-600 cursor-not-allowed" : "bg-[#BF8D6B] hover:bg-[#A67A5B]"
            } text-white rounded-lg transition-colors flex items-center`}
          >
            <Check className="h-4 w-4 mr-1" />
            Seleccionar
          </button>
        </div>
      </div>
    </div>
  )
}
