export default function TiposCobro() {
    return (
      <div className="space-y-4">
        <div className="bg-[#1a1a1a] rounded-lg p-4">
          <h3 className="text-white font-medium mb-3">Mercado Pago</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="API Key"
              className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00e5b0]"
            />
            <input
              type="text"
              placeholder="Secret ID"
              className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00e5b0]"
            />
          </div>
        </div>
  
        <div className="bg-[#1a1a1a] rounded-lg p-4">
          <h3 className="text-white font-medium mb-3">Transferencia</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="CBU"
              className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00e5b0]"
            />
            <input
              type="text"
              placeholder="Entidad de Cobro"
              className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00e5b0]"
            />
          </div>
        </div>
  
        <div className="bg-[#1a1a1a] rounded-lg p-4">
          <h3 className="text-white font-medium">Efectivo</h3>
        </div>
      </div>
    )
  }
  
  