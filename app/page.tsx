"use client"

import { useState, useEffect } from "react"
import { Twitter } from "lucide-react"
import InfoModal from "@/components/InfoModal"
import UsernameForm from "@/components/UsernameForm"
import IQTest from "@/components/IqTest"

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
        <div className="text-white text-xl">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#e04bbd] flex flex-col items-center justify-center p-4 relative overflow-auto">
      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />

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
              <div className="mx-auto flex items-center">
                <span className="text-gray-700 font-medium text-sm">VeriStar IQ Test - {username}</span>
              </div>
            </div>

            <div className="bg-black text-center border-b border-[#e04bbd] py-4">
              <h1 className="text-3xl md:text-4xl font-bold text-amber-500 tracking-wider">VeriStar IQ Test</h1>
              <p className="text-amber-300/80 mt-2">Test your knowledge with our advanced IQ assessment system</p>
            </div>

            <div className="bg-black">
              <IQTest username={username} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-16 w-full max-w-4xl z-10">
            <div className="bg-black/80 border-4 border-[#e04bbd] rounded-lg p-4">
              <h3 className="text-amber-500 uppercase text-sm font-bold mb-2">SYSTEM STATUS</h3>
              <div className="text-amber-500 font-mono font-bold">NOMINAL</div>
              <div className="text-amber-400/70 text-xs mt-2">PWR: 72% | TR: 27%</div>
            </div>

            <div className="bg-black/80 border-4 border-[#e04bbd] rounded-lg p-4">
              <h3 className="text-amber-500 uppercase text-sm font-bold mb-2">Neural Grid</h3>
              <div className="h-16 bg-black border border-green-500/30 rounded grid grid-cols-12 grid-rows-6 gap-px">
                {Array(72)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="bg-green-500/10"></div>
                  ))}
              </div>
            </div>

            <div className="bg-black/80 border-4 border-[#e04bbd] rounded-lg p-4">
              <h3 className="text-amber-500 uppercase text-sm font-bold mb-2">POWER SYSTEMS</h3>
              <div className="space-y-2">
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
            </div>
            <div className="col-span-3 mt-2">
              <button
                className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded-lg font-bold"
                onClick={() => setIsInfoModalOpen(true)}
              >
                Info
              </button>
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
    </main>
  )
}

