import "./globals.css";

export const metadata = {
  title: "Colour Admin",
  description: "Panel de administración para Colour",
};

export default function RootLayout({ children }) {
  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl h-screen  bg-[#1E2330]/70 shadow-md rounded-xl overflow-hidden">
        <main className="h-full overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
