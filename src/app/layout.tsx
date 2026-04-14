import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MrBurger — Menu | Burger Holešovice, Komunardů, Praha",
  description:
    "MrBurger Praha Holešovice (Komunardů) — šťavnaté burgery, křupavé chicken, wings a bowls. Projděte si naše menu.",
  keywords: [
    "burger",
    "Holešovice",
    "Komunardů",
    "Praha",
    "MrBurger",
    "burger Praha",
    "burger Holešovice",
  ],
  openGraph: {
    title: "MrBurger — Menu",
    description:
      "Šťavnaté burgery, křupavé chicken a wings v Praze Holešovice, Komunardů.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
