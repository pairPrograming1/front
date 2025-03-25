export default function PaymentSummary() {
  return (
    <div className="bg-gray-800 rounded-xl p-8 border-2 border-gray-700 shadow-md">
      <div className="flex justify-between mb-3">
        <span className="text-gray-300 text-lg">Subtotal</span>
        <span className="text-white text-lg">260.000$</span>
      </div>
      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>+ Cargo por servicio</span>
        <span>2600$</span>
      </div>
      <div className="flex justify-between font-bold text-xl text-white">
        <span>Total a pagar</span>
        <span>262.600$</span>
      </div>
    </div>
  );
}
