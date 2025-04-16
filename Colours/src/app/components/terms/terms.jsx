"use client";

import { useState } from "react";
import TermsContent from "./TermContent";
import BackLink from "./BackLink";

export default function TermsAndConditions() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 px-4"
    >
      <div className="w-full max-w-5xl bg-[#1E2330]/70 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-lg">
        <TermsContent />
        <div className="mt-6">
          <BackLink />
        </div>
      </div>
    </div>
  );
}
