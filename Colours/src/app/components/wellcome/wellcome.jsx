import { X } from "lucide-react";
import Link from "next/link";

export default function MainPage() {
  return (
    <div className="w-screen h-screen bg-[#1e2330] text-white flex flex-col lg:flex-row lg:items-center lg:justify-center">
      <header className="p-4 flex justify-end lg:absolute lg:top-4 lg:right-4">
        <button className="rounded-full p-1 hover:bg-slate-700 transition-colors">
          <X className="h-5 w-5" />
        </button>
      </header>

      <main className="flex-1 p-6 flex flex-col gap-6 lg:max-w-lg lg:gap-8">
        <Link
          href="#"
          className="text-xl font-semibold hover:text-gray-300 transition-colors lg:text-2xl"
        >
          Mi Perfil
        </Link>

        <Link
          href="#"
          className="text-xl font-semibold hover:text-gray-300 transition-colors lg:text-2xl"
        >
          Mis Eventos
        </Link>
      </main>
    </div>
  );
}
