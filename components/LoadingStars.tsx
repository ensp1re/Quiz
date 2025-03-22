"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface LoadingStarsProps {
    count?: number
    color?: string
    size?: number
}

export default function LoadingStars({ count = 5, color = "#e04bbd", size = 24 }: LoadingStarsProps) {
    return (
        <div className="flex items-center justify-center space-x-2">
            {Array.from({ length: count }).map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ y: 0 }}
                    animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.2, 1],
                        rotate: [0, 15, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        delay: index * 0.2,
                        ease: "easeInOut",
                    }}
                >
                    <Star fill={color} color={color} size={size} className="drop-shadow-lg" />
                </motion.div>
            ))}
        </div>
    )
}

