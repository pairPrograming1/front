"use client"

import { useRef, useState } from "react"
import { jsPDF } from "jspdf"
import { X, Download, FileText, User, Calendar, Tag, Loader } from "lucide-react"

export default function OrdenCompraModal({
  isOpen,
  onClose,
  buyerData,
  eventData,
  selectedTickets,
  subtotal,
  serviceCharge,
  total,
  orderSuccess,
  orderError,
}) {
  const summaryRef = useRef(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [pdfError, setPdfError] = useState(null)

  // Si el modal no está abierto, no renderizamos nada
  if (!isOpen) return null

  // Generar PDF de la orden - Enfoque alternativo sin html2canvas
  const downloadPDF = async () => {
    try {
      setIsGeneratingPDF(true)
      setPdfError(null)

      console.log("Iniciando generación de PDF...")

      // Crear un nuevo PDF directamente con jsPDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Configurar fuentes y estilos
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(16)
      pdf.setTextColor(0, 0, 0)

      // Dimensiones de la página
      const pageWidth = pdf.internal.pageSize.getWidth()
      const margin = 20
      const contentWidth = pageWidth - 2 * margin
      let yPosition = 20

      // Título
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(18)
      pdf.text("Resumen de Orden", pageWidth / 2, yPosition, { align: "center" })
      yPosition += 10

      // Línea separadora
      pdf.setDrawColor(191, 141, 107) // #BF8D6B
      pdf.setLineWidth(0.5)
      pdf.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 10

      // Datos del comprador
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      pdf.text("Datos del Comprador", margin, yPosition)
      yPosition += 8

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(10)
      pdf.text(`Nombre: ${buyerData?.name || ""}`, margin, yPosition)
      yPosition += 6
      pdf.text(`DNI: ${buyerData?.dni || ""}`, margin, yPosition)
      yPosition += 6
      pdf.text(`WhatsApp: ${buyerData?.whatsapp || ""}`, margin, yPosition)
      yPosition += 6
      pdf.text(`Email: ${buyerData?.email || ""}`, margin, yPosition)
      yPosition += 10

      // Línea separadora
      pdf.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 10

      // Información del evento
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      pdf.text("Evento", margin, yPosition)
      yPosition += 8

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(12)
      pdf.text(`${eventData?.nombre || ""}`, margin, yPosition)
      yPosition += 6
      pdf.setFontSize(10)
      pdf.text(`Lugar: ${eventData?.lugar || ""}`, margin, yPosition)
      yPosition += 6
      pdf.text(`Fecha: ${eventData?.fecha || ""}`, margin, yPosition)
      yPosition += 10

      // Línea separadora
      pdf.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 10

      // Entradas seleccionadas
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      pdf.text("Entradas", margin, yPosition)
      yPosition += 10

      // Cabecera de la tabla
      pdf.setFillColor(240, 240, 240)
      pdf.rect(margin, yPosition - 5, contentWidth, 8, "F")
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(10)
      pdf.text("Tipo", margin + 5, yPosition)
      pdf.text("Cant.", margin + contentWidth * 0.4, yPosition, { align: "center" })
      pdf.text("Precio", margin + contentWidth * 0.6, yPosition, { align: "center" })
      pdf.text("Subtotal", margin + contentWidth - 5, yPosition, { align: "right" })
      yPosition += 8

      // Filas de la tabla
      pdf.setFont("helvetica", "normal")
      selectedTickets.forEach((ticket, index) => {
        if (index % 2 === 0) {
          pdf.setFillColor(250, 250, 250)
          pdf.rect(margin, yPosition - 5, contentWidth, 8, "F")
        }
        pdf.text(ticket.tipo, margin + 5, yPosition)
        pdf.text(ticket.cantidad.toString(), margin + contentWidth * 0.4, yPosition, { align: "center" })
        pdf.text(`$${ticket.precio.toLocaleString()}`, margin + contentWidth * 0.6, yPosition, { align: "center" })
        pdf.text(`$${ticket.subtotal.toLocaleString()}`, margin + contentWidth - 5, yPosition, { align: "right" })
        yPosition += 8
      })

      yPosition += 5

      // Resumen de costos
      pdf.setDrawColor(200, 200, 200)
      pdf.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 8

      pdf.setFont("helvetica", "normal")
      pdf.text("Subtotal", margin + 5, yPosition)
      pdf.text(`$${subtotal.toLocaleString()}`, margin + contentWidth - 5, yPosition, { align: "right" })
      yPosition += 6

      pdf.text("Cargo de Servicio", margin + 5, yPosition)
      pdf.text(`$${serviceCharge.toLocaleString()}`, margin + contentWidth - 5, yPosition, { align: "right" })
      yPosition += 6

      pdf.setDrawColor(150, 150, 150)
      pdf.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 8

      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(12)
      pdf.text("Total", margin + 5, yPosition)
      pdf.text(`$${total.toLocaleString()}`, margin + contentWidth - 5, yPosition, { align: "right" })

      // Estado de la orden
      if (orderSuccess || orderError) {
        yPosition += 15
        pdf.setFontSize(10)

        if (orderSuccess) {
          pdf.setTextColor(0, 128, 0) // Verde
          pdf.text("¡Orden procesada correctamente!", pageWidth / 2, yPosition, { align: "center" })
        } else if (orderError) {
          pdf.setTextColor(200, 0, 0) // Rojo
          pdf.text(orderError, pageWidth / 2, yPosition, { align: "center" })
        }
      }

      // Pie de página
      pdf.setTextColor(100, 100, 100)
      pdf.setFontSize(8)
      const today = new Date()
      const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
      pdf.text(`Generado el ${formattedDate}`, pageWidth / 2, pdf.internal.pageSize.getHeight() - 10, {
        align: "center",
      })

      // Nombre de archivo con fecha formateada correctamente
      const fileName = `Orden_${eventData?.nombre || "Evento"}_${formattedDate.replace(/\//g, "-")}.pdf`

      console.log("Guardando PDF:", fileName)
      pdf.save(fileName)

      console.log("PDF generado y descargado correctamente")
    } catch (error) {
      console.error("Error al generar el PDF:", error)
      setPdfError(`Error al generar el PDF: ${error.message}`)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg border-2 border-[#BF8D6B] p-4 sm:p-6 w-full max-w-2xl mx-auto shadow-lg shadow-[#BF8D6B]/20 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6 top-0 bg-gray-800 pb-2 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Resumen de Orden</h2>
          <button
            onClick={onClose}
            className="text-[#BF8D6B] hover:text-[#A67A5B] transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div id="pdf-content" ref={summaryRef} className="bg-white text-black p-6 rounded-lg">
          {/* Datos del comprador */}
          <div className="mb-4 border-b pb-3">
            <div className="flex items-center mb-2">
              <User className="h-5 w-5 mr-2 text-[#BF8D6B]" />
              <h3 className="font-semibold">Datos del Comprador</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-600">Nombre:</p>
                <p>{buyerData?.name}</p>
              </div>
              <div>
                <p className="text-gray-600">DNI:</p>
                <p>{buyerData?.dni}</p>
              </div>
              <div>
                <p className="text-gray-600">WhatsApp:</p>
                <p>{buyerData?.whatsapp}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="truncate">{buyerData?.email}</p>
              </div>
            </div>
          </div>

          {/* Información del evento */}
          <div className="mb-4 border-b pb-3">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 mr-2 text-[#BF8D6B]" />
              <h3 className="font-semibold">Evento</h3>
            </div>
            <p className="font-medium">{eventData?.nombre}</p>
            <p className="text-sm text-gray-600">{eventData?.lugar}</p>
            <p className="text-sm text-gray-600">{eventData?.fecha}</p>
          </div>

          {/* Entradas seleccionadas */}
          <div className="mb-4 border-b pb-3">
            <div className="flex items-center mb-2">
              <Tag className="h-5 w-5 mr-2 text-[#BF8D6B]" />
              <h3 className="font-semibold">Entradas</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1">Tipo</th>
                  <th className="text-center py-1">Cant.</th>
                  <th className="text-right py-1">Precio</th>
                  <th className="text-right py-1">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {selectedTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-100">
                    <td className="py-1">{ticket.tipo}</td>
                    <td className="text-center py-1">{ticket.cantidad}</td>
                    <td className="text-right py-1">${ticket.precio.toLocaleString()}</td>
                    <td className="text-right py-1">${ticket.subtotal.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resumen de costos */}
          <div>
            <div className="flex items-center mb-2">
              <FileText className="h-5 w-5 mr-2 text-[#BF8D6B]" />
              <h3 className="font-semibold">Resumen</h3>
            </div>
            <div className="flex justify-between mb-1">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Cargo de Servicio</span>
              <span>${serviceCharge.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>

          {/* Estado de la orden */}
          {orderSuccess && (
            <div className="mt-4 p-2 bg-green-100 text-green-800 rounded text-center">
              ¡Orden procesada correctamente!
            </div>
          )}

          {orderError && <div className="mt-4 p-2 bg-red-100 text-red-800 rounded text-center">{orderError}</div>}
        </div>

        {pdfError && <div className="mt-4 p-2 bg-red-100 text-red-800 rounded text-center">{pdfError}</div>}

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#BF8D6B] text-[#BF8D6B] hover:bg-[#BF8D6B]/10 rounded-lg transition-colors flex items-center"
            disabled={isGeneratingPDF}
          >
            <X className="h-4 w-4 mr-1" />
            Cerrar
          </button>
          <button
            onClick={downloadPDF}
            disabled={isGeneratingPDF}
            className={`px-4 py-2 ${isGeneratingPDF ? "bg-gray-500" : "bg-[#BF8D6B] hover:bg-[#A67A5B]"} text-white rounded-lg border border-[#BF8D6B] transition-colors flex items-center`}
          >
            {isGeneratingPDF ? (
              <>
                <Loader className="h-4 w-4 mr-1 animate-spin" />
                Generando PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-1" />
                Descargar PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
