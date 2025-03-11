"use client";
import Login from "../../component/login/login";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <Link href="/">
        <button className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-700">
          Home
        </button>
      </Link>
      <Login />
    </div>
  );
}
