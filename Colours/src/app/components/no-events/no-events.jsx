"UseClient";
import Header from "./Header";
import EventCard from "./EventCard";
import BackButton from "./BackButton";

export default function NoEvents() {
  return (
    <main className="min-h-screen text-white">
      <Header />

      <div className="flex flex-col items-center justify-center px-4 py-12 h-[80vh]">
        <EventCard />

        <div className="flex justify-center mt-12 space-x-3">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-[#2a6b6b]/50"
            ></span>
          ))}
          <span className="h-2 w-2 rounded-full bg-[#2a6b6b]"></span>
        </div>
      </div>

      <BackButton />
    </main>
  );
}
