export default function InputField({ label, id, type, placeholder }) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-300 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border border-green-500 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
