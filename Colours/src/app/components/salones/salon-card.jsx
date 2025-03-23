import Image from "next/image"

export default function SalonCard({ salon }) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
      <div className="p-4 flex items-center justify-center">
        <Image
          src={salon.imagen || "/placeholder.svg"}
          alt={salon.nombre}
          width={150}
          height={80}
          className="object-contain"
        />
      </div>
      <div className="bg-[#0f2744] p-2 text-center">
        <p className="text-sm text-white font-light">{salon.nombre}</p>
      </div>
    </div>
  )
}

