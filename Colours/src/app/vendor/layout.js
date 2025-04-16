
import { Inter } from "next/font/google"
import Navbar from "@/app/components/vendor/nabbarVend"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "XEVENT",
  description: "Plataforma de venta de entradas",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-[#12151f]`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
