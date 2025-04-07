export default function FacturaCard() {
  return (
    <div className="border border-[#C28B60] rounded-lg p-6 mb-6 bg-gray-700">
      <div className="grid grid-cols-2 gap-4">
        <div className="border-r border-[#C28B60] pr-4">
          <h3 className="text-[#C28B60] font-medium mb-1">Factura Impaga</h3>
          <p className="text-xs text-gray-400">Subtotal 2000+2025</p>
          <p className="text-xs text-gray-400">Impuesto 000000</p>
          <p className="text-xs text-gray-400">Total de pago 24/02/2025</p>
        </div>
        <div>
          <h3 className="text-[#C28B60] font-medium mb-1">Factura Impaga</h3>
          <p className="text-xs text-gray-400">Subtotal 2000+2025</p>
          <p className="text-xs text-gray-400">Impuesto 000000</p>
          <p className="text-xs text-gray-400">Total de pago 24/02/2025</p>
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === 0 ? "bg-[#C28B60]" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
