import Header from "./Header";
import VideoPlayer from "./VideoPlayer";
import ActionButtons from "./ActionButtons";

export default function VendorLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen  text-white relative overflow-hidden">
      <Header />
      <VideoPlayer />
      <ActionButtons />
      {children}
    </div>
  );
}
