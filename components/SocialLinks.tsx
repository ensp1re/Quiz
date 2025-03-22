import { Twitter, Globe } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SocialLinks() {
    return (
        <div className="absolute top-4 right-4 flex flex-col items-end space-y-3 z-[100]">
            <a
                href="https://www.succinct.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-black/60 px-3 py-2 rounded-full border border-[#e04bbd] hover:bg-black/80 transition-colors"
            >
                <Avatar className="h-6 w-6">
                    <AvatarImage src="/images/succinct.jpg" alt="SuccinctLabs" />
                    <AvatarFallback>SL</AvatarFallback>
                </Avatar>
                <span className="text-amber-300 text-sm">SuccinctLabs</span>
                <Globe className="h-4 w-4 text-[#e04bbd]" />
            </a>

            <a
                href="https://twitter.com/0xCRASHOUT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-black/60 px-3 py-2 rounded-full border border-[#e04bbd] hover:bg-black/80 transition-colors"
            >
                <Avatar className="h-6 w-6">
                    <AvatarImage src="/images/0x.jpg" alt="CEO" />
                    <AvatarFallback>CEO</AvatarFallback>
                </Avatar>
                <span className="text-amber-300 text-sm">0xCRASHOUT</span>
                <Twitter className="h-4 w-4 text-[#e04bbd]" />
            </a>
        </div>
    )
}

