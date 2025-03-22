/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect, useRef, ReactElement } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, BrainCircuit, CheckCircle2, Terminal, CheckCheck, X } from "lucide-react"
import Image from "next/image"
import { questions } from "@/lib/constants"

// IQ test questions


interface IQTestProps {
    username: string
}

export default function IQTest({ username }: IQTestProps): ReactElement {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [showResults, setShowResults] = useState<boolean>(false)
    const [score, setScore] = useState<number>(0)
    const [iqScore, setIqScore] = useState<number>(0)
    const [timeRemaining, setTimeRemaining] = useState<number>(1500) // 25 minutes in seconds
    const [testSubmitted, setTestSubmitted] = useState<boolean>(false)
    const [showConsole, setShowConsole] = useState<boolean>(false)
    const [consoleOutput, setConsoleOutput] = useState<string[]>([])
    const [isProving, setIsProving] = useState<boolean>(false)
    const [isProved, setIsProved] = useState<boolean>(false)
    const consoleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const savedProgress = sessionStorage.getItem(`iqtest_progress_${username}`)
        if (savedProgress) {
            try {
                const progress = JSON.parse(savedProgress)
                setCurrentQuestion(progress.currentQuestion || 0)
                setAnswers(progress.answers || {})
                setTimeRemaining(progress.timeRemaining || 1500)

                // If the test was already submitted, show results
                if (progress.testSubmitted) {
                    setScore(progress.score || 0)
                    setIqScore(progress.iqScore || 0)
                    setShowResults(true)
                    setTestSubmitted(true)
                    setIsProved(progress.isProved || false)
                }
            } catch (error) {
                console.error("Error parsing saved progress:", error)
            }
        }
    }, [username])

    // Save progress to sessionStorage
    const saveProgress = () => {
        const progress = {
            currentQuestion,
            answers,
            timeRemaining,
            testSubmitted,
            score,
            iqScore,
            isProved,
        }
        sessionStorage.setItem(`iqtest_progress_${username}`, JSON.stringify(progress))
    }

    // Timer effect
    useEffect(() => {
        if (!showResults && !testSubmitted) {
            const timer = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer)
                        calculateResults()
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [showResults, testSubmitted])

    // Save progress when relevant state changes
    useEffect(() => {
        saveProgress()
    }, [currentQuestion, answers, timeRemaining, testSubmitted, score, iqScore, isProved])

    // Auto-scroll console to bottom
    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight
        }
    }, [consoleOutput])

    const handleAnswer = (answer: string) => {
        setAnswers({
            ...answers,
            [questions[currentQuestion].id]: answer,
        })
    }

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        }
    }

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }

    const calculateResults = () => {
        let correctAnswers = 0

        questions.forEach((q) => {
            if (answers[q.id] === q.correctAnswer) {
                correctAnswers++
            }
        })


        // Simple IQ calculation (for demonstration purposes)
        // Base IQ of 100, with each correct answer worth ~4 IQ points
        const calculatedIQ = Math.round(70 + correctAnswers * 4)

        setScore(correctAnswers)
        setIqScore(calculatedIQ)
        setShowResults(true)
        setTestSubmitted(true)

        // Save results to sessionStorage
        setTimeout(saveProgress, 0)
    }

    const handleProve = () => {
        setShowConsole(true)
        setIsProving(true)
        setConsoleOutput([])

        // Mock backend processing with setTimeout
        addConsoleOutput("Initializing IQ verification process...")
        addConsoleOutput(`User: ${username}`)

        setTimeout(() => {
            addConsoleOutput("Connecting to neural network...")

            setTimeout(() => {
                addConsoleOutput("Analyzing response patterns...")

                setTimeout(() => {
                    addConsoleOutput("Calculating cognitive metrics...")

                    setTimeout(() => {
                        addConsoleOutput("Applying psychometric algorithms...")

                        setTimeout(() => {
                            addConsoleOutput("Validating IQ score...")

                            setTimeout(() => {
                                addConsoleOutput("Cross-referencing with global database...")

                                setTimeout(() => {
                                    addConsoleOutput("Generating certificate...")

                                    setTimeout(() => {
                                        addConsoleOutput("Verification complete!")
                                        addConsoleOutput(`IQ Score for ${username}: ${iqScore} - Verified ✓`)
                                        setIsProving(false)
                                        setIsProved(true)
                                        saveProgress()
                                    }, 1000)
                                }, 800)
                            }, 700)
                        }, 600)
                    }, 500)
                }, 400)
            }, 300)
        }, 200)
    }

    const addConsoleOutput = (text: string) => {
        setConsoleOutput((prev) => [...prev, text])
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`
    }

    const getIQCategory = (iq: number) => {
        if (iq >= 140) return { label: "Genius or near genius", color: "text-purple-400" }
        if (iq >= 120) return { label: "Very superior intelligence", color: "text-blue-400" }
        if (iq >= 110) return { label: "Superior intelligence", color: "text-green-400" }
        if (iq >= 90) return { label: "Normal or average intelligence", color: "text-amber-400" }
        if (iq >= 80) return { label: "Dullness", color: "text-orange-400" }
        return { label: "Borderline deficiency", color: "text-red-400" }
    }

    if (showResults) {
        const category = getIQCategory(iqScore)

        return (
            <div className="p-6 border text-amber-300/90 max-h-[600px] overflow-y-auto">
                <div className="flex flex-col items-center justify-center space-y-6 py-8">
                    <div className="w-32 h-32 rounded-full bg-black border-4 border-[#e04bbd] flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-amber-500">{iqScore}</div>
                            <div className="text-xs text-amber-300/70">IQ SCORE</div>
                        </div>
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2">Test Complete</h2>
                        <p className="text-amber-300/80 mb-2">User: {username}</p>
                        <p className={`text-xl font-semibold ${category.color}`}>{category.label}</p>
                        <p className="mt-4 text-amber-300/80">
                            You answered <span className="text-amber-500 font-bold">{score}</span> out of{" "}
                            <span className="text-amber-500 font-bold">{questions.length}</span> questions correctly.
                        </p>
                    </div>

                    <div className="grid grid-cols-5 gap-2 w-full max-w-md mt-6">
                        {questions.map((q, index) => (
                            <div
                                key={q.id}
                                className={`w-10 h-10 flex items-center justify-center rounded-full border ${answers[q.id] === q.correctAnswer
                                    ? "border-green-500 bg-green-500/20 text-green-400"
                                    : "border-red-500 bg-red-500/20 text-red-400"
                                    }`}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>

                    {showConsole && (
                        <div className="w-full mt-6 relative">
                            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                                {/* Window title bar */}
                                <div className="flex items-center bg-gradient-to-r from-gray-200 to-gray-300 py-1 px-2 relative border-b border-gray-300">
                                    <div className="flex items-center space-x-1.5 absolute left-1.5">
                                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                                        <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="mx-auto flex items-center">
                                        <Terminal className="h-3 w-3 text-gray-700 mr-1" />
                                        <span className="text-gray-700 font-medium text-xs">VERIFICATION CONSOLE</span>
                                    </div>
                                    <div>
                                        <X onClick={() => setShowConsole(false)} className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700" />
                                    </div>
                                </div>
                                <div className="bg-black p-2">
                                    <div ref={consoleRef} className="font-mono text-xs h-40 overflow-y-auto p-2 bg-black/50 rounded">
                                        {consoleOutput.map((line, index) => (
                                            <div key={index} className="mb-1">
                                                <span className="text-green-400">{">"}</span> <span className="text-amber-300">{line}</span>
                                            </div>
                                        ))}
                                        {isProving && <div className="inline-block animate-pulse">_</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isProved && (
                        <div className="w-full relative">
                            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                                {/* Window title bar */}
                                <div className="flex items-center bg-gradient-to-r from-gray-200 to-gray-300 py-1 px-2 relative border-b border-gray-300">
                                    <div className="flex items-center space-x-1.5 absolute left-1.5">
                                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                                        <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="mx-auto flex items-center">
                                        <CheckCheck className="h-3 w-3 text-gray-700 mr-1" />
                                        <span className="text-gray-700 font-medium text-xs">VERIFICATION STATUS</span>
                                    </div>
                                </div>
                                <div className="bg-black p-3">
                                    <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 flex items-center gap-3">
                                        <CheckCheck className="h-6 w-6 text-green-400" />
                                        <div>
                                            <h3 className="font-bold text-green-400">Verification Successful</h3>
                                            <p className="text-sm text-green-300/80">Your IQ score has been verified and recorded.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4 mt-6">
                        <Button
                            onClick={() => {
                                setShowResults(false)
                                setCurrentQuestion(0)
                                setAnswers({})
                                setTimeRemaining(1500)
                                setTestSubmitted(false)
                                setShowConsole(false)
                                setConsoleOutput([])
                                setIsProving(false)
                                setIsProved(false)
                            }}
                            className="bg-amber-500 hover:bg-amber-600 text-black"
                        >
                            Retake Test
                        </Button>

                        {!isProved && (
                            <Button
                                onClick={handleProve}
                                disabled={isProving}
                                className={`${isProving ? "bg-gray-500 cursor-not-allowed" : "bg-[#e04bbd] hover:bg-[#e04bbd]/80"} text-white font-bold`}
                            >
                                {isProving ? "Proving..." : "Prove"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    const currentQ = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100
    const hasAnswered = answers[currentQ.id] !== undefined

    return (
        <div className="p-6 text-amber-300/90 relative max-h-[600px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 mt-4">
                <div className="flex items-center space-x-2">
                    <BrainCircuit className="h-5 w-5 text-amber-500" />
                    <span className="text-sm font-mono">
                        Question {currentQuestion + 1}/{questions.length}
                    </span>
                </div>
                <div className="flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full border border-[#e04bbd]">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-mono">{formatTime(timeRemaining)}</span>
                </div>
            </div>

            <Progress value={progress} className="h-1 mb-6 bg-gray-800" />

            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md mb-6">
                {/* Window title bar */}

                <div className="bg-black p-4">
                    <h2 className="text-xl font-bold mb-4">{currentQ.question}</h2>

                    {currentQ.image && (
                        <div className="my-4 flex justify-center">
                            <Image
                                width={400}
                                height={150}
                                src={currentQ.image || "/placeholder.svg"}
                                alt="Question visual"
                                className="max-w-full rounded border-2 border-[#e04bbd]"
                            />
                        </div>
                    )}

                    <div className="grid gap-3 mt-6">
                        {currentQ.options.map((option) => (
                            <div
                                key={option}
                                onClick={() => handleAnswer(option)}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${answers[currentQ.id] === option
                                    ? "bg-[#e04bbd]/20 border-[#e04bbd]"
                                    : "bg-black/20 border-[#e04bbd]/50 hover:bg-black/40"
                                    }`}
                            >
                                <div className="flex items-center">
                                    <div
                                        className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${answers[currentQ.id] === option ? "bg-[#e04bbd]" : "border border-[#e04bbd]/50"
                                            }`}
                                    >
                                        {answers[currentQ.id] === option && <CheckCircle2 className="h-3 w-3 text-black" />}
                                    </div>
                                    <span>{option}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <Button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    variant="outline"
                    className="border-[#e04bbd] text-amber-300 hover:bg-[#e04bbd]/10"
                >
                    Previous
                </Button>

                {currentQuestion < questions.length - 1 ? (
                    <Button
                        onClick={nextQuestion}
                        disabled={!hasAnswered}
                        className={`${hasAnswered ? "bg-amber-500 hover:bg-amber-600" : "bg-gray-500 cursor-not-allowed"} text-black`}
                    >
                        Next
                    </Button>
                ) : (
                    <Button
                        onClick={calculateResults}
                        disabled={!hasAnswered}
                        className={`${hasAnswered ? "bg-amber-500 hover:bg-amber-600" : "bg-gray-500 cursor-not-allowed"} text-black font-bold`}
                    >
                        Show
                    </Button>
                )}
            </div>
        </div>
    )
}

