import EventTicketSelector from "../components/event-ticket-selector/event-ticket-selector";

export default function EventTicketSelectorPage() {
  return (
    <main className="flex min-h-screen flex-col text-white">
      <header className="flex justify-between items-center p-6">
        <div className="text-xl font-bold">Colour</div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </header>

      <div className="flex-1 px-8 pb-8">
        <EventTicketSelector />
      </div>
    </main>
  );
}
