"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    await signIn("resend", {
      email,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="w-full px-4 py-3 bg-sheikah-dark border border-sheikah-blue/50 rounded text-sheikah-blue placeholder-sheikah-blue/50 focus:outline-none focus:border-sheikah-blue focus:shadow-glow transition-all"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-sheikah-blue text-sheikah-dark font-bold rounded hover:shadow-glow-lg transition-all disabled:opacity-50"
      >
        {isLoading ? "Sending..." : "Access Slate"}
      </button>
    </form>
  );
}
