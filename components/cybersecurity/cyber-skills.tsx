"use client"

import { motion } from "framer-motion"
import { Shield, ExternalLink, Terminal, Code, Cpu, Globe, Lock, Search, BookOpen, Target } from "lucide-react"

// Learning paths reflecting beginner status
const skillCategories = [
    {
        name: "Pre Security",
        description: "Bases réseau, Linux, Web fondamentaux. Mon point de départ.",
        icon: BookOpen,
        status: "EN COURS",
        statusColor: "text-yellow-500",
    },
    {
        name: "Complete Beginner",
        description: "Introduction au hacking éthique et aux concepts de base.",
        icon: Cpu,
        status: "DÉMARRÉ",
        statusColor: "text-blue-400",
    },
    {
        name: "Jr Penetration Tester",
        description: "Mon objectif actuel : maîtriser les bases du pentesting.",
        icon: Target,
        status: "OBJECTIF",
        statusColor: "text-red-500",
    },
    {
        name: "SOC Level 1",
        description: "Comprendre la défense pour mieux attaquer.",
        icon: Search,
        status: "À EXPLORER",
        statusColor: "text-gray-500",
    },
]

export default function CyberSkills() {
    return (
        <section id="skills" className="py-20 bg-black relative overflow-hidden">
            {/* Red ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

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
                        <span className="text-red-400 font-mono text-sm">PARCOURS D'APPRENTISSAGE</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-widest">
                        Learning <span className="text-red-600">Path</span>
                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
                        Mon parcours de formation sur TryHackMe. Je débute et j'apprends chaque jour !
                    </p>
                </motion.div>

                {/* Skills Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            className="group relative bg-red-950/5 border border-red-500/20 rounded-lg p-6 overflow-hidden hover:border-red-500/50 transition-all duration-300"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Corner accent */}
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500/0 group-hover:border-red-500/40 transition-all duration-300" />

                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-red-500/10 rounded-sm border border-red-500/20 group-hover:bg-red-500/20 transition-all">
                                    <category.icon className="w-8 h-8 text-red-500" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-xl font-bold text-white font-mono tracking-tight">{category.name}</h3>
                                        <span className={`text-[10px] font-mono ${category.statusColor} border border-current/30 px-2 py-0.5 rounded uppercase`}>
                                            {category.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                        {category.description}
                                    </p>

                                    {/* Hex-style detail */}
                                    <div className="flex gap-2 text-[10px] font-mono text-gray-500">
                                        <span>TYPE: LEARNING PATH</span>
                                        <span>|</span>
                                        <span>SOURCE: TRYHACKME</span>
                                    </div>
                                </div>
                            </div>

                            {/* Background text decoration */}
                            <div className="absolute -bottom-4 -right-4 text-7xl font-black text-white/5 pointer-events-none italic select-none">
                                {category.name.split(' ')[0]}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Beginner Notice */}
                <motion.div
                    className="mt-12 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-4">
                        <div className="p-2 bg-yellow-500/20 rounded">
                            <BookOpen className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                            <h4 className="text-yellow-500 font-mono font-bold mb-1">Note de transparence</h4>
                            <p className="text-gray-400 text-sm">
                                Je suis en <span className="text-yellow-400">début de parcours</span>. Ces compétences représentent ce que j'apprends actuellement,
                                pas ce que je maîtrise. Mon objectif est de progresser méthodiquement vers le pentesting professionnel.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Action Center */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-block p-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent">
                        <div className="bg-black px-12 py-8">
                            <p className="text-gray-400 mb-6 font-mono text-sm max-w-md mx-auto">
                                Suivez ma progression en temps réel sur TryHackMe.
                            </p>
                            <a
                                href="https://tryhackme.com/p/jihad269200"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-sm transition-all shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:shadow-[0_0_40px_rgba(255,0,0,0.5)] transform hover:-translate-y-1"
                            >
                                <span>VOIR MA PROGRESSION</span>
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
