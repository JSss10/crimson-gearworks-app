import type { Metadata } from "next";
import { Orbitron, Exo_2 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import StairsTransitionWrapper from "../components/layout/stairs/stairs-transition-wrapper";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo-2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crimson Gearworks",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${exo2.variable}`}>
        <Navbar />
        {children}
        <StairsTransitionWrapper>{children}</StairsTransitionWrapper>
      </body>
    </html>
  );
}
