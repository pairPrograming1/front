import Image from "next/image";

export default function SalonCard() {
  return (
    <div className="rounded-3xl overflow-hidden border border-teal-400/30 bg-black/20 backdrop-blur-sm">
      <div className="relative h-48 w-full">
        <Image
          src="/placeholder.svg?height=400&width=600"
          alt="Vista aérea nocturna"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl font-cursive text-white">aires</h2>
        </div>
      </div>
    </div>
  );
}
