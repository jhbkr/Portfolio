"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { AnimationProps } from "./types"

/**
 * Robin Theme Change Animation
 * PHASE 1: THE EYES (REFINED SVG) (0s - 1.0s)
 * PHASE 2: THE FLASH STEP (GOD SPEED) (1.0s - 2.2s)
 * PHASE 3: THE TAKEDOWN (SHATTER) (2.2s - 2.8s)
 * PHASE 4: THE VIGILANTE REVEAL (2.8s - 4.0s)
 */
export const RobinAnimation = ({ w, h, animationKey }: AnimationProps) => {
    const isMobile = w < 768

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.1 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    }

    return (
        <motion.div
            key={`robin-${animationKey}`}
            className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden bg-black"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {/* --- PHASE 1: THE EYES (REFINED SVG) --- */}

            {/* Diagonal Slice Background */}
            <motion.div
                className="absolute inset-0 bg-[#050505]"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 70%)",
                    zIndex: 10
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.3, ease: "circOut" }}
            >
                {/* Heavy Rain in the slice (Parallax Layer 1) */}
                {Array.from({ length: isMobile ? 30 : 60 }).map((_, i) => (
                    <motion.div
                        key={`noir-rain-${i}`}
                        className="absolute bg-white/30"
                        style={{
                            width: "1px",
                            height: `${30 + Math.random() * 50}px`,
                            left: `${Math.random() * 100}vw`,
                            top: `${Math.random() * 100}vh`,
                            transform: "rotate(20deg)"
                        }}
                        animate={{ y: [0, h] }}
                        transition={{
                            duration: 0.2 + Math.random() * 0.1,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </motion.div>

            {/* SVG Mask Eyes */}
            <motion.div
                className="absolute top-[25%] left-[35%]"
                style={{ zIndex: 11, transform: "translate(-50%, -50%) rotate(-10deg)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 1, 0], scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, times: [0, 0.2, 1] }}
            >
                <svg width="200" height="100" viewBox="0 0 200 100">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    {/* Left Eye */}
                    <motion.path
                        d="M 10 40 L 80 50 L 20 70 Z"
                        fill="white"
                        filter="url(#glow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.1, delay: 0.3 }}
                    />
                    {/* Right Eye */}
                    <motion.path
                        d="M 190 40 L 120 50 L 180 70 Z"
                        fill="white"
                        filter="url(#glow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.1, delay: 0.3 }}
                    />
                </svg>
            </motion.div>

            {/* --- PHASE 2: THE FLASH STEP (GOD SPEED) --- */}

            {/* Lightning Bolt SVG */}
            <motion.svg
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: 19 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1, 0] }}
                transition={{ duration: 0.4, delay: 1.2, times: [0, 0.1, 0.3, 0.4, 1] }}
            >
                <motion.path
                    d={`M ${w * 0.4} 0 L ${w * 0.5} ${h * 0.3} L ${w * 0.45} ${h * 0.5} L ${w * 0.6} ${h * 0.8} L ${w * 0.5} ${h}`}
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.2, delay: 1.2 }}
                />
            </motion.svg>

            {/* Flash Step Trails (Afterimages) */}
            {[
                { delay: 1.2, x: "20%", y: "30%", scale: 0.8, rotate: 10 },
                { delay: 1.5, x: "80%", y: "20%", scale: 0.6, rotate: -5 },
                { delay: 1.8, x: "50%", y: "60%", scale: 1.0, rotate: 0 }
            ].map((flash, i) => (
                <motion.div
                    key={`hunt-flash-${i}`}
                    className="absolute inset-0"
                    style={{ zIndex: 20 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.25, delay: flash.delay }}
                >
                    {/* Flash Background */}
                    <div className="absolute inset-0 bg-[#1a1c29]" />

                    {/* Ghost Trails */}
                    {[1, 2, 3].map((ghost) => (
                        <div
                            key={`ghost-${i}-${ghost}`}
                            className="absolute w-[400px] h-[400px]"
                            style={{
                                left: flash.x,
                                top: flash.y,
                                transform: `translate(-50%, -50%) scale(${flash.scale}) rotate(${flash.rotate}deg) translate(${ghost * 20}px, ${ghost * 10}px)`,
                                opacity: 0.3 / ghost,
                                filter: "blur(4px)"
                            }}
                        >
                            <Image
                                src="/images/intro/robin-acrobatic-pose.png"
                                alt="Shadow"
                                fill
                                className="object-contain brightness-0 invert"
                            />
                        </div>
                    ))}

                    {/* Main Silhouette */}
                    <div
                        className="absolute w-[400px] h-[400px]"
                        style={{
                            left: flash.x,
                            top: flash.y,
                            transform: `translate(-50%, -50%) scale(${flash.scale}) rotate(${flash.rotate}deg)`
                        }}
                    >
                        <Image
                            src="/images/intro/robin-acrobatic-pose.png"
                            alt="Shadow"
                            fill
                            className="object-contain brightness-0"
                        />
                    </div>
                </motion.div>
            ))}

            {/* --- PHASE 3: THE TAKEDOWN (SHATTER) --- */}

            {/* Realistic Glass Shatter SVG */}
            <motion.div
                className="absolute inset-0"
                style={{ zIndex: 30 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.4, delay: 2.2 }}
            >
                {/* Chromatic Aberration Layers */}
                {["red", "blue", "green"].map((color, i) => (
                    <motion.svg
                        key={`shatter-${color}`}
                        className="absolute inset-0 w-full h-full"
                        style={{
                            mixBlendMode: "screen",
                            x: i * 5 - 10,
                            y: i * 5 - 10
                        }}
                    >
                        <path d={`M 0 0 L ${w} ${h}`} stroke={color} strokeWidth="2" />
                        <path d={`M ${w} 0 L 0 ${h}`} stroke={color} strokeWidth="2" />
                        <path d={`M ${w / 2} 0 L ${w / 2} ${h}`} stroke={color} strokeWidth="2" />
                        <path d={`M 0 ${h / 2} L ${w} ${h / 2}`} stroke={color} strokeWidth="2" />
                        {/* Spiderweb center */}
                        <circle cx={w / 2} cy={h / 2} r="50" fill="none" stroke={color} strokeWidth="2" />
                        <circle cx={w / 2} cy={h / 2} r="100" fill="none" stroke={color} strokeWidth="2" />
                        <circle cx={w / 2} cy={h / 2} r="150" fill="none" stroke={color} strokeWidth="2" />
                    </motion.svg>
                ))}
                <div className="absolute inset-0 bg-white/80 mix-blend-overlay" />
            </motion.div>

            {/* --- PHASE 4: THE VIGILANTE REVEAL --- */}

            {/* Spotlight Beam */}
            <motion.div
                className="absolute top-0 left-1/2 w-[300px] h-[150vh] bg-gradient-to-b from-white/20 via-white/5 to-transparent blur-2xl"
                style={{
                    zIndex: 35,
                    transform: "translateX(-50%) rotate(-15deg)",
                    transformOrigin: "top center"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.8] }}
                transition={{ duration: 0.5, delay: 2.8 }}
            />

            {/* Parallax Rain (3 Layers) */}
            {[
                { count: 40, speed: 0.5, size: 20, z: 36, opacity: 0.2 }, // Back
                { count: 60, speed: 0.3, size: 40, z: 37, opacity: 0.4 }, // Mid
                { count: 30, speed: 0.1, size: 60, z: 42, opacity: 0.6 }  // Fore (in front of Robin)
            ].map((layer, idx) => (
                <motion.div
                    key={`rain-layer-${idx}`}
                    className="absolute inset-0"
                    style={{ zIndex: layer.z }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: layer.opacity }}
                    transition={{ delay: 2.8 }}
                >
                    {Array.from({ length: layer.count }).map((_, i) => (
                        <motion.div
                            key={`rain-${idx}-${i}`}
                            className="absolute bg-white"
                            style={{
                                width: "2px",
                                height: `${layer.size + Math.random() * 20}px`,
                                left: `${Math.random() * 100}vw`,
                                top: `${Math.random() * 100}vh`,
                                transform: "rotate(15deg)"
                            }}
                            animate={{ y: [0, h] }}
                            transition={{
                                duration: layer.speed + Math.random() * 0.1,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}
                </motion.div>
            ))}

            {/* Robin Reveal */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ zIndex: 40 }}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.8, ease: "easeOut" }}
            >
                <div className="relative w-[400px] h-[400px]">
                    <Image
                        src="/images/intro/robin.png"
                        alt="Robin Teen Titans"
                        fill
                        className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                        priority
                    />
                    {/* Dark Overlay on Robin for mood */}
                    <div className="absolute inset-0 bg-black/20 mix-blend-multiply rounded-full" />
                </div>
            </motion.div>

            {/* Floating Debris/Particles */}
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={`debris-${i}`}
                    className="absolute bg-gray-400 rounded-full"
                    style={{
                        width: Math.random() * 4 + "px",
                        height: Math.random() * 4 + "px",
                        zIndex: 41,
                        left: "50%",
                        top: "50%"
                    }}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{
                        x: (Math.random() - 0.5) * 300,
                        y: (Math.random() - 0.5) * 300,
                        opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2, delay: 2.8, ease: "easeOut" }}
                />
            ))}

        </motion.div>
    )
}
