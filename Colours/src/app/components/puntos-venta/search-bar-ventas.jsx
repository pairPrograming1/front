import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="relative w-full md:w-96">
      <input
        type="text"
        placeholder="Buscar punto de venta"
        className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#00e5b0]"
      />
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
    </div>
  )
}

