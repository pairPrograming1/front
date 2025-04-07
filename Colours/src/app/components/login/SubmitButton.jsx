"use client"

export default function SubmitButton({ text, onClick, disabled }) {
  return (
    <button
      className="w-full bg-[#BF8D6B] hover:bg-[#BF8D6B]/90 text-white font-medium py-3 px-4 rounded-md transition-all duration-300 mt-2"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

