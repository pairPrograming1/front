import Image from "next/image";
import Link from "next/link";

export default function Event() {
  return (
    <div className="min-h-screen bg-gray-0 text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold tracking-wider">Colour</h1>
      </header>

      <main className="bg-gray-0 p-6 rounded-lg">
        <div className="rounded-lg overflow-hidden border border-green-500 mb-6">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Evento en Colegio del Sol"
            width={800}
            height={400}
            className="w-full object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-green-500">
          Colegio del Sol
        </h2>

        <p className="text-gray-300 mb-2">Área Eventos</p>
        <p className="text-gray-300 mb-6">Sábado 20 de Diciembre a las 20hs</p>

        <div className="space-y-4 text-gray-300">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et
            amet pharetra lorem. Curabitur vitae volutpat massa. Cras nec elit
            ut dui ultricies, quis pharetra nulla viverra. Donec semper sed
            massa non suscipit. Nullam porta sit amet leo nec facilisis
            ultrices. Suspendisse et at tellus sodales, et facilisis libero
            tincidunt. Mauris vitae tempus ipsum. Nulla vel vitae leo. Sed
            suscipit lectus lectus, quis viverra sapien. Donec accumsan dui a
            rhoncus. Aliquam erat volutpat. Ut tempus libero imperdiet est.
            Morbi aliquam magna varius ullamcorper consectetur.
          </p>

          <p>
            Suspendisse elementum, risus eget efficitur porta, elit lectus
            consequat tellus, sit viverra sapien augue a ante. Duis commodo
            mauris tristique lectus semper, a volutpat imperdiet. Curabitur
            elementum ullamcorper cursus. Pellentesque bibendum sit amet sodales
            et facilisis elementum. Maecenas sed eros vel eros volutpat ultrices
            eget. Futrices ante varius a justo. Nunc a nisi feugiat, volutpat
            eros et, tempor eros. Praesent imperdiet leo felis, sed ultrices.
          </p>
        </div>

        <div className="mt-8 text-left">
          <Link href="/" className="text-white-500 hover:underline">
            Volver atrás
          </Link>
        </div>
      </main>
    </div>
  );
}
