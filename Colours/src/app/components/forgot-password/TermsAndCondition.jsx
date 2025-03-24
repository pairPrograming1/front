import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="mt-4 text-center">
      <span className="text-gray-300">
        Al registrarte aceptas nuestros{" "}
        <Link href="/terms" legacyBehavior>
          <a className="text-blue-500 hover:text-blue-700">
            términos, condiciones y políticas de privacidad
          </a>
        </Link>
      </span>
    </div>
  );
}
