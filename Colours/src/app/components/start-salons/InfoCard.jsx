export default function InfoCard({ title, date, buttonText }) {
  return (
    <div className="bg-gray-700 p-6 rounded-3xl border border-teal-500/30">
      <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
      <p className="text-sm text-gray-300 mb-4">Último Registrado el {date}</p>
      <button className="bg-teal-500 text-white font-medium py-2 px-6 rounded-full text-sm w-full hover:bg-teal-600 focus:outline-none focus:shadow-outline">
        {buttonText}
      </button>
    </div>
  );
}
