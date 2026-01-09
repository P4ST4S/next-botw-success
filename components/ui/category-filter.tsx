"use client";

import { motion } from "framer-motion";
import type { Category } from "@/lib/successes/types";

interface Props {
  categories: Category[];
  selected: string | null;
  onSelect: (categoryId: string | null) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(null)}
        className={`px-6 py-2 rounded-full font-bold transition-all ${
          selected === null
            ? "bg-sheikah-blue text-sheikah-dark shadow-glow"
            : "bg-sheikah-card text-sheikah-blue border border-sheikah-gold/50"
        }`}
      >
        All
      </motion.button>

      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category.id)}
          className={`px-6 py-2 rounded-full font-bold transition-all ${
            selected === category.id
              ? "text-sheikah-dark shadow-glow"
              : "bg-sheikah-card text-sheikah-blue border border-sheikah-gold/50"
          }`}
          style={{
            backgroundColor:
              selected === category.id ? category.color : undefined,
          }}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
}
