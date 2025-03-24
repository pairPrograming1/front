import Link from "next/link";

export default function BackLink() {
  return (
    <div className="mt-6 text-left">
      <Link href="/" className="text-white-500 hover:underline">
        Volver atrás
      </Link>
    </div>
  );
}
