import { StackProvider, StackTheme } from "@stackframe/stack";
import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { Suspense } from "react";
import { stackClientApp } from "../stack/client";
import "./globals.css";
import NavBar from "@/components/nav/nav-bar";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WikiMasters",
    template: "%s | WikiMasters",
  },
  description:
    "A modern wiki platform for sharing knowledge. Create, edit, and share articles with your community.",
  keywords: ["wiki", "knowledge base", "articles", "documentation", "markdown"],
  authors: [{ name: "WikiMasters" }],
  creator: "WikiMasters",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "WikiMasters",
    title: "WikiMasters",
    description:
      "A modern wiki platform for sharing knowledge. Create, edit, and share articles with your community.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WikiMasters",
    description:
      "A modern wiki platform for sharing knowledge. Create, edit, and share articles with your community.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <Suspense>
              <NavBar />
              {children}
            </Suspense>
            <Toaster />
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
