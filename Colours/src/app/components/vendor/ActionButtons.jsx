"use client"

import { useRouter } from "next/navigation"

export default function ActionButtons() {
  const router = useRouter()

  return (
    <div className="w-full mt-10 flex flex-col lg:flex-row justify-center items-center gap-4">
      <button
        onClick={() => router.push("/vendor/event")}
        className="w-full py-3 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-colors lg:w-auto lg:px-6"
      >
        Vender entradas
      </button>
      <button className="w-full py-3 bg-gray-800 text-white rounded-md font-medium border border-gray-700 hover:bg-gray-700 transition-colors lg:w-auto lg:px-6">
        Mis ventas
      </button>
    </div>
  )
}