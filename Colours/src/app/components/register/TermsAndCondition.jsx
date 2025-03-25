"use client";

import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="text-center">
      <span className="text-gray-300 text-sm">
        Al registrarte aceptas nuestros{" "}
        <Link
          href="/terms"
          className="text-white hover:text-teal-400 transition-colors"
        >
          términos, condiciones y políticas de privacidad
        </Link>
      </span>
    </div>
  );
}
