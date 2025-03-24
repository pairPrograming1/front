export default function TicketSelector({
  label,
  count,
  onIncrement,
  onDecrement,
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-700">
      <span className="text-white">{label}</span>
      <div className="flex items-center">
        <button
          onClick={onDecrement}
          className="w-8 h-8 flex items-center justify-center bg-[#333] rounded-md text-white"
        >
          -
        </button>
        <span className="w-8 text-center text-white">{count}</span>
        <button
          onClick={onIncrement}
          className="w-8 h-8 flex items-center justify-center bg-[#333] rounded-md text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}
