import UserCard from "./UserCard";
import TicketsList from "./TicketList";
import BackButton from "./BackButton";

export default function TicketsPage() {
  const tickets = [
    { type: "Adulto" },
    { type: "Adulto" },
    { type: "Adulto" },
    { type: "Menores" },
    { type: "Menores" },
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <header className="flex justify-between items-center p-4"></header>

      <main className="px-12 pb-20 max-w-full">
        <h1 className="text-2xl font-bold mb-4">Mis entradas</h1>

        <UserCard name="Hernán Guillano" />

        <TicketsList tickets={tickets} />

        <BackButton />
      </main>
    </div>
  );
}
