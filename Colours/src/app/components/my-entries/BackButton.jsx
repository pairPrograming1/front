export default function BackButton() {
  return (
    <div className="mt-6 text-left">
      <button
        onClick={() => window.history.back()}
        className="text-white-500 hover:underline"
      >
        Volver Atrás
      </button>
    </div>
  );
}
