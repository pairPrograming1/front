export default function DetalleCompra({ id }) {
    return (
      <div>
        <h2 className="text-lg font-medium text-white mb-4">Compra {id}</h2>
  
        <div className="space-y-4">
          <div className="bg-[#1a3a5f] p-3 rounded-lg">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Mercado Pago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Punto de Venta</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Vendedor</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">25/09/2023</span>
              </div>
            </div>
          </div>
  
          <div className="flex gap-2">
            <button className="flex-1 bg-[#1a3a5f] hover:bg-[#2a4a6f] text-white py-2 px-3 rounded-md text-sm">
              Comprobante de Pago
            </button>
            <button className="flex-1 bg-[#1a3a5f] hover:bg-[#2a4a6f] text-white py-2 px-3 rounded-md text-sm">
              Factura por Servicio
            </button>
          </div>
  
          <div className="bg-[#1a3a5f] p-3 rounded-lg mt-4">
            <h3 className="text-white font-medium mb-2">Totales</h3>
            <div className="h-24"></div> {/* Espacio para los totales */}
          </div>
        </div>
      </div>
    )
  }
  
  