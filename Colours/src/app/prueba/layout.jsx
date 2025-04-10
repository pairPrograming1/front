import "./globals.css";

export const metadata = {
  title: "Colour Admin",
  description: "Panel de administración para Colour",
};

export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
