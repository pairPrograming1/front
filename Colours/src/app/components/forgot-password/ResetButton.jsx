export default function ResetButton({ onClick }) {
  return (
    <div className="flex items-center justify-center">
      <button
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-full w-full focus:outline-none focus:shadow-outline"
        type="button"
        onClick={onClick}
      >
        Resetear Contraseña
      </button>
    </div>
  );
}
