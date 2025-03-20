import { Settings, LogOut } from 'lucide-react'

export default function TopNavbar() {
  return (
    <div className="bg-transparent py-2 px-4 flex justify-end items-center gap-4 border-b border-slate-700">
      <span className="text-sm text-gray-300 hidden sm:inline-block">Hola, User</span>
      <button className="text-gray-300 hover:text-white p-1.5 rounded-full hover:bg-slate-700">
        <Settings size={18} />
      </button>
      <button className="text-gray-300 hover:text-white p-1.5 rounded-full hover:bg-slate-700">
        <LogOut size={18} />
      </button>
    </div>
  )
}

