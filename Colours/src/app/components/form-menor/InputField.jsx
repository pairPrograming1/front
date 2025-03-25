"use client";

export default function InputField({
  type,
  name,
  placeholder,
  value,
  onChange,
}) {
  const icons = {
    email:
      "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    whatsapp:
      "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    dni: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4z",
    nombreApellido:
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  };

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-900/50 text-white border border-gray-700 focus:border-teal-400 rounded-xl md:rounded-full py-3 md:py-4 px-4 md:px-6 focus:outline-none focus:ring-1 focus:ring-teal-300 text-sm md:text-base transition-all placeholder-gray-500"
      />
      {icons[name] && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d={icons[name]}
            />
          </svg>
        </div>
      )}
    </div>
  );
}
