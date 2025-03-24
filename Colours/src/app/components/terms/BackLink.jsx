import Link from "next/link";

export default function BackLink() {
  return (
    <div className="mt-6 text-left pl-8">
      <Link href="/register" legacyBehavior>
        <a className="text-white-500 hover:underline">Volver atrás</a>
      </Link>
    </div>
  );
}
