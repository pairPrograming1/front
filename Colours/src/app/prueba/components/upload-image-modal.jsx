"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

export default function UploadImageModal({ onClose, API_URL }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]); // Estado para almacenar imágenes existentes
  const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL.replace("/image", "/images")}`); // Endpoint para obtener imágenes
        if (!response.ok) {
          throw new Error("Error al obtener las imágenes");
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las imágenes existentes");
      }
    };

    fetchImages();
  }, [API_URL]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setSelectedImage(null); // Desmarca cualquier imagen seleccionada
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Por favor selecciona una imagen");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setIsUploading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir la imagen");
      }

      const data = await response.json();
      alert("Imagen subida correctamente: " + data.imageUrl);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setSelectedFile(null); // Desmarca cualquier archivo cargado
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center flex items-center justify-center">
        <div className="fixed inset-0 " onClick={onClose}></div>
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative z-10">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-yellow-500 hover:text-yellow-300"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold text-white mb-4">
            Cargar Imagen
          </h2>
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 text-red-300 text-sm rounded-lg border border-red-700">
              {error}
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 w-full text-white"
          />
          <button
            onClick={handleUpload}
            className="w-full bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg mb-4"
            disabled={isUploading}
          >
            {isUploading ? "Subiendo..." : "Subir Imagen"}
          </button>
          <h3 className="text-lg font-semibold text-white mb-2">
            Imágenes existentes
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {images.map((image) => (
              <div
                key={image.id}
                className={`relative border rounded-lg cursor-pointer ${
                  selectedImage?.id === image.id
                    ? "border-green-500"
                    : "border-yellow-600"
                }`}
                onClick={() => handleImageSelect(image)}
              >
                <img
                  src={image.url}
                  alt="Imagen existente"
                  className="w-full h-auto rounded-lg"
                />
                {selectedImage?.id === image.id && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
