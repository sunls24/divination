import "./globals.css";
import type { Metadata, Viewport } from "next";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import Umami from "@/components/umami";

export const metadata: Metadata = {
  title: "AI 算卦 - 在线卜卦 GPT4 解读",
  description:
    "AI 算卦 - 通过进行六次硬币的随机卜筮，生成卦象，并使用 AI 对卦象进行分析｜AI 算命、在线算命、在线算卦、周易易经64卦",
  appleWebApp: {
    title: "AI 算卦",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f4" },
    { media: "(prefers-color-scheme: dark)", color: "#333333" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cn" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.VERCEL && <Analytics />}
        <Umami />
      </body>
    </html>
  );
}
