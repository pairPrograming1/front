"use client";

export default function SubmitButton({ text, onClick }) {
  return (
    <button
      className="bg-gray-800 border border-green-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline w-full transition-colors"
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
