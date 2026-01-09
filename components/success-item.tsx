"use client";

import { motion } from "framer-motion";
import { SuccessCheckbox } from "./ui/success-checkbox";
import type { SuccessWithProgress } from "@/lib/successes/types";

interface Props {
  success: SuccessWithProgress;
  isAdmin: boolean;
}

export function SuccessItem({ success, isAdmin }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-sheikah-card border border-sheikah-blue/30 rounded-lg p-6 hover:border-sheikah-blue hover:shadow-glow transition-all"
    >
      <div className="flex items-start gap-4">
        <SuccessCheckbox
          successId={success.id}
          isCompleted={success.isCompleted}
          isAdmin={isAdmin}
        />

        <div className="flex-1">
          <h3 className="font-bold text-xl text-sheikah-blue mb-2">
            {success.title}
          </h3>
          <p className="text-sheikah-blue/70 text-sm">{success.description}</p>

          {success.completedAt && (
            <p className="text-sheikah-gold text-xs mt-2">
              Complete: {new Date(success.completedAt).toLocaleDateString("fr-FR")}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
