"use client";

import { motion } from "framer-motion";
import { SuccessCheckbox } from "./ui/success-checkbox";
import { ScanLineEffect, CircuitPattern, SheikahCorners } from "./ui/sheikah-effects";
import { sheikahVariants } from "@/lib/animations/sheikah-variants";
import type { SuccessWithProgress } from "@/lib/successes/types";

interface Props {
  success: SuccessWithProgress;
  isAdmin: boolean;
}

export function SuccessItem({ success, isAdmin }: Props) {
  return (
    <motion.div
      layout
      variants={sheikahVariants.cardReveal}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      className="relative bg-sheikah-card border border-sheikah-blue/30 rounded-lg p-6 overflow-hidden group"
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Background circuit pattern */}
      <CircuitPattern />

      {/* Sheikah corner decorations */}
      <SheikahCorners />

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

      {/* Content */}
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
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sheikah-gold text-xs mt-2 font-semibold"
            >
              ✓ Completé le {new Date(success.completedAt).toLocaleDateString("fr-FR")}
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
