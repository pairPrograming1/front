"use client";
import Header from "./Header";
import EventImage from "./EventImage";
import EventDetails from "./EventDetails";
import EventDescription from "./EventDescription";
import BackLink from "./BackLink";

export default function Event() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 text-white px-4 py-8">
      <div className="w-full max-w-3xl bg-gray-900/50 p-6 sm:p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-teal-400/20">
        <div className="mb-6">
          <Header />
        </div>
        <EventImage />
        <EventDetails />
        <EventDescription />
        <div className="mt-8">
          <BackLink />
        </div>
      </div>
    </main>
  );
}
