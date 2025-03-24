export default function TermsList() {
  const terms = [
    "Usted no debe usar la aplicación para ningún propósito ilegal.",
    "Usted es responsable de mantener la confidencialidad de su cuenta y contraseña.",
    "La aplicación se proporciona 'tal cual' y 'según disponibilidad'.",
    "Nos reservamos el derecho de modificar o descontinuar la aplicación en cualquier momento.",
    "Usted acepta indemnizar y eximir de responsabilidad a la empresa por cualquier reclamo relacionado con su uso de la aplicación.",
  ];

  return (
    <ul className="list-disc list-inside mb-4">
      {terms.map((term, index) => (
        <li key={index} className="mb-2">
          {term}
        </li>
      ))}
    </ul>
  );
}
