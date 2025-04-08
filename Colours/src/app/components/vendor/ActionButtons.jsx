export default function ActionButtons() {
  return (
    <div className="w-full mt-10 space-y-3 lg:space-y-0 lg:flex lg:space-x-3">
      <button className="w-full py-3 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-colors lg:w-auto lg:px-6">
        Vender entradas
      </button>
      <button className="w-full py-3 bg-gray-800 text-white rounded-md font-medium border border-gray-700 hover:bg-gray-700 transition-colors lg:w-auto lg:px-6">
        Mis ventas
      </button>
    </div>
  );
}
