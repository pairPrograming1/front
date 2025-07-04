"use client"
import { useState, useRef } from "react"
import { X, CreditCard, Check, AlertCircle, Camera, FileImage, Info } from "lucide-react"
import Swal from "sweetalert2"
import apiUrls from "@/app/components/utils/apiConfig"
import useImageFetcher from "./imageFetcher"

const API_URL = apiUrls

export default function PagoModal({
  isOpen,
  onClose,
  orderId,
  total,
  metodoDeCobroId = null,
  paymentMethodName = "",
  taxDetails = null,
  isInline = false,
}) {
  const [formData, setFormData] = useState({
    referencia: "",
    descripcion: "",
    montoRecibido: total || 0,
    imagen: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  const { uploadImage, uploading: uploadingImage } = useImageFetcher()

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "montoRecibido" ? Number.parseFloat(value) || 0 : value,
    })
  }

  const handleImageUpload = async (file) => {
    try {
      const previewUrl = URL.createObjectURL(file)
      setPreviewImage(previewUrl)
      const imageResult = await uploadImage(file)
      let imageUrl = ""
      if (typeof imageResult === "string") {
        imageUrl = imageResult
      } else if (typeof imageResult === "object" && imageResult !== null) {
        imageUrl =
          imageResult.url || imageResult.secure_url || imageResult.data?.url || imageResult.data?.secure_url || ""
      }

      if (!imageUrl || typeof imageUrl !== "string") {
        throw new Error("No se pudo obtener la URL de la imagen")
      }

      setFormData({
        ...formData,
        imagen: imageUrl,
      })
      setError(null)
      return imageUrl
    } catch (error) {
      setError(`Error al subir la imagen: ${error.message}`)
      return previewImage
    }
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Por favor selecciona un archivo de imagen válido")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen es demasiado grande. Máximo 5MB.")
      return
    }

    try {
      const previewUrl = URL.createObjectURL(file)
      setPreviewImage(previewUrl)
      await handleImageUpload(file)
      setError(null)
    } catch (error) {
      setError("Error al procesar la imagen")
    }
  }

  const handleSelectFile = () => {
    fileInputRef.current?.click()
  }

  const handleOpenCamera = () => {
    cameraInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      imagen: "",
    })
    setPreviewImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (cameraInputRef.current) cameraInputRef.current.value = ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.referencia.trim()) {
      setError("La referencia es obligatoria")
      return
    }

    if (formData.montoRecibido <= 0) {
      setError("El monto recibido debe ser mayor que cero")
      return
    }

    if (uploadingImage) {
      setError("Espera a que termine de subir la imagen")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const imagenFinal =
        formData.imagen && typeof formData.imagen === "string" && formData.imagen.trim() !== ""
          ? formData.imagen.trim()
          : null

      // 🔧 VOLVIENDO AL VALOR ORIGINAL QUE USABAS
      const paymentData = {
        ordenId: orderId,
        metodoDeCobroId: metodoDeCobroId,
        estatus: "pagado", // ✅ VOLVIENDO AL ORIGINAL - el modelo permite STRING
        referencia: formData.referencia,
        descripcion: formData.descripcion,
        montoRecibido: formData.montoRecibido,
        imagen: imagenFinal,
        error_message: null,
        fecha_cancelacion: null,
        motivo_cancelacion: null,
      }

      console.log("🔍 Datos enviados al backend:", paymentData)
      console.log("🔍 Modelo permite STRING sin validaciones - debería funcionar")

      const response = await fetch(`${API_URL}/api/payment/pago`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      const responseText = await response.text()
      console.log("🔍 Respuesta cruda del servidor:", responseText)

      let result
      try {
        result = JSON.parse(responseText)
      } catch (parseError) {
        console.error("❌ Error al parsear respuesta:", parseError)
        throw new Error(`Respuesta inválida del servidor: ${responseText}`)
      }

      if (!response.ok) {
        console.error("❌ Error del servidor:", result)

        // 🔧 MENSAJE DE ERROR MÁS ESPECÍFICO PARA DEBUGGING
        let errorMessage = result.message || "Error al procesar el pago"

        if (errorMessage.includes("Validation isIn on estatus failed")) {
          errorMessage =
            `🚨 PROBLEMA ENCONTRADO:\n\n` +
            `El modelo Pago.js permite STRING sin validaciones, pero hay una validación isIn en algún lugar.\n\n` +
            `POSIBLES CAUSAS:\n` +
            `• Hay otro modelo/migración con validación isIn\n` +
            `• Validación en la base de datos (constraint)\n` +
            `• Hook o middleware de Sequelize\n` +
            `• Modelo definido en múltiples lugares\n\n` +
            `BUSCA EN:\n` +
            `• /migrations/ - archivos de migración\n` +
            `• /models/ - otros archivos de modelo\n` +
            `• hooks de Sequelize (beforeCreate, beforeUpdate)\n` +
            `• constraints de base de datos`
        }

        throw new Error(errorMessage)
      }

      console.log("✅ Respuesta exitosa del servidor:", result)
      setSuccess(true)

      // ✅ Mostrar detalles del pago incluyendo impuestos
      let detalleHtml = `
        <div style="text-align: left;">
          <p><strong>Orden:</strong> #${orderId}</p>
          <p><strong>Referencia:</strong> ${formData.referencia}</p>
          <p><strong>Método de Pago:</strong> ${paymentMethodName || "N/A"}</p>
      `

      if (taxDetails && taxDetails.taxAmount > 0) {
        detalleHtml += `
          <hr style="margin: 10px 0;">
          <p><strong>Detalle de Impuestos:</strong></p>
          <p>• Monto Base: $${taxDetails.baseAmount?.toLocaleString()}</p>
          <p>• Impuesto (${taxDetails.taxPercentage}%): $${taxDetails.taxAmount?.toLocaleString()}</p>
          <p><strong>• Total Final: $${taxDetails.finalTotal?.toLocaleString()}</strong></p>
        `
      } else {
        detalleHtml += `<p><strong>Monto:</strong> $${formData.montoRecibido.toLocaleString()}</p>`
      }

      if (formData.descripcion) {
        detalleHtml += `<p><strong>Descripción:</strong> ${formData.descripcion}</p>`
      }

      if (imagenFinal) {
        detalleHtml += `<p><strong>Comprobante:</strong> ✅ Adjuntado</p>`
      }

      detalleHtml += `</div>`

      await Swal.fire({
        icon: "success",
        title: "¡Pago Confirmado!",
        html: detalleHtml,
        confirmButtonText: "Continuar",
        confirmButtonColor: "#BF8D6B",
      })

      onClose()
    } catch (error) {
      console.error("❌ Error en handleSubmit:", error)
      setError(error.message || "No se pudo procesar el pago")

      // 🔧 ALERT MÁS INFORMATIVO PARA DEBUGGING
      await Swal.fire({
        icon: "error",
        title: "🚨 Error de Validación Oculta",
        html: `
          <div style="text-align: left; font-size: 14px;">
            <p><strong>🔍 Análisis del Error:</strong></p>
            <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 12px; border-radius: 6px; margin: 10px 0;">
              <p style="color: #dc2626; font-family: monospace; font-size: 12px;">
                ${error.message}
              </p>
            </div>
            
            <p><strong>🎯 El Problema:</strong></p>
            <p>Tu modelo Pago.js permite STRING sin validaciones, pero hay una validación <code>isIn</code> oculta en algún lugar.</p>
            
            <p><strong>🔍 Busca en estos archivos:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li><code>/migrations/</code> - archivos de migración</li>
              <li><code>/models/</code> - otros archivos de modelo</li>
              <li>Hooks de Sequelize (beforeCreate, beforeUpdate)</li>
              <li>Constraints de base de datos</li>
            </ul>
            
            <p><strong>💡 Comando para buscar:</strong></p>
            <div style="background: #f3f4f6; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 12px;">
              grep -r "isIn.*estatus" ./models/<br/>
              grep -r "validate.*estatus" ./migrations/
            </div>
          </div>
        `,
        confirmButtonText: "Entendido - Voy a buscar",
        confirmButtonColor: "#BF8D6B",
        width: 700,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Componente del formulario reutilizable
  const FormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 🔧 SECCIÓN DE DEBUG ACTUALIZADA */}
      <div className="bg-red-900/30 border border-red-600 rounded-lg p-3 mb-4">
        <h3 className="text-red-400 font-medium flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />🚨 Problema de Validación Oculta
        </h3>
        <div className="text-xs text-red-200 mt-2 space-y-1">
          <div>
            Modelo permite: <code className="bg-red-800/50 px-1 rounded">DataTypes.STRING (sin validaciones)</code>
          </div>
          <div>
            Error recibido: <code className="bg-red-800/50 px-1 rounded">"Validation isIn on estatus failed"</code>
          </div>
          <div>
            Estatus enviado: <code className="bg-red-800/50 px-1 rounded">"pagado"</code>
          </div>
          <div className="text-red-300 mt-2">
            🔍 Hay una validación isIn oculta en algún lugar (migración, hook, constraint DB)
          </div>
        </div>
      </div>

      <div className="bg-gray-700/50 border border-[#BF8D6B] rounded-lg p-3 mb-4">
        <h3 className="text-[#BF8D6B] font-medium">Detalles de la Orden</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm text-gray-300">
          <div>
            Orden: <span className="text-[#BF8D6B]">#{orderId}</span>
          </div>
          <div>
            Método: <span className="text-[#BF8D6B]">{paymentMethodName || "N/A"}</span>
          </div>
        </div>
        {/* ✅ Mostrar detalles de impuestos si existen */}
        {taxDetails && taxDetails.taxAmount > 0 && (
          <div className="mt-3 p-2 bg-blue-900/30 border border-blue-700 rounded">
            <div className="flex items-center mb-2">
              <Info className="h-4 w-4 mr-1 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Detalle de Impuestos</span>
            </div>
            <div className="text-xs text-gray-300 space-y-1">
              <div className="flex justify-between">
                <span>Monto Base:</span>
                <span>${taxDetails.baseAmount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Impuesto ({taxDetails.taxPercentage}%):</span>
                <span className="text-orange-400">+${taxDetails.taxAmount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-medium border-t border-gray-600 pt-1">
                <span>Total Final:</span>
                <span className="text-[#BF8D6B]">${taxDetails.finalTotal?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
        {/* Si no hay impuestos, mostrar total simple */}
        {(!taxDetails || taxDetails.taxAmount === 0) && (
          <div className="mt-2 text-sm text-gray-300">
            Total a pagar: <span className="text-[#BF8D6B]">${total?.toLocaleString()}</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-white">
          Referencia / Comprobante <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="referencia"
            value={formData.referencia}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-[#BF8D6B] rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-[#BF8D6B] transition-colors"
            placeholder="Ej: Transferencia #12345 o 'Efectivo'"
            required
          />
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BF8D6B] h-5 w-5" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-white">Descripción (opcional)</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full bg-gray-700 border border-[#BF8D6B] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#BF8D6B] transition-colors"
          placeholder="Detalles adicionales sobre el pago..."
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-white">
          Monto Recibido <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            name="montoRecibido"
            value={formData.montoRecibido}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-[#BF8D6B] rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-[#BF8D6B] transition-colors"
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BF8D6B]">$</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-white">Comprobante de Pago (opcional)</label>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            type="button"
            onClick={handleSelectFile}
            disabled={uploadingImage}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg border border-[#BF8D6B] transition-colors flex items-center justify-center disabled:opacity-50"
          >
            <FileImage className="h-4 w-4 mr-2" />
            Seleccionar Archivo
          </button>
          <button
            type="button"
            onClick={handleOpenCamera}
            disabled={uploadingImage}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg border border-[#BF8D6B] transition-colors flex items-center justify-center disabled:opacity-50"
          >
            <Camera className="h-4 w-4 mr-2" />
            Tomar Foto
          </button>
        </div>

        {uploadingImage && (
          <div className="flex items-center justify-center py-4 text-[#BF8D6B]">
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Subiendo imagen...
          </div>
        )}

        {(previewImage || formData.imagen) && !uploadingImage && (
          <div className="mt-3 p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 text-sm flex items-center">
                <Check className="h-4 w-4 mr-1" />
                {formData.imagen ? "Imagen subida correctamente" : "Vista previa"}
              </span>
              <button type="button" onClick={handleRemoveImage} className="text-red-400 hover:text-red-300 text-sm">
                <X className="h-4 w-4" />
              </button>
            </div>
            <img
              src={previewImage || formData.imagen || "/placeholder.svg"}
              alt="Comprobante de pago"
              className="w-full h-48 object-contain rounded border border-gray-600"
            />
            {formData.imagen && <p className="text-xs text-green-400 mt-1">✓ Imagen guardada en el servidor</p>}
          </div>
        )}
        <p className="text-xs text-gray-400 mt-2">
          Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 5MB. Se sube automáticamente a tu servidor.
        </p>
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-700">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-red-600 text-red-500 hover:bg-red-600/10 rounded-lg transition-colors"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={`px-4 py-2 ${
            isSubmitting || uploadingImage ? "bg-gray-500" : "bg-[#BF8D6B] hover:bg-[#A67A5B]"
          } text-white rounded-lg transition-colors flex items-center`}
          disabled={isSubmitting || uploadingImage}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Procesando...
            </span>
          ) : uploadingImage ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Subiendo imagen...
            </span>
          ) : (
            <span className="flex items-center">
              <Check className="h-4 w-4 mr-1" />
              Confirmar Pago
            </span>
          )}
        </button>
      </div>
    </form>
  )

  if (isInline) {
    return (
      <div className="h-full bg-gray-800 rounded-lg border-2 border-[#BF8D6B] p-4 sm:p-6 shadow-lg shadow-[#BF8D6B]/20 overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6 bg-gray-800 pb-2 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">Confirmar Pago</h2>
            <p className="text-sm text-gray-300">Orden #{orderId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#BF8D6B] hover:text-[#A67A5B] transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded mb-4 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded mb-4 flex items-start">
            <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>¡Pago procesado correctamente!</span>
          </div>
        )}

        <FormContent />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg border-2 border-[#BF8D6B] p-4 sm:p-6 w-full max-w-xl mx-auto shadow-lg shadow-[#BF8D6B]/20 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6 sticky top-0 bg-gray-800 pb-2 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">Confirmar Pago</h2>
            <p className="text-sm text-gray-300">Orden #{orderId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#BF8D6B] hover:text-[#A67A5B] transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded mb-4 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded mb-4 flex items-start">
            <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>¡Pago procesado correctamente!</span>
          </div>
        )}

        <FormContent />
      </div>
    </div>
  )
}

