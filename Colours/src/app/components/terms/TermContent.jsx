import TermsList from "./TermsList";

export default function TermsContent() {
  return (
    <div className="bg-gray-800/50  p-8 rounded-lg w-full max-w-2xl text-white">
      <h1 className="text-2xl font-bold mb-4">Términos y Condiciones</h1>
      <p className="mb-4">
        Bienvenido a nuestra aplicación. Al usar esta aplicación, usted acepta
        cumplir con los siguientes términos y condiciones:
      </p>
      <TermsList />
      <p>
        Si no está de acuerdo con estos términos y condiciones, por favor no use
        nuestra aplicación.
      </p>
    </div>
  );
}
