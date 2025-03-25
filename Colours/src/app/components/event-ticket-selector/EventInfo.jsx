import Image from "next/image";

export default function EventInfo() {
  return (
    <div className="text-center">
      <div className="relative h-48 w-full mb-4">
        <Image
          src="/placeholder.svg?height=400&width=800"
          alt="Evento en Colegio del Sol"
          fill
          className="object-cover rounded-3xl"
          priority
        />
      </div>
      <h2 className="text-xl font-bold mb-2">Colegio del Sol</h2>
      <p className="text-sm text-gray-400">Área: Eventos</p>
      <p className="text-sm text-gray-400">Sábado 30 de Diciembre a las 20hs</p>
    </div>
  );
}
