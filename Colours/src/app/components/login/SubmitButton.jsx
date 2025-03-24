export default function SubmitButton({ text, onClick }) {
  return (
    <button
      className="bg-gray-800 border border-transparent hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
