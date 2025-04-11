export default function SearchFilters() {
  return (
    <div className="space-y-3 mb-8">
      <input
        type="text"
        placeholder="Por nombre"
        className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#b3964c]"
      />

      <div className="grid grid-cols-2 gap-3">
        <select
          defaultValue=""
          className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#b3964c] appearance-none"
        >
          <option value="" disabled className="bg-[#1e2130]">
            Fecha
          </option>
          <option value="today" className="bg-[#1e2130]">
            Hoy
          </option>
          <option value="tomorrow" className="bg-[#1e2130]">
            Mañana
          </option>
          <option value="weekend" className="bg-[#1e2130]">
            Este fin de semana
          </option>
          <option value="month" className="bg-[#1e2130]">
            Este mes
          </option>
        </select>

        <select
          defaultValue=""
          className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#b3964c] appearance-none"
        >
          <option value="" disabled className="bg-[#1e2130]">
            Tipo
          </option>
          <option value="concert" className="bg-[#1e2130]">
            Concierto
          </option>
          <option value="theater" className="bg-[#1e2130]">
            Teatro
          </option>
          <option value="sports" className="bg-[#1e2130]">
            Deportes
          </option>
          <option value="festival" className="bg-[#1e2130]">
            Festival
          </option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Lugar del Evento"
        className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#b3964c]"
      />
    </div>
  );
}
