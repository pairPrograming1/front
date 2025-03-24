export default function InputField({ id, type, placeholder, label }) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-300 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 hover:border-green-400 transition-colors"
      />
    </div>
  );
}
