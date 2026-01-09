"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toggleSuccessAction } from "@/app/actions/toggle-success";

interface Props {
  successId: string;
  isCompleted: boolean;
}

export function SuccessCheckbox({ successId, isCompleted }: Props) {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isAnimating, setIsAnimating] = useState(false);

  async function handleToggle() {
    setIsAnimating(true);
    const newState = !isChecked;
    setIsChecked(newState);

    try {
      await toggleSuccessAction(successId);
    } catch (error) {
      // Rollback on error
      setIsChecked(!newState);
    } finally {
      setIsAnimating(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isAnimating}
      className="relative w-8 h-8 flex-shrink-0 border-2 border-sheikah-blue rounded flex items-center justify-center hover:shadow-glow transition-all disabled:opacity-50"
    >
      {isChecked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-full h-full bg-sheikah-blue relative overflow-hidden"
        >
          {/* Scan line effect */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-1 bg-white opacity-60"
          />
        </motion.div>
      )}
    </button>
  );
}
