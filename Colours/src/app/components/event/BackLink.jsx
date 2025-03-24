import Link from "next/link";

export default function BackLink() {
  return (
    <div className="mt-12 text-center">
      <Link href="/" className="text-teal-300 hover:underline text-lg">
        ← Volver atrás
      </Link>
    </div>
  );
}
