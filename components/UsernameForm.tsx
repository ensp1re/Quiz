"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface UsernameFormProps {
    onSubmit: (username: string) => void
}

export default function UsernameForm({ onSubmit }: UsernameFormProps) {
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!username.trim()) {
            setError("Username is required")
            return
        }

        if (username.length < 3) {
            setError("Username must be at least 3 characters")
            return
        }

        // Save to sessionStorage
        sessionStorage.setItem("iqtest_username", username)
        onSubmit(username)
    }

    return (
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md w-full max-w-md">
            {/* Window title bar */}
            <div className="flex items-center bg-gradient-to-r from-gray-200 to-gray-300 py-2 px-4 relative border-b border-gray-300">
                <div className="flex items-center space-x-2 absolute left-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="mx-auto flex items-center">
                    <span className="text-gray-700 font-medium text-sm">User Registration</span>
                </div>
            </div>

            <div className="bg-black p-6">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-amber-500">Welcome to VeriStar IQ Test</h2>
                    <p className="text-amber-300/80 mt-2">Please enter your username to begin the test</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-amber-400 text-sm mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                                setError("")
                            }}
                            className="w-full px-3 py-2 bg-black border-2 border-[#e04bbd] rounded-md text-amber-300 focus:outline-none focus:ring-2 focus:ring-[#e04bbd]"
                            placeholder="Enter your username"
                        />
                        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
                    </div>

                    <div className="pt-2">
                        <Button type="submit" className="w-full bg-[#e04bbd] hover:bg-[#e04bbd]/80 text-white font-bold">
                            Start Test
                        </Button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-xs text-amber-300/60">
                        Your username will be used to identify your test results.
                        <br />
                        This session will be saved in your browser.
                    </p>
                </div>
            </div>
        </div>
    )
}

