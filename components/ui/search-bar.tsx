"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Rechercher un succès..." }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative max-w-2xl mx-auto">
      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 0 30px rgba(196, 164, 86, 0.4)"
            : "0 0 10px rgba(0, 253, 255, 0.2)",
        }}
        className="relative"
      >
        {/* Sheikah glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sheikah-blue/20 via-transparent to-sheikah-blue/20 blur-md" />

        <div className="relative flex items-center">
          {/* Search icon */}
          <div className="absolute left-5 pointer-events-none">
            <svg
              className={`w-5 h-5 transition-colors ${isFocused ? "text-sheikah-gold" : "text-sheikah-blue"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Input field */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={`w-full pl-14 pr-12 py-4 bg-sheikah-card border-2 rounded-full text-sheikah-blue placeholder:text-sheikah-blue/40 focus:outline-none transition-all duration-300 ${
              isFocused ? "border-sheikah-gold" : "border-sheikah-blue/50"
            }`}
          />

          {/* Clear button */}
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onChange("")}
              className="absolute right-5 text-sheikah-gold hover:text-sheikah-gold transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Decorative Sheikah pattern */}
      <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-sheikah-gold/50" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-sheikah-gold/50" />
    </div>
  );
}
