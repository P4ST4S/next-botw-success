"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SuccessItem } from "./success-item";
import { CategoryFilter } from "./ui/category-filter";
import type { SuccessWithProgress, Category } from "@/lib/successes/types";

interface Props {
  successes: SuccessWithProgress[];
  categories: Category[];
  isAdmin: boolean;
}

export function SuccessList({ successes, categories, isAdmin }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSuccesses = useMemo(() => {
    if (!selectedCategory) return successes;
    return successes.filter((s) => s.category === selectedCategory);
  }, [successes, selectedCategory]);

  return (
    <div>
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {!isAdmin && (
        <p className="text-center text-sheikah-blue/70 mt-6 text-sm">
          Mode lecture seule. Connectez-vous en tant qu'admin pour modifier les succes.
        </p>
      )}

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredSuccesses.map((success) => (
            <SuccessItem key={success.id} success={success} isAdmin={isAdmin} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
