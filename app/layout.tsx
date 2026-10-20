import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nano Banana | Future of Freshness",
  description:
    "Experience the revolution of pure, cold-pressed artisanal refreshment. Nano Banana combines cutting-edge HPP technology with hand-harvested ingredients for an unmatched sensory journey.",
  keywords: [
    "Nano Banana",
    "Cold Pressed Juice",
    "Alphonso Mango",
    "Dutch Chocolate",
    "Ruby Pomegranate",
    "Scrollytelling",
    "Premium Beverages",
  ],
  authors: [{ name: "Nano Banana Co." }],
  openGraph: {
    title: "Nano Banana | Future of Freshness",
    description: "Cold-pressed juices crafted with zero heat, zero preservatives, and 100% pure flavor.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFB74D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={`${outfit.className} antialiased selection:bg-orange-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
