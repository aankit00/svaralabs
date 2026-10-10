import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";

const outfit = Outfit({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Swarlabs",
  // Only public marketing pages explicitly opt in to search indexing.
  robots: { index: false, follow: false },
  title: {
    default: "Swarlabs",
    template: "%s | Swarlabs"
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: "/logo-light.svg", media: "(prefers-color-scheme: light)", type: "image/svg+xml", sizes: "38x38" },
      { url: "/logo-dark.svg", media: "(prefers-color-scheme: dark)", type: "image/svg+xml", sizes: "38x38" },
    ],
    shortcut: [
      { url: "/logo-light.svg", media: "(prefers-color-scheme: light)", type: "image/svg+xml", sizes: "38x38" },
      { url: "/logo-dark.svg", media: "(prefers-color-scheme: dark)", type: "image/svg+xml", sizes: "38x38" },
    ],
    apple: "/logo-light.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
