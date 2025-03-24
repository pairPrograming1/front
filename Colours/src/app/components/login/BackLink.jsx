import Link from "next/link";

export default function BackLink({ href, text }) {
  return (
    <div className="mt-6 text-left">
      <Link
        href={href}
        className="text-gray-400 hover:text-white text-sm transition-colors"
      >
        ← {text}
      </Link>
    </div>
  );
}
