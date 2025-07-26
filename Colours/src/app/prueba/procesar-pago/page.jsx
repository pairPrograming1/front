"use client";

import FiservPaymentComponent from "../components/fiserv";

export default function Home() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <FiservPaymentComponent
        onClose={() => {
          // Lógica para cerrar el componente
          console.log("Modal de pago cerrado");
          // Puedes redirigir o hacer otras acciones aquí
        }}
      />
    </div>
  );
}
