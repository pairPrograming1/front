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
      className="w-full bg-transparent border border-gray-500 rounded-full text-white placeholder:text-gray-300 px-4 py-2"
    />
  );
}
