"use client";
import { useEffect, useState } from "react";
import PasswordRecoveryForm from "./PasswordRecoveryForm";

export default function ForgotPassword() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <PasswordRecoveryForm />
    </div>
  );
}
