export default function SalesSummary() {
  return (
    <div className="bg-[#252e3f] border border-gray-700 rounded-md p-4 mb-4">
      <h3 className="text-lg font-medium">Ventas Realizadas</h3>
      <div className="text-sm text-gray-400">
        <p>Total eventos: 20</p>
        <p>Eventos con tarifa: 23</p>
      </div>
      <p className="text-sm mt-2">Promedio de cobro en eventos: 83.5%</p>
    </div>
  );
}
