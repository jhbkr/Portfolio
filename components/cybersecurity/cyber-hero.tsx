"use client"

import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Shield, Terminal, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

import RedMatrixBackground from "./red-matrix-background"

interface TryHackMeData {
    username: string
    avatar: string
    level: number
    rank: number
    badgeImageURL: string
}

export default function CyberHero() {
    const { theme } = useTheme()
    const [isClient, setIsClient] = useState(false)
    const [typedText, setTypedText] = useState("")
    const [data, setData] = useState<TryHackMeData | null>(null)
    const fullText = "Loading learning path... [BEGINNER MODE]"

    useEffect(() => {
        setIsClient(true)
        fetch("/api/tryhackme")
            .then(res => res.json())
            .then(json => {
                if (json.status === "success") setData(json.data)
            })
            .catch(err => console.error("Failed to fetch TM data", err))
    }, [])

    // Typing effect
    useEffect(() => {
        if (!isClient) return
        let index = 0
        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index))
                index++
            } else {
                clearInterval(interval)
            }
        }, 50)
        return () => clearInterval(interval)
    }, [isClient])

    return (
        <section id="cyber-hero" className="min-h-screen pt-16 flex items-center relative overflow-hidden bg-black">
            <RedMatrixBackground />

            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Terminal header */}
                        <div className="bg-red-950/20 rounded-t-lg p-2 flex items-center gap-2 border-t border-x border-red-500/30">
                            <div className="w-3 h-3 rounded-full bg-red-600" />
                            <div className="w-3 h-3 rounded-full bg-red-800" />
                            <div className="w-3 h-3 rounded-full bg-red-900" />
                            <span className="text-red-400 text-sm ml-2 font-mono">root@jihad-redteam</span>
                        </div>

                        {/* Terminal content */}
                        <div className="bg-black/60 backdrop-blur-md rounded-b-lg p-6 border border-red-500/20 shadow-[0_0_30px_rgba(255,0,0,0.1)]">
                            <div className="font-mono text-red-500 mb-4">
                                <span className="text-gray-500">$</span> ./start_engagement.sh
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
                                <span className="text-red-600">Red</span>
                                <span className="text-white">Team</span>
                                <span className="text-red-400/60 text-2xl md:text-3xl ml-2 italic">in progress</span>
                            </h1>

                            <div className="font-mono text-red-400 mb-6 h-6">
                                <span className="text-gray-500">&gt;</span> {typedText}
                                <span className="animate-pulse">_</span>
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed">
                                Passionné de cybersécurité en <span className="text-red-400 font-semibold">apprentissage actif</span>.
                                Je me forme au Pentesting, à l'Exploitation et à l'Analyse de vulnérabilités
                                via TryHackMe et les CTFs. Mon objectif : devenir Red Teamer.
                            </p>
                        </div>

                        {/* Learning Focus */}
                        <div className="flex gap-4 flex-wrap">
                            <div className="flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/30">
                                <Shield className="w-5 h-5 text-red-500" />
                                <span className="text-red-400 font-mono text-sm">En Formation</span>
                            </div>
                            <div className="flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/30">
                                <Terminal className="w-5 h-5 text-red-500" />
                                <span className="text-red-400 font-mono text-sm">TryHackMe</span>
                            </div>
                            <div className="flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/30">
                                <Lock className="w-5 h-5 text-red-500" />
                                <span className="text-red-400 font-mono text-sm">CTF Player</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {/* TryHackMe Identity Card */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full" />
                            <div className="relative bg-black/60 backdrop-blur-xl p-8 rounded-2xl border-2 border-red-500/50 shadow-[0_0_50px_rgba(255,0,0,0.2)] overflow-hidden group min-w-[300px]">
                                {/* Decorative elements */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500" />

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-red-600/40 blur-xl rounded-full animate-pulse" />
                                        {data?.avatar ? (
                                            <img
                                                src={data.avatar}
                                                alt="Jihad Bakari"
                                                className="w-32 h-32 rounded-full border-4 border-red-500/50 relative z-10 grayscale hover:grayscale-0 transition-all duration-500"
                                            />
                                        ) : (
                                            <div className="w-32 h-32 rounded-full border-4 border-red-500/50 bg-red-950/30 flex items-center justify-center relative z-10">
                                                <Terminal className="w-12 h-12 text-red-500" />
                                            </div>
                                        )}
                                        <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-[10px] font-mono px-2 py-0.5 rounded border border-black z-20">
                                            LVL {data?.level || "?"}
                                        </div>
                                    </div>

                                    <div className="text-center space-y-2">
                                        <h3 className="text-red-500 font-mono text-xl font-black uppercase tracking-tighter">
                                            {data?.username || "LOADING..."}
                                        </h3>
                                        <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                                        <p className="text-gray-400 text-[10px] font-mono uppercase tracking-[0.4em]">Apprenti Red Teamer</p>

                                        <div className="mt-4 pt-4 flex justify-center gap-4 border-t border-red-500/10 w-full font-mono text-[9px]">
                                            <div className="text-center">
                                                <div className="text-red-500 font-bold">RANK</div>
                                                <div className="text-gray-500">#{data?.rank?.toLocaleString() || "???"}</div>
                                            </div>
                                            <div className="text-center border-l border-red-500/10 pl-4">
                                                <div className="text-red-500 font-bold">STATUS</div>
                                                <div className="text-green-500">ACTIVE</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Background scanning line */}
                                <motion.div
                                    className="absolute left-0 w-full h-px bg-red-500/20 z-0"
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
