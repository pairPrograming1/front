export default function InfoCard({ title, date, buttonText }) {
  return (
    <div className="bg-gray-800 p-6 rounded-3xl border border-teal-500/50 shadow-md">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-400 mb-4">Último registrado el {date}</p>
      <button className="bg-teal-500 text-white font-medium py-2 px-6 rounded-full w-full hover:bg-teal-600 transition-colors">
        {buttonText}
      </button>
    </div>
  );
}
