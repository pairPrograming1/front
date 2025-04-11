"use client";

import { useState } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";
import SalonModal from "../../app/prueba/components/salon-modal";
import Header from "../../app/prueba/components/header";

export default function Salones() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <div className="welcome-message text-center mt-10">
        <h2 className="text-xl font-semibold">
          ¡Bienvenido a la app de gestión !
        </h2>
        <p className="mt-2 text-white-600">
          Desde aquí puedes gestionar todos lo que necesite.
        </p>
      </div>

      {showModal && <SalonModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
