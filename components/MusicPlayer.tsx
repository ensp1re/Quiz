"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface MusicPlayerProps {
    src?: string
}

export default function MusicPlayer({ src = "" }: MusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(70)
    const [isMuted, setIsMuted] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(src)
    const [isExpanded, setIsExpanded] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100
        }
    }, [volume])

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch((error) => {
                    console.error("Error playing audio:", error)
                    setIsPlaying(false)
                })
            } else {
                audioRef.current.pause()
            }
        }
    }, [isPlaying])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted
        }
    }, [isMuted])

    useEffect(() => {
        setCurrentTrack(src)
        setIsPlaying(false)
    }, [src])

    const togglePlay = () => setIsPlaying(!isPlaying)
    const toggleMute = () => setIsMuted(!isMuted)

    const handleSetTrack = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTrack(e.target.value)
        if (audioRef.current) {
            audioRef.current.src = e.target.value
            setIsPlaying(false)
        }
    }

    return (
        <div className="absolute bottom-4 left-4 z-10">
            <div
                className={`bg-black/80 border border-[#e04bbd] rounded-lg p-3 transition-all ${isExpanded ? "w-64" : "w-auto"}`}
            >
                <audio ref={audioRef} src={currentTrack} />

                <div className="flex items-center justify-between">
                    <button
                        onClick={togglePlay}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e04bbd] text-white"
                    >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>

                    <button onClick={() => setIsExpanded(!isExpanded)} className="ml-2 text-amber-300 hover:text-amber-400">
                        <Music size={18} />
                    </button>

                    {isExpanded && (
                        <>
                            <button onClick={toggleMute} className="ml-2 text-amber-300 hover:text-amber-400">
                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>

                            <Slider
                                className="w-24 ml-2"
                                value={[volume]}
                                max={100}
                                step={1}
                                onValueChange={(value) => setVolume(value[0])}
                            />
                        </>
                    )}
                </div>

                {isExpanded && (
                    <div className="mt-3">
                        <input
                            type="text"
                            value={currentTrack}
                            onChange={handleSetTrack}
                            placeholder="Enter audio URL"
                            className="w-full text-xs bg-black/60 border border-[#e04bbd]/50 rounded px-2 py-1 text-amber-300"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

