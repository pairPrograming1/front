export default function EventForm() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Nombre de Fantasía"
            className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00e5b0]"
          />
        </div>
  
        <div>
          <input
            type="text"
            placeholder="CUIT"
            className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00e5b0]"
          />
        </div>
  
        <div>
          <input
            type="text"
            placeholder="Dirección"
            className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00e5b0]"
          />
        </div>
  
        <div>
          <input
            type="text"
            placeholder="Persona de Contacto"
            className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00e5b0]"
          />
        </div>
  
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00e5b0]"
          />
        </div>
  
        <div>
          <input
            type="tel"
            placeholder="Teléfono de Contacto"
            className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00e5b0]"
          />
        </div>
  
        <div className="md:col-span-2 lg:col-span-1">
          <input
            type="text"
            placeholder="Asignar un Usuario"
            className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00e5b0]"
          />
        </div>
      </div>
    )
  }
  
  