export default function BackButton({ onClick }) {
  return (
    <div className="mt-6 text-left">
      <a
        href="/no-events"
        onClick={onClick}
        className="text-white-500 hover:underline"
      >
        Volver atrás
      </a>
    </div>
  );
}
