"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Target, Flame, Award, TrendingUp, Calendar, User, ExternalLink } from "lucide-react"
import Image from "next/image"

interface TryHackMeData {
    username: string
    avatar: string
    level: number
    rank: number
    streak: number
    badgesNumber: number
    completedRoomsNumber: number
    topPercentage: number | null
    isInTopTenPercent: boolean
    badgeImageURL: string
    dateSignUp: string
    country: string
    subscribed: number
}

export default function CyberTryHackMeStats() {
    const [data, setData] = useState<TryHackMeData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/tryhackme")
                if (!response.ok) throw new Error("Failed to fetch")
                const result = await response.json()
                if (result.status === "success") {
                    setData(result.data)
                } else {
                    throw new Error("API returned error")
                }
            } catch (err) {
                setError("Impossible de charger les données TryHackMe")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('fr-FR').format(num)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const stats = data ? [
        {
            icon: Trophy,
            label: "Rank Global",
            value: `#${formatNumber(data.rank)}`,
            color: "text-red-500",
            bgColor: "bg-red-500/10",
            borderColor: "border-red-500/30",
        },
        {
            icon: TrendingUp,
            label: "Top Classement",
            value: data.topPercentage ? `Top ${data.topPercentage}%` : "N/A",
            color: "text-red-400",
            bgColor: "bg-red-500/10",
            borderColor: "border-red-400/30",
        },
        {
            icon: Target,
            label: "Rooms Complétées",
            value: data.completedRoomsNumber.toString(),
            color: "text-red-600",
            bgColor: "bg-red-600/10",
            borderColor: "border-red-600/30",
        },
        {
            icon: Flame,
            label: "Streak Actuel",
            value: `${data.streak} jours`,
            color: "text-orange-600",
            bgColor: "bg-orange-600/10",
            borderColor: "border-orange-600/30",
        },
        {
            icon: Award,
            label: "Badges Obtenus",
            value: data.badgesNumber.toString(),
            color: "text-red-700",
            bgColor: "bg-red-700/10",
            borderColor: "border-red-700/30",
        },
        {
            icon: User,
            label: "Niveau",
            value: `Level ${data.level}`,
            color: "text-red-300",
            bgColor: "bg-red-300/10",
            borderColor: "border-red-300/30",
        },
    ] : []

    return (
        <section id="tryhackme" className="py-20 bg-black relative overflow-hidden">
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #FF0000 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/30 mb-4">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                        <span className="text-red-400 font-mono text-sm">MA PROGRESSION EN DIRECT</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tighter">
                        Suivi <span className="text-red-600">Apprentissage</span>
                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto font-mono text-xs">
                        Mes statistiques réelles sur TryHackMe. Je progresse à mon rythme !
                    </p>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-red-950/20 rounded-xl p-6 animate-pulse border border-red-900/20">
                                <div className="w-10 h-10 bg-red-900/30 rounded-lg mb-4" />
                                <div className="h-4 bg-red-900/30 rounded w-3/4 mb-2" />
                                <div className="h-8 bg-red-900/30 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-10">
                        <p className="text-red-500 font-mono">{error}</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className={`${stat.bgColor} rounded-xl p-6 border ${stat.borderColor} backdrop-blur-sm
                    hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(255,0,0,0.05)]`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
                                    <p className="text-gray-400 text-sm mb-1 font-mono uppercase text-[10px] tracking-widest">{stat.label}</p>
                                    <p className={`text-2xl font-bold ${stat.color} font-mono tracking-tighter`}>{stat.value}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="max-w-3xl mx-auto bg-gradient-to-b from-red-950/10 to-transparent rounded-2xl p-8 border border-red-500/10 backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-red-500/30 blur-2xl rounded-full" />
                                    <Image
                                        src={data?.avatar || ""}
                                        alt="Profile Avatar"
                                        width={120}
                                        height={120}
                                        className="relative rounded-full border-2 border-red-500/40 grayscale hover:grayscale-0 transition-all duration-500"
                                        unoptimized
                                    />
                                    {data?.subscribed === 1 && (
                                        <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-[10px] font-mono font-bold px-2 py-1 rounded-sm border border-black animate-pulse">
                                            PREMIUM_OPS
                                        </div>
                                    )}
                                </div>

                                <div className="text-center md:text-left flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-2 font-mono">
                                        ID: {data?.username}
                                    </h3>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-400 text-xs font-mono uppercase">
                                        <div className="flex items-center gap-1">
                                            <span className="text-red-500">LOC:</span>
                                            <span>FRANCE [EU]</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4 text-red-500" />
                                            <span>COMMENCED: {data && formatDate(data.dateSignUp)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex justify-between text-[10px] font-mono mb-1 uppercase tracking-widest">
                                            <span className="text-gray-500">Upgrade Priority</span>
                                            <span className="text-red-500">LVL {data?.level} → LVL {(data?.level || 0) + 1}</span>
                                        </div>
                                        <div className="h-1 bg-red-900/20 rounded-full overflow-hidden border border-red-950">
                                            <motion.div
                                                className="h-full bg-red-600 shadow-[0_0_10px_#FF0000]"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "60%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 2, delay: 0.5 }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href="https://tryhackme.com/p/jihad269200"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-red-600 hover:bg-red-700 text-white font-mono font-bold px-8 py-3 rounded-sm transition-all flex items-center gap-2 group border border-red-500"
                                >
                                    <span className="group-hover:tracking-widest transition-all">DECRYPT_PROFILE</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    )
}
