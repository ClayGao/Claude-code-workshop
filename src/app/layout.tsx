import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getAllPresentationsMetadata } from "@/lib/markdown";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workshop Presentations",
  description: "Interactive workshop presentations built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const presentations = getAllPresentationsMetadata();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col md:flex-row h-screen bg-slate-100 dark:bg-slate-900">
          <MobileNav presentations={presentations} />
          <Sidebar presentations={presentations} />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
