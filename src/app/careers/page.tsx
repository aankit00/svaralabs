import { CareersPageView } from "@/features/marketing/views/careers-page-view";
import { publicPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export const metadata = publicPageMetadata(
  "Careers",
  "Explore careers at Swarlabs and our work on speech and language tools. There are currently no open roles; check back for future opportunities.",
  "/careers",
);

export default function CareersPage() {
  return <CareersPageView />;
}
