export default function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="w-full bg-gray-800 hover:bg-gray-700 text-white rounded-full py-2 mt-6"
    >
      {text}
    </button>
  );
}
