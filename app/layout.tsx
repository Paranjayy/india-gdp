import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/ui/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "India GDP — Global Economic Tracker",
  description:
    "An interactive, data-precise visualization of India's economy relative to the world. Historical data from 1960 to 2026 with IMF projections, key milestones, sectoral breakdown, and country-by-country comparison.",
  keywords: ["India GDP", "India economy", "GDP comparison", "IMF data", "World Bank", "economic history India"],
  openGraph: {
    title: "India GDP — Global Economic Tracker",
    description: "India's economy vs the world. Precise, raw, honest data.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}

