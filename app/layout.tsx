import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import MobileStickyBar from "./components/MobileStickyBar";
import "./globals.css";

/* ─── Fonts ─────────────────────────────────────────────────────────── */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

/* ─── Viewport (NOT inside metadata per Next.js 14+ deprecation) ───── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F172A",
};

/* ─── SEO Metadata ──────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://ironcarlocation.ma"),
  title: {
    default: "Iron Car Location – Location de Voiture à Tanger, Maroc",
    template: "%s | Iron Car Location Tanger",
  },
  description:
    "Louez une voiture premium à Tanger avec Iron Car Location. Large flotte de véhicules récents, tarifs transparents, livraison à domicile et à l'aéroport. Réservez en ligne ou via WhatsApp.",
  keywords: [
    "location voiture Tanger",
    "car rental Tangier Morocco",
    "louer voiture Maroc",
    "Iron Car Location",
    "location voiture aéroport Tanger",
    "voiture pas cher Tanger",
  ],
  authors: [{ name: "Iron Car Location", url: "https://ironcarlocation.ma" }],
  creator: "Iron Car Location",
  publisher: "Iron Car Location",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    alternateLocale: ["en_US", "ar_MA"],
    url: "https://ironcarlocation.ma",
    siteName: "Iron Car Location",
    title: "Iron Car Location – Location de Voiture Premium à Tanger",
    description:
      "Louez une voiture à Tanger avec Iron Car Location. Flotte récente, prix transparents, livraison incluse.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Iron Car Location – Location voiture Tanger Maroc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iron Car Location – Location Voiture Tanger",
    description:
      "Louez une voiture premium à Tanger. Tarifs transparents, livraison incluse.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "fr-MA": "/",
      "en-US": "/en",
      "ar-MA": "/ar",
    },
  },
};

/* ─── Root Layout ───────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#F8FAFC]" suppressHydrationWarning>
        {/* Main content */}
        {children}

        {/* Floating WhatsApp – visible on all pages */}
        <FloatingWhatsApp />
        <MobileStickyBar />

        {/* Vercel Observability */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
