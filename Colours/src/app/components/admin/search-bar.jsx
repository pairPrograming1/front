import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="relative w-full md:w-96">
      <input
        type="text"
        placeholder="Buscar usuario"
        className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
      />
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
    </div>
  )
}

