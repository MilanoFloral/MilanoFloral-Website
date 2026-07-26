import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "MilanoFloral | Wedding Planning & Floral Design", template: "%s | MilanoFloral" },
  description: "Luxury wedding planning, floral design, event styling and wedding fireworks for deeply personal celebrations in Sri Lanka.",
  keywords: ["wedding planner Sri Lanka", "wedding florist", "event styling", "wedding decorations", "wedding fireworks", "MilanoFloral"],
  openGraph: {
    type: "website",
    locale: "en_LK",
    siteName: "MilanoFloral",
    title: "MilanoFloral — Celebrations, beautifully felt.",
    description: "Wedding planning, floral artistry and unforgettable event experiences in Sri Lanka.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "MilanoFloral" }]
  },
  twitter: { card: "summary_large_image", title: "MilanoFloral", description: "Celebrations, beautifully felt.", images: ["/opengraph-image"] },
  icons: { icon: "/favicon.svg" }
};

export const viewport: Viewport = { themeColor: "#f8f4ef", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
