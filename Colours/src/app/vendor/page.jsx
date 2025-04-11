"use client";
import Vendor from "../components/vendor/vendor";

export default function VendorPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 p-4">
      <div className="w-full max-w-6xl bg-[#1E2330]/70 space-y-4 z-10 p-6 rounded-xl shadow-lg">
        <Vendor />
      </div>
    </main>
  );
}
