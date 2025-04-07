"use client"

export default function InputField({ id, type, label, showPassword, togglePassword }) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder={label}
        className="w-full bg-transparent text-[#FFFFFF] border border-[#BF8D6B] rounded-md py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#BF8D6B] placeholder-[#EDEEF0]/70"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#EDEEF0]"
        >
          {/* Aquí irían tus iconos de ojo abierto/cerrado */}
        </button>
      )}
    </div>
  )
}

