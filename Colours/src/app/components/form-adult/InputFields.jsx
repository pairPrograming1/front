"use client";

export default function InputField({
  type,
  name,
  placeholder,
  value,
  onChange,
}) {
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
    </div>
  );
}
