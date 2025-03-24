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
    <div onMouseMove={handleMouseMove}>
      <TermsContent />
      <BackLink />
    </div>
  );
}
