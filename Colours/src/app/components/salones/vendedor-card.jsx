export default function VendedorCard({ vendedor }) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg p-4">
        <h3 className="text-white font-medium">{vendedor.nombre}</h3>
        <p className="text-sm text-gray-400 mt-1">Teléfono: {vendedor.telefono}</p>
        <p className="text-sm text-gray-400">WhatsApp: {vendedor.whatsapp}</p>
      </div>
    )
  }
  
  