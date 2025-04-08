import Header from "./Header";
import VideoPlayer from "./VideoPlayer";
import ActionButton from "./ActionButtons";

export default function VendorLayout({ children }) {
  return (
    <div>
      <Header />
      <VideoPlayer />
      <ActionButton />
    </div>
  );
}
