"use client";
import Vendor from "../components/vendor/vendor";

export default function VendorPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-4 z-10">
        <Vendor />
      </div>
    </main>
  );
}
