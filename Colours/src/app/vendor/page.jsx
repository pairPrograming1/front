"use client";
import Vendor from "../components/vendor/vendor";

export default function VendorPage() {
  return (
    <main className="flex-1 flex flex-col items-center  justify-center p-4">
      <div className="w-full max-w-6xl bg-[#1E2330]/70 space-y-4 z-10">
        <Vendor />
      </div>
    </main>
  );
}
