"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

interface Props {
  isAdmin: boolean;
  userEmail?: string | null;
}

export function DashboardHeader({ isAdmin, userEmail }: Props) {
  return (
    <header className="bg-sheikah-card border-b border-sheikah-gold/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-sheikah-blue">
            Sheikah Succes-Dex
          </h2>
          {isAdmin && (
            <span className="px-3 py-1 bg-sheikah-blue/20 border border-sheikah-blue text-sheikah-blue text-sm font-medium rounded-full">
              Admin
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAdmin ? (
            <>
              <span className="text-sheikah-blue/70 text-sm">
                {userEmail}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/dashboard" })}
                className="px-4 py-2 bg-sheikah-card border border-sheikah-blue/50 text-sheikah-blue rounded hover:bg-sheikah-blue/10 hover:border-sheikah-blue transition-all font-[family-name:var(--font-wild-breath)]"
              >
                Se deconnecter
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-sheikah-blue text-sheikah-dark font-medium rounded hover:shadow-glow transition-all font-[family-name:var(--font-wild-breath)] text-lg"
            >
              Se connecter (Admin)
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
