"use client"

import { motion } from "framer-motion"
import { Terminal, ExternalLink, BookOpen, Activity } from "lucide-react"

interface Tool {
    name: string
    description: string
    category: string
    icon: string
    learning: string // Niveau d'apprentissage
}

const tools: Tool[] = [
    // Scanning & Enumeration
    {
        name: "Nmap",
        description: "Scan de ports et énumération réseau",
        category: "Scanning",
        icon: "🔍",
        learning: "Découverte",
    },
    {
        name: "Gobuster",
        description: "Brute-force de répertoires et fichiers",
        category: "Scanning",
        icon: "📁",
        learning: "Découverte",
    },

    // Exploitation
    {
        name: "Burp Suite",
        description: "Test de sécurité des applications web",
        category: "Exploitation",
        icon: "🎯",
        learning: "En apprentissage",
    },
    {
        name: "Metasploit",
        description: "Framework de pentesting",
        category: "Exploitation",
        icon: "💉",
        learning: "À explorer",
    },

    // OS & Environment
    {
        name: "Kali Linux",
        description: "OS de pentesting",
        category: "Environment",
        icon: "🐧",
        learning: "En utilisation",
    },
    {
        name: "Linux CLI",
        description: "Ligne de commande Linux",
        category: "Fondamentaux",
        icon: "💻",
        learning: "En apprentissage",
    },
    {
        name: "Python",
        description: "Scripting et automatisation",
        category: "Scripting",
        icon: "🐍",
        learning: "Bases acquises",
    },
]

const categories = Array.from(new Set(tools.map(t => t.category)))

const getLearningColor = (learning: string) => {
    switch (learning) {
        case "En utilisation":
        case "Bases acquises":
            return "bg-green-500/20 text-green-400 border-green-500/30"
        case "En apprentissage":
        case "Découverte":
            return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
        case "À explorer":
            return "bg-gray-500/20 text-gray-400 border-gray-500/30"
        default:
            return "bg-red-500/20 text-red-400 border-red-500/30"
    }
}

export default function CyberTools() {
    return (
        <section id="tools" className="py-20 bg-black relative overflow-hidden">
            {/* Red Pulse background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500 animate-[pulse_3s_infinite]" />
                <div className="absolute top-1/4 left-0 w-full h-[1px] bg-red-400 animate-[pulse_4s_infinite]" />
                <div className="absolute top-3/4 left-0 w-full h-[1px] bg-red-600 animate-[pulse_2s_infinite]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/30 mb-4">
                        <BookOpen className="w-4 h-4 text-red-500" />
                        <span className="text-red-400 font-mono text-sm">BOÎTE À OUTILS (EN FORMATION)</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase">
                        Outils en <span className="text-red-600">Apprentissage</span>
                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto font-mono text-xs">
                        Les outils que je découvre et apprends à utiliser dans mon parcours pentesting.
                    </p>
                </motion.div>

                {/* Tools by Category */}
                <div className="space-y-12 max-w-6xl mx-auto">
                    {categories.map((category, catIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                        >
                            <h3 className="text-sm font-mono text-red-500 mb-6 flex items-center gap-4 uppercase tracking-[0.3em]">
                                <span className="bg-red-600 w-2 h-2 rounded-full" />
                                {category}
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {tools.filter(t => t.category === category).map((tool, index) => (
                                    <motion.div
                                        key={tool.name}
                                        className="relative bg-red-950/10 rounded-sm p-5 border border-red-500/10 
                      hover:border-red-500/50 hover:bg-red-950/20 transition-all duration-300
                      group cursor-pointer overflow-hidden"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        {/* Glitch effect on hover */}
                                        <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                        <div className="flex items-start justify-between mb-4">
                                            <div className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                                                {tool.icon}
                                            </div>
                                            {/* Learning status badge */}
                                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${getLearningColor(tool.learning)}`}>
                                                {tool.learning}
                                            </span>
                                        </div>

                                        <h4 className="text-white font-mono font-bold text-lg mb-1 group-hover:text-red-500 transition-colors">
                                            {tool.name}
                                        </h4>
                                        <p className="text-gray-500 text-xs font-mono uppercase tracking-tighter leading-relaxed">
                                            {tool.description}
                                        </p>

                                        {/* Corner accents */}
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-500/30 group-hover:border-red-500 transition-all" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Disclaimer */}
                <motion.div
                    className="max-w-4xl mx-auto mt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-6 text-center">
                        <p className="text-gray-400 text-sm font-mono">
                            💡 <span className="text-red-400">Note :</span> Ces outils font partie de mon parcours d'apprentissage.
                            Je les découvre progressivement via TryHackMe et la pratique en environnement contrôlé (labs, CTFs).
                        </p>
                    </div>
                </motion.div>

                {/* Terminal decorative element */}
                <motion.div
                    className="max-w-4xl mx-auto mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="p-1 bg-red-900/20 border border-red-500/10">
                        <div className="bg-black p-6 font-mono text-[10px] text-red-900/60 flex flex-wrap gap-x-8 gap-y-2">
                            <span>[i] STATUS: LEARNING_MODE</span>
                            <span>[i] LEVEL: BEGINNER</span>
                            <span>[i] PLATFORM: TRYHACKME</span>
                            <span>[i] GOAL: RED_TEAM</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
