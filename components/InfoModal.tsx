"use client"
import { X, Twitter } from "lucide-react"

interface InfoModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-2xl bg-gray-100 rounded-lg overflow-hidden shadow-2xl">
                {/* Window title bar */}
                <div className="flex items-center bg-gradient-to-r from-gray-200 to-gray-300 py-2 px-4 relative border-b border-gray-300">
                    <div className="flex items-center space-x-2 absolute left-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"></div>
                    </div>
                    <div className="mx-auto flex items-center">
                        <span className="text-gray-700 font-medium text-sm">System Information</span>
                    </div>
                    <button onClick={onClose} className="absolute right-2 text-gray-500 hover:text-gray-700">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="bg-black p-6 text-amber-300/90 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-amber-500 mb-2">VeriStar IQ Test v1.0</h3>
                            <p className="text-sm">
                                Welcome to the VeriStar IQ Test System. This advanced cognitive assessment tool is designed to measure
                                your intelligence quotient through a series of 25 challenging questions.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-amber-500 mb-2">Test Instructions</h3>
                            <ul className="list-disc pl-5 space-y-2 text-sm">
                                <li>Answer each question to the best of your ability</li>
                                <li>The test has a time limit of 25 minutes</li>
                                <li>Your final IQ score will be calculated based on your performance</li>
                                <li>Questions cover logical reasoning, pattern recognition, and mathematical ability</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-amber-500 mb-2">System Requirements</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                {[
                                    { title: "CPU", value: "Neural Processor v7.2" },
                                    { title: "MEMORY", value: "16 TB Quantum RAM" },
                                    { title: "OS", value: "VeriStar OS 12.4" },
                                    { title: "SECURITY", value: "Quantum Encryption" },
                                ].map((item, index) => (
                                    <div key={index} className="bg-gray-100 rounded overflow-hidden">
                                        {/* Mini window */}
                                        <div className="flex items-center bg-gradient-to-r from-gray-200 to-gray-300 py-0.5 px-1 relative border-b border-gray-300">
                                            <div className="flex items-center space-x-1 absolute left-1">
                                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                            </div>
                                            <div className="mx-auto">
                                                <span className="text-gray-700 font-medium text-[10px]">{item.title}</span>
                                            </div>
                                        </div>
                                        <div className="bg-black p-2">
                                            <p>{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#e04bbd]/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-amber-300/70">© 2025 VeriStar Systems</p>
                                    <p className="text-xs text-amber-300/70">All rights reserved</p>
                                </div>
                                <a
                                    href="https://twitter.com/0xEnsp1re"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-1 text-[#e04bbd] hover:text-[#e04bbd]/80 transition-colors"
                                >
                                    <Twitter className="h-4 w-4" />
                                    <span className="text-sm">@0xEnsp1re</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

