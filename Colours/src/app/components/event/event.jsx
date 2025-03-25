"use client";
import Header from "./Header";
import EventImage from "./EventImage";
import EventDetails from "./EventDetails";
import EventDescription from "./EventDescription";
import BackLink from "./BackLink";

export default function Event() {
  return (
    <div className="min-h-screen bg-gray-900/50 text-white flex flex-col items-center p-8">
      <Header />
      <main className="w-full max-w-2xl p-6 rounded-3xl">
        <EventImage />
        <EventDetails />
        <EventDescription />
        <BackLink />
      </main>
    </div>
  );
}
