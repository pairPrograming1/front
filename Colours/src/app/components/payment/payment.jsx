import Image from "next/image";
import Header from "./Header";
import PaymentSummary from "./PaymentSummary";
import PaymentOptions from "./PaymentOptions";
import BackButton from "./BackButton";

export default function Payment() {
  return (
    <div className="bg-gray-0 p-8 rounded-lg w-full max-w-sm mx-auto">
      <Header />

      <main className="flex flex-col space-y-4">
        <div className="rounded-lg overflow-hidden mb-4 border border-gray-700">
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt="Evento"
            width={400}
            height={200}
            className="w-full object-cover"
          />
        </div>

        <PaymentSummary />
        <PaymentOptions />

        <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors">
          Ir a Pagar
        </button>

        <BackButton />
      </main>
    </div>
  );
}
