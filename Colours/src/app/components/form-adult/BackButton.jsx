export default function BackButton({ onClick }) {
  return (
    <div className="mt-6 text-left">
      <button onClick={onClick} className="text-white-500 hover:underline">
        Volver Atrás
      </button>
    </div>
  );
}
