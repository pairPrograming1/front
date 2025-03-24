import Image from "next/image";

export default function EventImage() {
  return (
    <div className="rounded-xl overflow-hidden border-2 border-green-500 mb-6 shadow-lg">
      <Image
        src="/placeholder.svg?height=400&width=800"
        alt="Evento en Colegio del Sol"
        width={800}
        height={400}
        className="w-full object-cover"
      />
    </div>
  );
}
