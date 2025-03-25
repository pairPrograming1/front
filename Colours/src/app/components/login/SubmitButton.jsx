"use client";

export default function SubmitButton({ text, onClick }) {
  return (
    <button
      className="w-full bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white font-medium py-3 px-4 rounded-xl md:rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base shadow-lg hover:shadow-xl flex items-center justify-center"
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
