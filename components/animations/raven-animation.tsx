"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { AnimationProps } from "./types"

/**
 * RavenAnimation
 */
export const RavenAnimation = ({ w, h, animationKey }: AnimationProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.3, delay: 2.2 } }
  }

  // PHASE 2: Incantation phrase
  // PHASE 3: Explosion magique moins lumineuse
  // PHASE 4: Corbeaux burst
  // PHASE 5: Apparition de Raven (image bien visible)

  return (
    <motion.div
      key={`raven-${animationKey}`}
      className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden bg-gradient-to-bl from-indigo-950 via-black to-purple-950"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* PHASE 1: Cercle runique stylé, animé, détaillé */}
      <motion.svg
        width={w}
        height={h}
        className="absolute inset-0"
        style={{ zIndex: 10, pointerEvents: "none" }}
        initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
        {/* Cercles principaux */}
        <motion.circle
          cx={w / 2}
          cy={h / 2}
          r={w * 0.18}
          fill="none"
          stroke="#a084e8"
          strokeWidth="5"
          opacity="0.7"
          filter="url(#glow1)"
          animate={{
            scale: [1, 1.04, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx={w / 2}
          cy={h / 2}
          r={w * 0.13}
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeDasharray="8 8"
          opacity="0.5"
          filter="url(#glow2)"
          animate={{
            scale: [1, 0.97, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <circle cx={w / 2} cy={h / 2} r={w * 0.09} fill="none" stroke="#a084e8" strokeWidth="1.2" opacity="0.3" />
        {/* Petits points internes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <circle
            key={`raven-dot-int-${i}`}
            cx={w / 2 + Math.cos((i / 8) * 2 * Math.PI) * w * 0.07}
            cy={h / 2 + Math.sin((i / 8) * 2 * Math.PI) * w * 0.07}
            r={w * 0.004}
            fill="#a084e8"
            opacity="0.5"
          />
        ))}
        {/* Croix et losanges internes */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * 2 * Math.PI;
          return (
            <g key={`raven-cross-${i}`}> {/* Croix */}
              <rect x={w / 2 - 1.5} y={h / 2 - w * 0.11} width={3} height={w * 0.022} fill="#fff" opacity="0.4" transform={`rotate(${angle * 180 / Math.PI},${w / 2},${h / 2})`} />
              <rect x={w / 2 - 1.5} y={h / 2 + w * 0.09} width={3} height={w * 0.022} fill="#fff" opacity="0.4" transform={`rotate(${angle * 180 / Math.PI},${w / 2},${h / 2})`} />
            </g>
          )
        })}
        {/* Triangles mystiques (rotation animée) */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * 2 * Math.PI;
          const r1 = w * 0.13, r2 = w * 0.18;
          const x1 = w / 2 + Math.cos(angle - Math.PI / 36) * r1;
          const y1 = h / 2 + Math.sin(angle - Math.PI / 36) * r1;
          const x2 = w / 2 + Math.cos(angle + Math.PI / 36) * r1;
          const y2 = h / 2 + Math.sin(angle + Math.PI / 36) * r1;
          const x3 = w / 2 + Math.cos(angle) * r2;
          const y3 = h / 2 + Math.sin(angle) * r2;
          return (
            <motion.polygon
              key={`raven-tri-${i}`}
              points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
              fill="#a084e8"
              opacity="0.13"
              filter="url(#glow1)"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8 + i, repeat: Infinity, ease: "linear" }}
            />
          )
        })}
        {/* Arcs stylisés (distorsion animée) */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.path
            key={`raven-arc-${i}`}
            d={`M ${w / 2 + Math.cos((i / 4) * 2 * Math.PI) * w * 0.09} ${h / 2 + Math.sin((i / 4) * 2 * Math.PI) * w * 0.09}
            A ${w * 0.09} ${w * 0.09} 0 0 1 ${w / 2 + Math.cos(((i + 0.5) / 4) * 2 * Math.PI) * w * 0.09} ${h / 2 + Math.sin(((i + 0.5) / 4) * 2 * Math.PI) * w * 0.09}`}
            stroke="#fff"
            strokeWidth="1.1"
            fill="none"
            opacity="0.3"
            filter="url(#glow2)"
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {/* Glyphes runiques animés (oscillation, glow pulsant, distorsion) */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.text
            key={`raven-glyph-${i}`}
            x={w / 2 + Math.cos((i / 18) * 2 * Math.PI) * w * 0.18}
            y={h / 2 + Math.sin((i / 18) * 2 * Math.PI) * w * 0.18}
            textAnchor="middle"
            fontSize={w * 0.018}
            fill="#fff"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.85,
              scale: [1, 1.13, 1],
              filter: [
                "drop-shadow(0 0 8px #a084e8)",
                "drop-shadow(0 0 16px #fff)",
                "drop-shadow(0 0 8px #a084e8)"
              ],
            }}
            transition={{ duration: 1.5 + i * 0.05, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            style={{ fontFamily: "monospace", letterSpacing: "0.1em" }}
          >
            {String.fromCharCode(0x16A0 + i * 2)}
          </motion.text>
        ))}
        {/* Définitions de glow */}
        <defs>
          <filter id="glow1">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </motion.svg>

      {/* Particules magiques autour du cercle */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`raven-magic-particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            left: `${w / 2 + Math.cos((i / 12) * 2 * Math.PI) * w * 0.18 + (Math.random() - 0.5) * w * 0.03}px`,
            top: `${h / 2 + Math.sin((i / 12) * 2 * Math.PI) * w * 0.18 + (Math.random() - 0.5) * w * 0.03}px`,
            background: "#6c3ebc",
            boxShadow: "0 0 4px 1px #a084e8, 0 0 8px 2px #3a1c71",
            opacity: 0.45,
            filter: "blur(0.5px)",
            zIndex: 12,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.45, 0.3, 0], scale: [0.5, 1.1, 0.8, 0.5] }}
          transition={{ duration: 1.5 + Math.random(), delay: 0.3 + Math.random(), repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
        />
      ))}
      {/* Petits éclairs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`raven-lightning-${i}`}
          className="absolute"
          style={{
            left: `${w / 2 + Math.cos((i / 8) * 2 * Math.PI) * w * 0.19}px`,
            top: `${h / 2 + Math.sin((i / 8) * 2 * Math.PI) * w * 0.19}px`,
            zIndex: 13,
          }}
          initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.7, 1.2, 0.7], rotate: [0, 30 + Math.random() * 60, 0] }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.08, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22">
            <polyline points="2,12 10,10 8,18 18,4 12,12 20,10" stroke="#fff" strokeWidth="2" fill="none" filter="url(#glow2)" />
          </svg>
        </motion.div>
      ))}

      {/* PHASE 2: Incantation phrase */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ zIndex: 20 }}
        initial={{ opacity: 0, scale: 0.7, filter: "blur(18px)" }}
        animate={{ opacity: [0, 1, 1], scale: [0.7, 1.1, 1], filter: ["blur(18px)", "blur(0px)", "blur(0px)"] }}
        transition={{ duration: 0.8, delay: 0.6, times: [0, 0.5, 1], ease: "easeOut" }}
      >
        <div className="flex flex-col gap-2 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            style={{ color: "#a084e8", fontSize: "2.2rem", fontWeight: 700, textShadow: "0 0 28px #a084e8, 0 0 40px #fff" }}
          >
            Azarath
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            style={{ color: "#fff", fontSize: "2.2rem", fontWeight: 700, textShadow: "0 0 28px #fff, 0 0 40px #a084e8" }}
          >
            Metrion
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            style={{ color: "#a084e8", fontSize: "2.2rem", fontWeight: 700, textShadow: "0 0 28px #a084e8, 0 0 40px #fff" }}
          >
            Zinthos
          </motion.div>
        </div>
      </motion.div>

      {/* PHASE 3: Explosion magique très discrète */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: 30 }}
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: [0, 0.5, 0.3, 0], scale: [0.2, 1.1, 1.3, 1.5], filter: ["blur(0px)", "blur(2px)", "blur(4px)", "blur(6px)"] }}
        transition={{ duration: 1.0, delay: 1.8, times: [0, 0.2, 0.7, 1], ease: "easeInOut" }}
      >
        <div
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #181a23 10%, #3a1c71 40%, #000 80%, transparent 100%)",
            filter: "blur(2px) contrast(0.9)",
            boxShadow: "0 0 8px 2px #3a1c71, 0 0 12px 4px #181a23",
            opacity: 0.7,
          }}
        />
      </motion.div>

      {/* PHASE 4: Corbeaux burst */}
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.svg
          key={`raven-crow-${i}`}
          width="70"
          height="70"
          viewBox="0 0 60 60"
          className="absolute"
          style={{
            left: w / 2,
            top: h / 2,
            zIndex: 40,
            pointerEvents: "none",
          }}
          initial={{
            x: 0,
            y: 0,
            scale: 0.7,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            x: Math.cos((i / 16) * 2 * Math.PI) * (w * 0.33 + Math.random() * w * 0.18),
            y: Math.sin((i / 16) * 2 * Math.PI) * (h * 0.25 + Math.random() * h * 0.13),
            scale: [0.7, 1.4, 0.9 + Math.random() * 0.7],
            opacity: [0, 1, 0.8, 0],
            rotate: Math.random() * 360 - 180,
          }}
          transition={{
            duration: 1.2,
            delay: 2.8 + i * 0.03,
            times: [0, 0.3, 0.7, 1],
            ease: "easeInOut",
          }}
        >
          {/* Silhouette corbeau stylisée */}
          <path
            d="M10 40 Q30 10 50 40 Q40 35 30 40 Q20 45 10 40 Z"
            fill="#222"
            stroke="#fff"
            strokeWidth="1.5"
            opacity="0.95"
            filter="url(#glow2)"
          />
          <path
            d="M30 40 Q32 30 38 32 Q34 38 30 40 Z"
            fill="#fff"
            opacity="0.22"
          />
        </motion.svg>
      ))}

      {/* PHASE 5: Apparition de Raven (image animée subtilement) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.7, filter: "blur(18px)" }}
        animate={{ opacity: [0, 1, 1], scale: [0.7, 1.1, 1], filter: ["blur(18px)", "blur(0px)", "blur(0px)"] }}
        transition={{ duration: 1.2, delay: 3.2, times: [0, 0.5, 1], ease: "easeInOut" }}
        style={{ zIndex: 50 }}
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
            src="/images/intro/raven.png"
            alt="Raven Teen Titans"
            width={340}
            height={340}
            style={{
              objectFit: "contain",
              borderRadius: "50%",
              boxShadow: "0 0 60px 10px #a084e8, 0 0 120px 30px #fff"
            }}
            priority
          />
        </motion.div>
        {/* Particules magiques devant l'image (moins nombreuses et moins lumineuses) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`raven-img-particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `calc(50% + ${Math.cos((i / 8) * 2 * Math.PI) * 90 + (Math.random() - 0.5) * 18}px)`,
              top: `calc(50% + ${Math.sin((i / 8) * 2 * Math.PI) * 90 + (Math.random() - 0.5) * 18}px)`,
              background: "#6c3ebc",
              boxShadow: "0 0 4px 1px #a084e8, 0 0 8px 2px #3a1c71",
              opacity: 0.45,
              filter: "blur(0.5px)",
              zIndex: 52,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.45, 0.3, 0], scale: [0.5, 1.1, 0.8, 0.5] }}
            transition={{ duration: 1.8 + Math.random(), delay: 3.5 + Math.random(), repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
