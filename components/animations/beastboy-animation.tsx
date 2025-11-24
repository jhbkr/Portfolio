"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimationProps } from "./types"

/**
 * BeastBoyAnimation - MÉTAMORPHOSE LIQUIDE (GRAND ART CINÉMATIQUE)
 * Vision: Transformation organique viscérale inspirée par Annihilation et Venom.
 * 4 Actes: Scanner Bio → Mutation Liquide → Explosion → Émergence
 */
export const BeastBoyAnimation = ({ w, h, animationKey }: AnimationProps) => {
  const [phase, setPhase] = useState(0)
  const isMobile = w < 768

  // TIMING SEQUENCER
  useEffect(() => {
    const sequence = async () => {
      setPhase(1) // Acte I: Le Calme Trompeur
      await new Promise(r => setTimeout(r, 1800))
      setPhase(2) // Acte II: La Mutation
      await new Promise(r => setTimeout(r, 1800))
      setPhase(3) // Acte III: Le Point de Rupture
      await new Promise(r => setTimeout(r, 800))
      setPhase(4) // Acte IV: L'Émergence
    }
    sequence()
  }, [])

  return (
    <motion.div
      key={`beastboy-${animationKey}`}
      className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* SVG FILTERS - Effets Organiques */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Effet Goo/Liquide */}
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
          {/* Turbulence Organique */}
          <filter id="organic">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="1" />
            <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
          {/* Effet de Dissolution */}
          <filter id="dissolve">
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence" />
            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="50" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ==================================================================================
          ACTE I: LE CALME TROMPEUR (0s - 1.5s)
          Scanner Bio + ADN en Rotation
         ================================================================================== */}
      {phase >= 1 && (
        <>
          {/* HUD Overlay - Interface Scientifique */}
          <motion.div
            className="absolute top-8 left-8 font-mono text-[#39FF14] text-xs z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-1 border border-[#39FF14]/30 p-3 bg-black/50">
              <div className="text-[#39FF14]/70">BIOLOGICAL SCANNER ACTIVE</div>
              <div className="text-white">SUBJECT: <span className="text-[#39FF14]">GARFIELD LOGAN</span></div>
              <div className="text-white">SERUM: <span className="text-[#39FF14]">M-317</span></div>
              <motion.div
                className="text-red-500 font-bold mt-2"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                ⚠ CELLULES INSTABLES
              </motion.div>
            </div>
          </motion.div>

          {/* Grille Scientifique */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)",
              backgroundSize: "50px 50px"
            }}
          />

          {/* ADN Double Hélice (Centre) */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <svg width="200" height="400" viewBox="0 0 200 400">
              {/* Barres Horizontales (base pairs) */}
              {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => (
                <motion.line
                  key={`bp-${i}`}
                  x1="50" y1={i * 20 + 10} x2="150" y2={i * 20 + 10}
                  stroke="#39FF14"
                  strokeWidth="2"
                  opacity={0.6}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                />
              ))}
              {/* Hélice Gauche */}
              <motion.path
                d="M50,0 Q25,100 50,200 T50,400"
                stroke="#39FF14"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
              {/* Hélice Droite */}
              <motion.path
                d="M150,0 Q175,100 150,200 T150,400"
                stroke="#39FF14"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
            </svg>
          </motion.div>

          {/* Cellules Flottantes */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`cell-${i}`}
              className="absolute rounded-full bg-[#39FF14]/20 border border-[#39FF14]/40"
              style={{
                width: Math.random() * 30 + 10,
                height: Math.random() * 30 + 10,
                left: Math.random() * w,
                top: Math.random() * h
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random()
              }}
            />
          ))}
        </>
      )}

      {/* ==================================================================================
          ACTE II: LA MUTATION COMMENCE (1.5s - 3.0s)
          Explosion d'ADN + Matière Liquide Verte + Formes Animales Fluides
         ================================================================================== */}
      {phase >= 2 && (
        <>
          {/* Flash Vert (Transition) */}
          <motion.div
            className="absolute inset-0 bg-[#39FF14] z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.3 }}
          />

          {/* Matière Liquide Organique (avec effet Goo) */}
          <div className="absolute inset-0 z-20" style={{ filter: "url(#goo)" }}>
            {/* Blobs Liquides qui se Forment */}
            {Array.from({ length: isMobile ? 15 : 30 }).map((_, i) => (
              <motion.div
                key={`blob-${i}`}
                className="absolute rounded-full bg-[#39FF14]"
                style={{
                  left: w / 2,
                  top: h / 2
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0.8],
                  opacity: [0, 1, 0.8],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.02,
                  ease: "easeOut"
                }}
              >
                <div className="w-20 h-20" />
              </motion.div>
            ))}
          </div>

          {/* Silhouettes Animales qui Émergent du Liquide */}
          {/* 1. Colibri (Vitesse) */}
          <motion.div
            className="absolute z-25"
            style={{ left: "30%", top: "40%" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: [0, 100] }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <svg width="60" height="60" viewBox="0 0 100 100" filter="url(#dissolve)">
              <path d="M50,30 L70,50 L50,70 L30,50 Z M70,50 L90,50" fill="#39FF14" opacity="0.7" />
            </svg>
          </motion.div>

          {/* 2. Loup (Meute) */}
          <motion.div
            className="absolute z-25"
            style={{ left: "50%", top: "30%" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <svg width="120" height="80" viewBox="0 0 120 80" filter="url(#dissolve)">
              <path d="M20,60 Q30,40 50,50 Q70,40 80,60 L70,70 L30,70 Z M50,50 L60,30 L70,50" fill="#39FF14" opacity="0.7" />
            </svg>
          </motion.div>

          {/* 3. Faucon (Vision) */}
          <motion.div
            className="absolute z-25"
            style={{ left: "60%", top: "50%" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -50] }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <svg width="100" height="60" viewBox="0 0 100 60" filter="url(#dissolve)">
              <path d="M10,30 Q30,10 50,30 Q70,10 90,30 L80,40 L50,50 L20,40 Z" fill="#39FF14" opacity="0.7" />
            </svg>
          </motion.div>

          {/* 4. Gorille (Force) */}
          <motion.div
            className="absolute z-25"
            style={{ left: "40%", top: "55%" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <svg width="140" height="140" viewBox="0 0 140 140" filter="url(#dissolve)">
              <path d="M30,60 Q30,30 70,30 Q110,30 110,60 L100,100 L40,100 Z M50,50 L90,50 M70,70 L70,90" fill="#39FF14" opacity="0.7" />
            </svg>
          </motion.div>

          {/* Particules Vivantes */}
          {Array.from({ length: isMobile ? 25 : 50 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-[#CCFF00] rounded-full"
              style={{ left: w / 2, top: h / 2 }}
              animate={{
                x: (Math.random() - 0.5) * w,
                y: (Math.random() - 0.5) * h,
                opacity: [1, 0],
                scale: [1, 0]
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 1.5,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}

      {/* ==================================================================================
          ACTE III: LE POINT DE RUPTURE (3.0s - 3.5s)
          Convergence + Explosion Splash
         ================================================================================== */}
      {phase >= 3 && (
        <>
          {/* Sphère Tourbillonnante (Convergence) */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
            style={{ filter: "url(#goo)" }}
          >
            <motion.div
              className="rounded-full bg-[#39FF14]"
              initial={{ width: 0, height: 0 }}
              animate={{ width: 300, height: 300 }}
              transition={{ duration: 0.3 }}
            >
              {/* Veines Lumineuses */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`vein-${i}`}
                  className="absolute top-1/2 left-1/2 w-2 h-full bg-white origin-top"
                  style={{
                    rotate: i * 45,
                    transformOrigin: "top center"
                  }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* L'Explosion Splash - avec fade out */}
          <motion.div
            className="absolute inset-0 bg-[#39FF14] z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />

          {/* Splash Particles */}
          {Array.from({ length: isMobile ? 20 : 40 }).map((_, i) => (
            <motion.div
              key={`splash-${i}`}
              className="absolute top-1/2 left-1/2 bg-[#39FF14] rounded-full"
              style={{ width: 20, height: 20 }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 2, 0],
                opacity: [1, 0.5, 0],
                x: (Math.random() - 0.5) * w,
                y: (Math.random() - 0.5) * h
              }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            />
          ))}
        </>
      )}

      {/* ==================================================================================
          ACTE IV: L'ÉMERGENCE (3.5s+)
          Liquide qui S'égoutte + Révélation + Jungle Digitale
         ================================================================================== */}
      {phase >= 4 && (
        <>
          {/* Fond: Jungle Urbaine Hybride */}
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#013220] via-[#002815] to-black" />
            {/* Lianes Numériques */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`vine-${i}`}
                className="absolute w-1 bg-gradient-to-b from-[#39FF14]/20 to-transparent"
                style={{
                  left: `${10 + i * 12}%`,
                  height: "100%"
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            ))}
          </motion.div>

          {/* Liquide Vert qui S'égoutte du Haut */}
          {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => (
            <motion.div
              key={`drip-${i}`}
              className="absolute top-0 w-2 bg-[#39FF14]"
              style={{
                left: `${5 + i * 5}%`,
                filter: "url(#goo)"
              }}
              initial={{ height: "100%" }}
              animate={{ height: "0%" }}
              transition={{ delay: i * 0.05, duration: 1, ease: "easeIn" }}
            />
          ))}

          {/* Beast Boy Émerge (Position Accroupie) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-40"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
          >
            <div className="relative w-[500px] h-[500px]">
              {/* Aura de Particules */}
              <div className="absolute inset-0">
                {Array.from({ length: isMobile ? 15 : 30 }).map((_, i) => (
                  <motion.div
                    key={`aura-${i}`}
                    className="absolute w-2 h-2 bg-[#CCFF00] rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.5, 1, 0.5],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>

              {/* Character Image */}
              <motion.div
                className="relative w-full h-full"
                initial={{ opacity: 0, filter: "brightness(0.5) saturate(0.5)" }}
                animate={{ opacity: 1, filter: "brightness(1) saturate(1)" }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <Image
                  src="/images/intro/beastboy.png"
                  alt="Beast Boy"
                  fill
                  className="object-contain drop-shadow-[0_0_60px_rgba(57,255,20,0.9)]"
                  priority
                />
              </motion.div>

              {/* Effet de Respiration/Pulse */}
              <motion.div
                className="absolute inset-0 bg-[#39FF14] blur-3xl opacity-30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Titre: GARFIELD LOGAN (Police Organique) */}
          <motion.div
            className="absolute bottom-[12%] w-full text-center z-50"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#CCFF00] to-[#39FF14] tracking-tight"
              style={{
                fontFamily: "Impact, sans-serif",
                textShadow: "0 0 40px #39FF14, 0 2px 4px rgba(0,0,0,0.8)"
              }}>
              GARFIELD LOGAN
            </h1>
            {/* Ligne Animée (Lianes qui poussent) */}
            <motion.div
              className="w-64 h-2 bg-[#39FF14] mx-auto mt-4 rounded-full shadow-[0_0_20px_#39FF14]"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        </>
      )}

    </motion.div>
  )
}
