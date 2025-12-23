import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Zarshay - Elegant Ladies' Fashion",
  description:
    "Premium ladies' trousers and shirts. Discover timeless elegance and modern style.",
  // generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>

        {/* Favicon */}
        <link rel="icon" href="/images/Zrxyy.png" />
        {/* You can also add other formats if needed */}
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> */}
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
        <Analytics />
        <WhatsAppButton />
      </body>
    </html>
  );
}
