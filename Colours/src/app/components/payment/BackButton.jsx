import Link from "next/link";

export default function BackButton() {
  return (
    <div className="mt-6 text-left">
      <Link href="/" passHref className="text-white text-sm hover:underline">
        Volver atrás
      </Link>
    </div>
  );
}
