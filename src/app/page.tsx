import { HomePageView } from "@/features/marketing/views/home-page-view";
import { publicPageMetadata, SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";
export const metadata = publicPageMetadata(
  "AI Text to Speech & Indian Language Tools",
  SITE_DESCRIPTION,
  "/",
);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Swarlabs",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Swarlabs",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <HomePageView />
    </>
  );
}
