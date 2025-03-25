import TicketItem from "./TicketItem";

export default function TicketsList({ tickets }) {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Entradas disponibles</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {tickets.map((ticket, index) => (
          <TicketItem key={index} type={ticket.type} />
        ))}
      </div>
    </div>
  );
}
