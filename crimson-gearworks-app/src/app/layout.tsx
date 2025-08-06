import type { Metadata } from "next";
import { Orbitron, Exo_2 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";

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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicons/icon.png', type: 'image/png', sizes: '256x256' },
    ],
    apple: [
      { url: '/favicons/apple-icon.png', sizes: '256x256' },
    ],
  }
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
      </body>
    </html>
  );
}
