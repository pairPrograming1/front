export default function EventCard({ event }) {
  return (
    <div className="flex justify-between items-center border border-[#b3964c] rounded-md p-3 w-full max-w-6xl">
      <div className="text-white">
        <p className="font-medium">{event.name}</p>
        <p className="text-sm text-gray-400">
          {event.location} - {event.date}
        </p>
      </div>
      <button className="px-3 py-1 bg-[#b3964c] hover:bg-[#9a7f41] text-black font-medium rounded-md transition-colors ml-auto">
        Vender
      </button>
    </div>
  );
}
