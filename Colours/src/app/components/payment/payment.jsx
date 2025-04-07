import Image from "next/image";
import Header from "./Header";
import PaymentSummary from "./PaymentSummary";
import PaymentOptions from "./PaymentOptions";
import BackButton from "./BackButton";

export default function Payment() {
  return (
    <div className="bg-gray-900/50 p-6 sm:p-10 rounded-2xl w-full max-w-5xl mx-auto shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="col-span-1 flex flex-col space-y-8">
        <Header />
        <PaymentSummary />
        <PaymentOptions />
        <button className="w-full bg-gradient-to-r from-[#C28B60] to-[#C28B60] hover:from-[#b07c55] hover:to-[#b07c55] text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#C28B60]">
          Ir a Pagar
        </button>
      </div>

      <div className="col-span-1 flex flex-col space-y-6">
        {/* Imagen de evento entre los dos bloques */}
        <div className="rounded-xl overflow-hidden mb-8 border-2 border-gray-700 shadow-md">
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt="Evento"
            width={400}
            height={200}
            className="w-full object-cover rounded-xl"
          />
        </div>

        {/* Detalles del evento */}
        <div className="flex flex-col justify-center items-start space-y-4">
          <h2 className="text-3xl text-white font-bold mb-4">
            Detalles del evento
          </h2>
          <p className="text-gray-300">
            Aquí puedes incluir más detalles relacionados con el evento o
            información adicional.
          </p>
        </div>

        {/* Botón Volver abajo a la izquierda */}
        <div className="mt-auto">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
