import Link from "next/link";

export default function BackLink({ href, text }) {
  return (
    <div className="mt-6 text-left">
      <Link href={href} className="text-white-500 hover:underline">
        <span>{text}</span>
      </Link>
    </div>
  );
}
