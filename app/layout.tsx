import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono, DM_Sans } from "next/font/google";
import "@/styles/globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creative Core — Apparel, Branding & Identity Design",
  description:
    "Creative Core is a graphic design studio specializing in streetwear apparel, brand identity, and creative direction.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${spaceMono.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
