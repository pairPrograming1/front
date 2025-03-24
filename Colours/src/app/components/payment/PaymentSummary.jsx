export default function PaymentSummary() {
  return (
    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
      <div className="flex justify-between mb-1">
        <span className="text-gray-300">Subtotal</span>
        <span className="text-white">260.000$</span>
      </div>
      <div className="flex justify-between text-sm text-gray-400 mb-3">
        <span>+ Cargo por servicio</span>
        <span>2600$</span>
      </div>
      <div className="flex justify-between font-bold text-white">
        <span>Total a pagar</span>
        <span>262.600$</span>
      </div>
    </div>
  );
}
