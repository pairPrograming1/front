export default function TicketSelector({
  label,
  count,
  onIncrement,
  onDecrement,
}) {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-700 rounded-lg shadow-md">
      <span className="capitalize font-semibold">{label}</span>
      <div className="flex items-center mt-2 space-x-2">
        <button
          onClick={onDecrement}
          className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-md text-white hover:bg-red-400"
        >
          -
        </button>
        <span className="w-8 text-center text-xl">{count}</span>
        <button
          onClick={onIncrement}
          className="w-8 h-8 flex items-center justify-center bg-green-500 rounded-md text-white hover:bg-green-400"
        >
          +
        </button>
      </div>
    </div>
  );
}
