export default function Summary({ subtotal, serviceFee, total }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR").format(value);
  };

  return (
    <div className="border-t border-dashed border-gray-600 pt-4 bg-gray-700 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4 text-center">Resumen de Compra</h3>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Subtotal:</span>
          <span>{formatCurrency(subtotal)}$</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Cargo de Servicio:</span>
          <span>{formatCurrency(serviceFee)}$</span>
        </div>
        <div className="bg-teal-500 text-white rounded p-3 mt-3 flex justify-between">
          <span className="font-medium">Total a pagar:</span>
          <span className="font-medium">{formatCurrency(total)}$</span>
        </div>
      </div>
    </div>
  );
}
