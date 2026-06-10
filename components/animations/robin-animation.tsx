"use client"

import { AnimationProps } from "./types"

/**
 * ROBIN ANIMATION - VIDEO REPLACEMENT
 * 
 * Replaces the code-based animation with a high-fidelity pre-rendered video
 * as requested by the user.
 */
export const RobinAnimation = ({ w, h, animationKey }: AnimationProps) => {
    return (
        <div className="fixed inset-0 z-[9000] overflow-hidden bg-black">
            <video
                key={`robin-video-${animationKey}`}
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2"
                style={{ filter: "brightness(0.9)" }} // Slight dim to ensure text readability if needed
            >
                <source src="/videos/RobinCinematic.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Optional Overlay for Title if needed, keeping it minimal as the video likely has it or user wants pure video */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
    )
}
