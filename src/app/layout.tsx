import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav/nav-bar";

const manrope = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wikimasters",
  description: "Learn how to build and scale Next.js apps with Brian Holt",
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
      ><StackProvider app={stackClientApp}><StackTheme>
        <NavBar />
        {children}
      </StackTheme></StackProvider></body>
    </html>
  );
}
