import Link from "next/link";

export default function BackButton() {
  return (
    <div className="mt-6 text-left">
      <Link
        href="/"
        className="text-gray-400 hover:text-white hover:underline transition-colors"
      >
        Volver atrás
      </Link>
    </div>
  );
}
