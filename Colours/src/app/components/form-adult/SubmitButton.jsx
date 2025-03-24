export default function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-full mt-4 transition-colors"
    >
      {text}
    </button>
  );
}
