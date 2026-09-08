import type { Metadata } from "next";
import { Inter, Space_Grotesk, Unbounded } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Galina Kupina — UX Designer Portfolio",
  description: "UX Designer specializing in UX Research, UX/UI Design, and AI Product Experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${unbounded.variable}`}>
      <body className="font-body bg-white text-[#1a1a1a] antialiased overflow-x-hidden">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
