"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { AnimationProps } from "./types"

/**
 * BeastboyAnimation
 */
export const BeastboyAnimation = ({ w, h, animationKey }: AnimationProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  }

  // Paramètres ADN
  const helixTurns = 4;
  const helixPoints = 32;
  const helixLength = helixTurns * helixPoints;
  const helixRadius = w * 0.11;
  const helixHeight = h * 0.45;
  const basePairs = ["A", "T", "C", "G"];
  const animalEmojis = ["🐒", "🦅", "🐠", "🐅", "🦖"];

  // State for animation phases
  const [phase, setPhase] = React.useState(0);
  const [adnStep, setAdnStep] = React.useState(0);

  React.useEffect(() => {
    setPhase(0);
    setAdnStep(0);
    const t1 = setTimeout(() => setPhase(1), 1000);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [animationKey]);

  React.useEffect(() => {
    if (phase === 0) {
      const helixLength = 4 * 32;
      const interval = setInterval(() => setAdnStep((s) => (s + 1) % helixLength), 60);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Génération des points de l'hélice
  // Effet hélice qui s'enroule sur elle-même : rayon diminue, angle spiralé
  const spiralTightness = 2 + Math.sin(Date.now() / 700) * 0.7; // Animation douce
  const helix = Array.from({ length: helixLength }).map((_, i) => {
    const progress = i / helixLength;
    // Rayon qui diminue (de helixRadius à 0.3*helixRadius)
    const dynamicRadius = helixRadius * (1 - 0.7 * progress);
    // Angle spiralé pour effet d'enroulement
    const t = Math.PI * 2 * helixTurns * progress + Math.PI * 2 * progress * spiralTightness;
    const x = w / 2 + Math.sin(t) * dynamicRadius;
    const y = h / 2 + (progress - 0.5) * helixHeight;
    const z = Math.cos(t) * dynamicRadius;
    return { x, y, z, t, i };
  });

  // Bases animées
  const bases = helix.map((pt, i) => {
    // Phase 0: bases classiques, Phase 1: morph vers animal
    let char = basePairs[(i + adnStep) % 4];
    let color = ["#A3E635", "#4ADE80", "#FACC15", "#34D399"][i % 4];
    let fontSize = w * 0.018;
    let opacity = 0.7;
    if (phase >= 1 && i % Math.floor(helixLength / animalEmojis.length) === 0) {
      char = animalEmojis[Math.floor(i / Math.floor(helixLength / animalEmojis.length))];
      color = "#22c55e";
      fontSize = w * 0.032;
      opacity = 1;
    }
    return { ...pt, char, color, fontSize, opacity };
  });

  // Animal central
  const animalIdx = Math.floor((adnStep / helixLength) * animalEmojis.length) % animalEmojis.length;
  const centralAnimal = animalEmojis[animalIdx];

  return (
    <motion.div
      key={`beastboy-${animationKey}`}
      className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden bg-gradient-to-br from-green-900 via-lime-900 to-emerald-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Brume mouvante jungle */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`bb-fog-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${w * (0.7 + i * 0.2)}px`,
            height: `${h * (0.18 + i * 0.09)}px`,
            left: `${10 + i * 30}%`,
            top: `${18 + i * 18}%`,
            background: `radial-gradient(circle, #a3e63533 60%, #22c55e22 100%)`,
            opacity: 0.18 + i * 0.09,
            filter: `blur(${32 + i * 10}px)`,
            zIndex: 2,
          }}
          initial={{ x: -w * 0.1 * (i % 2 === 0 ? 1 : -1) }}
          animate={{ x: w * 0.1 * (i % 2 === 0 ? 1 : -1) }}
          transition={{ duration: 18 + i * 2, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        />
      ))}
      {/* Hélice d'ADN animée - version améliorée */}
      <motion.svg
        width={w}
        height={h}
        className="absolute inset-0"
        style={{ zIndex: 10, pointerEvents: "none" }}
        initial={{ opacity: 0, scale: 0.7, rotateY: 0 }}
        animate={{ opacity: 1, scale: 1, rotateY: 360 }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
      >
        {/* Brin principal uniquement */}
        <polyline
          points={helix.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="#22c55e"
          strokeWidth={6}
          opacity="0.22"
          filter="url(#bb-glow)"
        />
        {/* Bases réduites - seulement 1 sur 4 pour moins de bruit */}
        {bases.filter((_, i) => i % 4 === 0).map((b, i) => (
          <motion.text
            key={`bb-base-${i}`}
            x={b.x}
            y={b.y}
            textAnchor="middle"
            fontSize={b.fontSize}
            fill={b.color}
            opacity={b.opacity}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: b.opacity, scale: [0.7, 1.1, 1] }}
            transition={{ duration: 1.2, delay: 0.1 + (i % 4) * 0.12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            style={{ fontFamily: "monospace", letterSpacing: "0.1em", filter: "drop-shadow(0 0 8px #bef264)" }}
          >
            {b.char}
          </motion.text>
        ))}
        <defs>
          <filter id="bb-glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </motion.svg>

      {/* Effets Beast Boy - Particules de nature */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`bb-nature-particle-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + i * 8}%`,
            fontSize: w * 0.025,
            zIndex: 15,
            filter: "drop-shadow(0 0 8px #bef264)",
          }}
          initial={{ opacity: 0, scale: 0.5, y: 0 }}
          animate={{
            opacity: [0, 1, 0.7, 0],
            scale: [0.5, 1.2, 0.8, 0.5],
            y: [0, -40, -20, 0],
            x: [0, Math.sin(i) * 20, 0]
          }}
          transition={{
            duration: 3 + i * 0.5,
            delay: i * 0.3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        >
          {["🍃", "🌿", "🌱", "🌺", "🌻", "🌼", "🌷", "🌸"][i % 8]}
        </motion.div>
      ))}

      {/* Effets de transformation - Silhouettes d'animaux flottantes */}
      {phase >= 1 && Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`bb-transform-silhouette-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 25}%`,
            top: `${20 + i * 15}%`,
            fontSize: w * 0.08,
            zIndex: 20,
            filter: "drop-shadow(0 0 15px #22c55e) blur(1px)",
            opacity: 0.4,
          }}
          initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
          animate={{
            opacity: [0, 0.4, 0.2, 0],
            scale: [0.3, 1.1, 0.8, 0.3],
            rotate: [0, 15, -15, 0]
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        >
          {["🐒", "🦅", "🐅"][i]}
        </motion.div>
      ))}

      {/* Ondes de transformation - Effet de métamorphose */}
      {phase >= 1 && Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`bb-transform-wave-${i}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-green-400"
          style={{ zIndex: 25 }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: `${200 + i * 80}px`,
            height: `${200 + i * 80}px`,
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut"
          }}
        />
      ))}

      {/* Animaux qui s'échappent de l'ADN - SUPPRIMÉ pour plus de clarté */}
      {/* Animal central morphing - version épurée */}
      {phase >= 1 && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: 40, fontSize: w * 0.13, filter: "drop-shadow(0 0 32px #bef264)" }}
          initial={{ opacity: 0, scale: 0.7, filter: "blur(18px)" }}
          animate={{ opacity: [0, 1, 1], scale: [0.7, 1.1, 1], filter: ["blur(18px)", "blur(0px)", "blur(0px)"] }}
          transition={{ duration: 1.1, delay: 0.2, times: [0, 0.5, 1], ease: "easeOut" }}
        >
          {centralAnimal}
        </motion.div>
      )}
      {/* Explosion de vie */}
      {phase === 2 && (
        <>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: 50 }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: [0, 0.7, 0.3, 0], scale: [0.2, 1.5, 2.2, 2.8], filter: ["blur(0px)", "blur(8px)", "blur(16px)", "blur(24px)"] }}
            transition={{ duration: 0.8, times: [0, 0.2, 0.7, 1], ease: "easeOut" }}
          >
            <div
              style={{
                width: "420px",
                height: "420px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, #a3e635 10%, #bef264 28%, #4ade80 48%, #22c55e 68%, rgba(34,197,94,0.7) 82%, transparent 95%)",
                filter: "blur(18px) contrast(1.6)",
                boxShadow: "0 0 120px 60px #bef264, 0 0 180px 90px #a3e635",
              }}
            />
            {/* Particules d'éclat */}
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={`bb-explosion-particle-${i}`}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: i % 2 === 0 ? "#bef264" : "#a3e635",
                  filter: "blur(2px)",
                  zIndex: 51,
                }}
                initial={{ x: 0, y: 0, scale: 0.5, opacity: 1 }}
                animate={{
                  x: Math.cos((i / 18) * 2 * Math.PI) * 180,
                  y: Math.sin((i / 18) * 2 * Math.PI) * 180,
                  scale: [0.5, 1.2, 0.2],
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        </>
      )}
      {/* Stabilisation : feuilles et empreintes - SUPPRIMÉ pour plus de clarté */}

      {/* Apparition de Beast Boy - Phase finale */}
      {phase === 3 && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.7, filter: "blur(18px)" }}
          animate={{ opacity: [0, 1, 1], scale: [0.7, 1.1, 1], filter: ["blur(18px)", "blur(0px)", "blur(0px)"] }}
          transition={{ duration: 1.5, delay: 0.5, times: [0, 0.5, 1], ease: "easeInOut" }}
          style={{ zIndex: 60 }}
        >
          <motion.div
            initial={{ opacity: 1, scale: 1, rotate: 0 }}
            animate={{
              opacity: 1,
              scale: [1, 1.025, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/images/intro/beastboy.png"
              alt="Beast Boy Teen Titans"
              width={340}
              height={340}
              style={{
                objectFit: "contain",
                borderRadius: "50%",
                boxShadow: "0 0 60px 10px #22c55e, 0 0 120px 30px #bef264"
              }}
              priority
            />
          </motion.div>
          {/* Particules de nature autour de l'image */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`bb-final-particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${3 + Math.random() * 4}px`,
                height: `${3 + Math.random() * 4}px`,
                left: `calc(50% + ${Math.cos((i / 6) * 2 * Math.PI) * 100 + (Math.random() - 0.5) * 20}px)`,
                top: `calc(50% + ${Math.sin((i / 6) * 2 * Math.PI) * 100 + (Math.random() - 0.5) * 20}px)`,
                background: "#22c55e",
                boxShadow: "0 0 6px 2px #bef264, 0 0 12px 4px #22c55e",
                opacity: 0.6,
                filter: "blur(1px)",
                zIndex: 61,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.6, 0.3, 0], scale: [0.5, 1.1, 0.8, 0.5] }}
              transition={{ duration: 2.5 + Math.random(), delay: 1.0 + Math.random(), repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
