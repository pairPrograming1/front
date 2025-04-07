"use client";

export default function ResetButton({ onClick }) {
  return (
    <button
      className="w-full bg-gradient-to-r from-[#C28B60] to-[#C28B60] hover:from-[#C28B60] hover:to-[#C28B60] text-white font-medium py-3 px-4 rounded-xl md:rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base shadow-lg hover:shadow-xl flex items-center justify-center"
      type="button"
      onClick={onClick}
    >
      Resetear Contraseña
    </button>
  );
}
