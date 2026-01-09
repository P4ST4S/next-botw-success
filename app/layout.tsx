import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const wildBreath = localFont({
  src: "../public/fonts/The Wild Breath of Zelda.otf",
  variable: "--font-wild-breath",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sheikah Succes-Dex | Breath of the Wild",
  description: "Tracker de succes inspire de Zelda: Breath of the Wild avec design Sheikah Slate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${wildBreath.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
