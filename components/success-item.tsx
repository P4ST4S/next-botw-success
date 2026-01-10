"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SuccessCheckbox } from "./ui/success-checkbox";
import {
  ScanLineEffect,
  CircuitPattern,
  SheikahCorners,
  HexagonalMask,
  HologramGlitch,
  DataStream,
  SelectionTriangles,
} from "./ui/sheikah-effects";
import { sheikahVariants } from "@/lib/animations/sheikah-variants";
import type { SuccessWithProgress } from "@/lib/successes/types";

interface Props {
  success: SuccessWithProgress;
  isAdmin: boolean;
}

export function SuccessItem({ success, isAdmin }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HexagonalMask>
      <motion.div
        layout
        variants={sheikahVariants.cardReveal}
        initial="initial"
        animate="animate"
        exit="exit"
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative bg-sheikah-card border border-sheikah-blue/30 rounded-lg p-6 overflow-hidden group"
        style={{
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      >
        {/* Background data stream */}
        <DataStream />

        {/* Background circuit pattern */}
        <CircuitPattern />

        {/* Sheikah corner decorations */}
        <SheikahCorners />

        {/* Selection triangles for completed items */}
        {success.isCompleted && <SelectionTriangles />}

        {/* Scanning line effect on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <ScanLineEffect />
        </div>

        {/* Glow border on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{
            opacity: 1,
            boxShadow: "0 0 20px rgba(0, 253, 255, 0.4), inset 0 0 20px rgba(0, 253, 255, 0.1)",
            transition: { duration: 0.3 },
          }}
        />

        {/* Content with hologram glitch on hover */}
        <HologramGlitch active={isHovered}>
          <div className="relative z-10 flex items-start gap-4">
            <SuccessCheckbox
              successId={success.id}
              isCompleted={success.isCompleted}
              isAdmin={isAdmin}
            />

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <h3 className="font-bold text-xl text-sheikah-blue mb-2 group-hover:text-shadow-glow transition-all">
                {success.title}
              </h3>
              <p className="text-sheikah-blue/70 text-sm leading-relaxed">
                {success.description}
              </p>

              {success.completedAt && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-sheikah-gold text-xs mt-2 font-semibold"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    Completé le {new Date(success.completedAt).toLocaleDateString("fr-FR")}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </HologramGlitch>
      </motion.div>
    </HexagonalMask>
  );
}
