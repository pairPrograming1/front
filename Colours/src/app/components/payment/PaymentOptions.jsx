export default function PaymentOptions() {
  return (
    <div className="space-y-3">
      <div className="border border-gray-700 rounded-lg p-3 flex justify-between items-center bg-gray-600">
        <span className="text-white">Pagar con Mercado Pago</span>
        <div className="w-5 h-5 border border-amber-500 rounded-sm"></div>
      </div>

      <div className="border border-dashed border-gray-500 rounded-lg p-3 flex justify-between items-center">
        <span className="text-gray-400">Tarjeta de crédito (Próximamente)</span>
      </div>

      <div className="border border-dashed border-gray-500 rounded-lg p-3 flex justify-between items-center">
        <span className="text-gray-400">Transferencia (Próximamente)</span>
      </div>
    </div>
  );
}
