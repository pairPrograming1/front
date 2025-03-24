import TicketItem from "./TicketItem";

export default function TicketsList({ tickets }) {
  return (
    <div className="space-y-4">
      {tickets.map((ticket, index) => (
        <TicketItem key={index} type={ticket.type} />
      ))}
    </div>
  );
}
