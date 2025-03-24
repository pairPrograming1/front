"use client";

import Link from "next/link";

export default function BackButton({ onClick }) {
  return (
    <div className="text-left">
      <Link
        href="/"
        onClick={onClick}
        className="text-gray-400 hover:text-teal-400 transition-colors text-sm md:text-base flex items-center group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Volver atrás
      </Link>
    </div>
  );
}
