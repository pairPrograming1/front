import "./globals.css";
import { LogoutButton } from "../../app/components/logout/LogoutButton"; // You'll need to adjust this path

export const metadata = {
  title: "Colour Admin",
  description: "Panel de administración para Colour",
};

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-8xl h-screen bg-[#1E2330]/70 shadow-md  overflow-hidden">
        <div className="flex justify-end p-4">
          <LogoutButton />
        </div>
        <main className="h-full overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
