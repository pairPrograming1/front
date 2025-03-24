import Header from "./Header";
import EventImage from "./EventImage";
import EventDetails from "./EventDetails";
import EventDescription from "./EventDescription";
import BackLink from "./BackLink";

export default function Event() {
  return (
    <div className="min-h-screen bg-gray-0 text-white p-8">
      <Header />
      <main className="bg-gray-0 p-6 rounded-lg">
        <EventImage />
        <EventDetails />
        <EventDescription />
        <BackLink />
      </main>
    </div>
  );
}
