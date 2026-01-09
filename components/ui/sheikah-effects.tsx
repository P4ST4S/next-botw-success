"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Scanning line effect - typical of Sheikah technology
 */
export function ScanLineEffect() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        animate={{
          y: ["0%", "100%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear" as const,
        }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sheikah-blue to-transparent"
        style={{
          boxShadow: "0 0 10px rgba(0, 253, 255, 0.8)",
        }}
      />
    </motion.div>
  );
}

/**
 * Circuit pattern overlay
 */
export function CircuitPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="circuit-pattern"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          {/* Horizontal lines */}
          <line
            x1="0"
            y1="10"
            x2="20"
            y2="10"
            stroke="#C4A456"
            strokeWidth="0.5"
          />
          {/* Vertical lines */}
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="20"
            stroke="#C4A456"
            strokeWidth="0.5"
          />
          {/* Connection points */}
          <circle cx="10" cy="10" r="1" fill="#C4A456" />
        </pattern>
      </defs>
      <rect
        width="100"
        height="100"
        fill="url(#circuit-pattern)"
      />
    </svg>
  );
}

/**
 * Corner decorations - Sheikah angular style
 */
export function SheikahCorners() {
  const cornerSize = 16;
  const strokeWidth = 2;

  return (
    <>
      {/* Top-left */}
      <div className="absolute top-0 left-0 w-4 h-4">
        <svg width={cornerSize} height={cornerSize} className="text-sheikah-gold">
          <line
            x1="0"
            y1={strokeWidth / 2}
            x2={cornerSize}
            y2={strokeWidth / 2}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          <line
            x1={strokeWidth / 2}
            y1="0"
            x2={strokeWidth / 2}
            y2={cornerSize}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
        </svg>
      </div>

      {/* Top-right */}
      <div className="absolute top-0 right-0 w-4 h-4">
        <svg width={cornerSize} height={cornerSize} className="text-sheikah-gold">
          <line
            x1="0"
            y1={strokeWidth / 2}
            x2={cornerSize}
            y2={strokeWidth / 2}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          <line
            x1={cornerSize - strokeWidth / 2}
            y1="0"
            x2={cornerSize - strokeWidth / 2}
            y2={cornerSize}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
        </svg>
      </div>

      {/* Bottom-left */}
      <div className="absolute bottom-0 left-0 w-4 h-4">
        <svg width={cornerSize} height={cornerSize} className="text-sheikah-gold">
          <line
            x1="0"
            y1={cornerSize - strokeWidth / 2}
            x2={cornerSize}
            y2={cornerSize - strokeWidth / 2}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          <line
            x1={strokeWidth / 2}
            y1="0"
            x2={strokeWidth / 2}
            y2={cornerSize}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
        </svg>
      </div>

      {/* Bottom-right */}
      <div className="absolute bottom-0 right-0 w-4 h-4">
        <svg width={cornerSize} height={cornerSize} className="text-sheikah-gold">
          <line
            x1="0"
            y1={cornerSize - strokeWidth / 2}
            x2={cornerSize}
            y2={cornerSize - strokeWidth / 2}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          <line
            x1={cornerSize - strokeWidth / 2}
            y1="0"
            x2={cornerSize - strokeWidth / 2}
            y2={cornerSize}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
        </svg>
      </div>
    </>
  );
}

/**
 * Rectangular mask for BotW-style reveal animation from center
 */
export function HexagonalMask({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{
        clipPath: "inset(45% 45% 45% 45% round 8px)",
        opacity: 0,
      }}
      animate={{
        clipPath: "inset(0% 0% 0% 0% round 8px)",
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hologram glitch effect with chromatic aberration
 */
export function HologramGlitch({ children, active = false }: { children: ReactNode; active?: boolean }) {
  if (!active) return <>{children}</>;

  return (
    <div className="relative">
      {/* Red channel offset */}
      <div className="absolute inset-0 text-red-500 opacity-50 hologram-glitch-layer" style={{ transform: "translate(-2px, 0)" }}>
        {children}
      </div>
      
      {/* Green channel offset */}
      <div className="absolute inset-0 text-green-500 opacity-50 hologram-glitch-layer" style={{ transform: "translate(0, -1px)" }}>
        {children}
      </div>
      
      {/* Blue channel offset */}
      <div className="absolute inset-0 text-blue-500 opacity-50 hologram-glitch-layer" style={{ transform: "translate(2px, 1px)" }}>
        {children}
      </div>
      
      {/* Original */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * Data stream effect - scrolling Sheikah symbols
 */
export function DataStream() {
  const symbols = "⬡◇△▽◯⬢⬣⬠⬡◇△▽";
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
      <motion.div
        animate={{
          y: ["0%", "-100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear" as const,
        }}
        className="flex flex-col gap-4 text-sheikah-blue font-mono text-xs"
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap">
            {symbols.repeat(20)}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Selection triangles - BotW inventory style
 */
export function SelectionTriangles() {
  return (
    <>
      {/* Top-left triangle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute top-2 left-2"
      >
        <svg width="16" height="16" className="text-sheikah-blue">
          <polygon points="0,0 16,0 0,16" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Top-right triangle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
        className="absolute top-2 right-2"
      >
        <svg width="16" height="16" className="text-sheikah-blue">
          <polygon points="0,0 16,0 16,16" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Bottom-left triangle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
        className="absolute bottom-2 left-2"
      >
        <svg width="16" height="16" className="text-sheikah-blue">
          <polygon points="0,0 0,16 16,16" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Bottom-right triangle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
        className="absolute bottom-2 right-2"
      >
        <svg width="16" height="16" className="text-sheikah-blue">
          <polygon points="16,0 16,16 0,16" fill="currentColor" />
        </svg>
      </motion.div>
    </>
  );
}

/**
 * Animated Sheikah Eye symbol
 */
export function SheikahEye({ size = 24 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="text-sheikah-blue"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Outer eye shape */}
      <motion.path
        d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      {/* Inner circle */}
      <motion.circle
        cx="12"
        cy="11.5"
        r="3.5"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      />
      {/* Tear drop */}
      <motion.path
        d="M12 15.5 L12 18.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      />
    </motion.svg>
  );
}
