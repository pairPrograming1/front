export default function Summary({ subtotal, serviceFee, total }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR").format(value);
  };

  return (
    <div className="mt-6 border-t border-dashed border-gray-600 pt-4">
      <div className="flex justify-between mb-2">
        <span className="text-gray-400">Subtotal</span>
        <span>{formatCurrency(subtotal)}$</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-400">Cargo de Servicio</span>
        <span>{formatCurrency(serviceFee)}$</span>
      </div>
      <div className="bg-white bg-opacity-10 rounded p-3 mt-2 mb-4">
        <div className="flex justify-between">
          <span className="font-medium">Total a pagar:</span>
          <span className="font-medium">{formatCurrency(total)}$</span>
        </div>
      </div>
    </div>
  );
}
