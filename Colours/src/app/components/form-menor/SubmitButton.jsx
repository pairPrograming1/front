"use client";

export default function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="w-full bg-[#C28B60] hover:bg-[#a77452] text-white font-medium py-3 md:py-4 px-4 rounded-xl md:rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base shadow-lg hover:shadow-xl flex items-center justify-center"
    >
      {text}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </button>
  );
}
