export default function PaymentOptions() {
  return (
    <div className="space-y-6">
      <div className="border-2 border-gray-700 rounded-xl p-5 flex justify-between items-center bg-gray-800 hover:bg-gray-700 transition-all duration-200 shadow-lg">
        <span className="text-white text-lg">Pagar con Mercado Pago</span>
        <div className="w-6 h-6 border-2 border-amber-500 rounded-full"></div>
      </div>

      <div className="border-2 border-dashed border-gray-500 rounded-xl p-5 flex justify-between items-center bg-gray-700 hover:bg-gray-600 transition-all duration-200">
        <span className="text-gray-400 text-lg">
          Tarjeta de crédito (Próximamente)
        </span>
      </div>

      <div className="border-2 border-dashed border-gray-500 rounded-xl p-5 flex justify-between items-center bg-gray-700 hover:bg-gray-600 transition-all duration-200">
        <span className="text-gray-400 text-lg">
          Transferencia (Próximamente)
        </span>
      </div>
    </div>
  );
}
