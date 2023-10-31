import "./globals.css";
import type { Metadata, Viewport } from "next";
import React from "react";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "AI 算卦",
  description: "AI 算卦",
  keywords: ["AI", "算卦", "算命", "占卜", "周易", "易经", "64卦", "ChatGPT"],
  appleWebApp: {
    title: "AI 算卦",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f5f5f4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cn">
      <body className="bg-stone-50 text-stone-700">
        {children}
        {!!process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
