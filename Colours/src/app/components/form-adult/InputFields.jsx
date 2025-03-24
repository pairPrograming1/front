export default function InputField({
  type,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-transparent text-white border border-teal-400 rounded-full py-3 px-4 focus:outline-none focus:ring-1 focus:ring-teal-300"
    />
  );
}
