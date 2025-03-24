import Link from "next/link";

export default function BackButton() {
  return (
    <div className="mt-8 text-center sm:text-left">
      <Link
        href="/"
        passHref
        className="text-gray-300 text-lg font-semibold hover:underline hover:text-indigo-500 transition-all duration-200"
      >
        Volver atrás
      </Link>
    </div>
  );
}
