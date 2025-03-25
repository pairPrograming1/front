"use client";

export default function InputField({ label, type, id, value, onChange }) {
  return (
    <div className="relative">
      <label
        className="block text-gray-300 text-sm font-bold mb-1"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={label}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-900/50 text-white border border-gray-700 focus:border-teal-400 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-teal-300 text-sm md:text-base transition-all placeholder-gray-500"
      />
    </div>
  );
}
