"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SuccessItem } from "./success-item";
import { CategoryFilter } from "./ui/category-filter";
import { SearchBar } from "./ui/search-bar";
import { matchesSearch } from "@/lib/utils/normalize";
import type { SuccessWithProgress, Category } from "@/lib/successes/types";

interface Props {
  successes: SuccessWithProgress[];
  categories: Category[];
  isAdmin: boolean;
}

export function SuccessList({ successes, categories, isAdmin }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSuccesses = useMemo(() => {
    let filtered = successes;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((s) => s.category === selectedCategory);
    }

    // Filter by search query (case and accent insensitive)
    if (searchQuery.trim()) {
      filtered = filtered.filter((s) =>
        matchesSearch(s.title, searchQuery) ||
        matchesSearch(s.description, searchQuery)
      );
    }

    return filtered;
  }, [successes, selectedCategory, searchQuery]);

  return (
    <div>
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="mt-8">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Rechercher un succès..."
        />
      </div>

      {!isAdmin && (
        <p className="text-center text-sheikah-blue/70 mt-6 text-sm">
          Mode lecture seule. Connectez-vous en tant qu'admin pour modifier les succes.
        </p>
      )}

      {/* Results counter */}
      {(searchQuery || selectedCategory) && (
        <p className="text-center text-sheikah-blue/60 mt-4 text-sm">
          {filteredSuccesses.length} succès trouvé{filteredSuccesses.length !== 1 ? "s" : ""}
        </p>
      )}

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredSuccesses.length > 0 ? (
            filteredSuccesses.map((success) => (
              <SuccessItem key={success.id} success={success} isAdmin={isAdmin} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="col-span-full text-center py-16"
            >
              <p className="text-sheikah-blue/50 text-lg mb-2">
                Aucun succès trouvé
              </p>
              <p className="text-sheikah-blue/30 text-sm">
                Essayez de modifier vos critères de recherche
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
