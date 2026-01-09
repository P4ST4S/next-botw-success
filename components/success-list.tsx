"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SuccessItem } from "./success-item";
import { CategoryFilter } from "./ui/category-filter";
import type { SuccessWithProgress, Category } from "@/lib/successes/types";

interface Props {
  successes: SuccessWithProgress[];
  categories: Category[];
}

export function SuccessList({ successes, categories }: Props) {
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

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredSuccesses.map((success) => (
            <SuccessItem key={success.id} success={success} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
