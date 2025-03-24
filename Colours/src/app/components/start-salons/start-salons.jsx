import Link from "next/link";
import Header from "./Header";
import SalonCard from "./SalonCard";
import InfoCard from "./InfoCard";

export default function StartSalons() {
  return (
    <main className="min-h-screen from-slate-800 via-teal-800 to-teal-600 text-white p-8">
      <Header />

      <div className="flex flex-col gap-6">
        <SalonCard />
        <InfoCard title="Cobros" date="24/02/2025" buttonText="Ver Cobros" />
        <InfoCard
          title="Pagos"
          date="24/02/2025"
          buttonText="Ver pagos realizados"
        />

        <div className="mt-6 text-left">
          <Link href="/" className="text-white-500 hover:underline">
            Volver atrás
          </Link>
        </div>
      </div>
    </main>
  );
}
