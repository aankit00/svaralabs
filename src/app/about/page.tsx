import { AboutPageView } from "@/features/marketing/views/about-page-view";
import { publicPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export const metadata = publicPageMetadata(
  "About Our AI Speech & Language Workspace",
  "Learn how Swarlabs brings AI text to speech, speech recognition, translation, and document extraction into one workspace for creators and teams.",
  "/about",
);

export default function AboutPage() {
  return <AboutPageView />;
}
