import { ArrowLeft, User } from "lucide-react"
import Link from "next/link"

export default function Header({ title, showBack = false }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        {showBack && (
          <Link href="/" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        )}
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-400">
          
         
        </div>
      </div>
    </div>
  )
}
