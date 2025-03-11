"use client";
import Register from "../../component/register/register";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div>
      <Link href="/">
        <button className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-700">
          Home
        </button>
      </Link>
      <Register />
    </div>
  );
}
