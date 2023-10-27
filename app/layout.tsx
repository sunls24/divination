import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "AI 算卦",
  description: "AI 算卦 算命 占卜 周易 易经 64卦",
  viewport: {
    viewportFit: "cover",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  appleWebApp: {
    title: "AI 算卦",
  },
  themeColor: "#f5f5f4",
  icons: {
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cn">
      <body className="bg-stone-50">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
