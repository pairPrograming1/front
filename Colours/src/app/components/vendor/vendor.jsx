"use client"

import Header from "./Header"
import VideoPlayer from "./VideoPlayer"
import ActionButtons from "./ActionButtons"

export default function Vendor() {
  return (
    <div className="flex flex-col min-h-screen text-white relative overflow-hidden">

      <VideoPlayer />
      <ActionButtons />
    </div>
  )
}

