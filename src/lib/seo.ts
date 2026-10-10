import type { Metadata } from "next";

// Public search URLs must not inherit a localhost or internal APP_URL.
export const SITE_URL = "https://swarlabs.com";
export const SITE_DESCRIPTION =
  "Create AI voiceovers, transcribe speech, translate text, and extract document content with Swarlabs, a workspace for Indian-language and multilingual tools.";

export function publicPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const fullTitle = `${title} | Swarlabs`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "Swarlabs",
      title: fullTitle,
      description,
      url,
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630,
        alt: "Swarlabs — AI speech and language tools" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: `${SITE_URL}/opengraph-image`,
        alt: "Swarlabs — AI speech and language tools" }],
    },
  };
}
