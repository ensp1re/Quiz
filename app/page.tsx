"use client"

import { useState, useEffect } from "react"
import { Twitter } from "lucide-react"
import InfoModal from "@/components/InfoModal"
import UsernameForm from "@/components/UsernameForm"
import IQTest from "@/components/IqTest"
import SocialLinks from "@/components/SocialLinks"
import MusicPlayer from "@/components/MusicPlayer"

export default function Home() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on page load
  useEffect(() => {
    const savedUsername = sessionStorage.getItem("iqtest_username")
    if (savedUsername) {
      setUsername(savedUsername)
    }
    setIsLoading(false)
  }, [])

  const handleUsernameSubmit = (username: string) => {
    setUsername(username)
  }

  if (isLoading) {

    return (
      <main className="min-h-screen bg-[#e04bbd] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-8 w-8 text-white mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <h2 className="text-white text-xl font-semibold">Loading...</h2>
          <p className="text-white text-md">Please wait while we prepare everything for you.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#e04bbd] flex flex-col items-center justify-center p-4 relative overflow-auto">
      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
      <SocialLinks />

      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[95%] h-[95%] bg-black rounded-lg border-4 border-[#e04bbd] overflow-hidden relative">
          <div className="absolute inset-0 z-0">
            {/* Stars background */}
            {Array(100)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 2 + "px",
                    height: Math.random() * 2 + "px",
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                    opacity: Math.random() * 0.7 + 0.3,
                  }}
                />
              ))}
          </div>
        </div>
      </div>

      {!username ? (
        <div className="z-10 my-8 mt-12">
          <UsernameForm onSubmit={handleUsernameSubmit} />
        </div>
      ) : (
        <>
          {/* Main window */}
          <div className="w-full max-w-4xl border-4 border-[#e04bbd] bg-gray-100 rounded-lg overflow-hidden shadow-2xl z-10 my-8 mt-12">
            {/* Window title bar */}
            <div className="flex border-4  items-center bg-gradient-to-r from-gray-200 to-gray-300 py-2 px-4 relative  border-gray-300">
              <div className="flex items-center space-x-2 absolute left-2">
                <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"></div>
              </div>

            </div>

            <div className="bg-black text-center border-b border-[#e04bbd] py-4">
              <h1 className="text-3xl md:text-4xl font-bold text-amber-500 tracking-wider">IQ Test</h1>
              <p className="text-amber-300/80 mt-2">Test your knowledge with our advanced IQ assessment system</p>
            </div>

            <div className="bg-black">
              <IQTest username={username} />
            </div>
          </div>



        </>
      )}

      {/* Twitter attribution in footer */}
      <div className="fixed bottom-4 right-4 z-20">
        <div className="bg-black/80 border-2 border-[#e04bbd] rounded-full px-3 py-1 flex items-center space-x-1">
          <span className="text-xs text-amber-300">Created by</span>
          <a
            href="https://twitter.com/0xEnsp1re"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-[#e04bbd] hover:text-[#e04bbd]/80 transition-colors"
          >
            <Twitter className="h-3 w-3" />
            <span className="text-xs font-bold">@0xEnsp1re</span>
          </a>
        </div>
      </div>
      <MusicPlayer src="/music/iq.mp3" />
    </main>
  )
}

