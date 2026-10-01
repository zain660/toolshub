import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ToolsHub — The Ultimate Free Online Developer & Media Utility Suite",
  description: "High-performance, private online tools for PDF merging & splitting, image compression, format conversion, code formatting, hashing, calculators, and AI text assistants.",
  keywords: [
    "online tools",
    "compress image",
    "merge pdf",
    "split pdf",
    "json to csv",
    "hash generator",
    "free developer tools",
    "text clean",
    "percentage calculator",
    "ai rewriter"
  ],
  authors: [{ name: "ToolsHub" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-[#090a0f] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-orange-500 selection:text-white`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
