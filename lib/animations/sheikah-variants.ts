/**
 * Sheikah-themed Framer Motion animation variants
 * Inspired by Breath of the Wild's Sheikah Slate UI
 */

import type { Variants } from "framer-motion";

export const sheikahVariants = {
  // Card reveal animation with hexagonal effect
  cardReveal: {
    initial: {
      opacity: 0,
      scale: 0.8,
      rotateX: -15,
      y: 20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
        opacity: { duration: 0.3 },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateX: 15,
      transition: { duration: 0.2 },
    },
  },

  // Scanning line effect
  scanLine: {
    animate: {
      y: ["0%", "100%"],
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  },

  // Glow pulse effect
  glowPulse: {
    animate: {
      boxShadow: [
        "0 0 10px rgba(0, 253, 255, 0.3)",
        "0 0 20px rgba(0, 253, 255, 0.6)",
        "0 0 10px rgba(0, 253, 255, 0.3)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  // Circuit pattern animations
  circuitLine: {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: [0, 1, 0.6],
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
  },

  // Hexagonal grid reveal
  hexReveal: {
    initial: {
      clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
      opacity: 0,
    },
    animate: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      opacity: 1,
      transition: {
        clipPath: { duration: 0.5, ease: "easeOut" },
        opacity: { duration: 0.3 },
      },
    },
  },

  // Stagger children for lists
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },

  // Hover effect with glow intensification
  hoverGlow: {
    rest: {
      boxShadow: "0 0 10px rgba(0, 253, 255, 0.2)",
      scale: 1,
    },
    hover: {
      boxShadow: "0 0 30px rgba(0, 253, 255, 0.6)",
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  },

  // Complete animation (for checked items)
  completeFlash: {
    animate: {
      opacity: [1, 0.5, 1],
      scale: [1, 1.1, 1],
      boxShadow: [
        "0 0 10px rgba(196, 164, 86, 0.3)",
        "0 0 40px rgba(196, 164, 86, 0.8)",
        "0 0 10px rgba(196, 164, 86, 0.3)",
      ],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  },
};

// Spring configurations for different use cases
export const sheikahSprings = {
  gentle: { type: "spring" as const, stiffness: 120, damping: 14 },
  snappy: { type: "spring" as const, stiffness: 260, damping: 20 },
  bouncy: { type: "spring" as const, stiffness: 300, damping: 15 },
};
