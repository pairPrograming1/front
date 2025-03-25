"use client";

export default function InputField({ label, type, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-300 text-sm font-bold mb-2">
        {label}:
      </label>
      <input
        className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-green-400 bg-gray-700"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
