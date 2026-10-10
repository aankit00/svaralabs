import { ImageResponse } from "next/og";

export const alt = "Swarlabs — AI speech and language tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%",
        height: "100%", padding: "64px 72px", background: "#fff8eb", color: "#4b1724",
        justifyContent: "space-between", borderBottom: "16px solid #6f2432" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 38, fontWeight: 700 }}>Swarlabs</div>
          <div style={{ fontSize: 24, color: "#75535a" }}>swarlabs.com</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
            Create. Transcribe. Translate.
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: "#75535a", maxWidth: 960 }}>
            AI speech and language tools for creators and teams.
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 22 }}>
          {["Text to speech", "Transcription", "Translation", "Document extraction"].map((label) => (
            <div key={label} style={{ padding: "14px 20px", borderRadius: 30,
              background: "#f3e0c3", color: "#6f2432" }}>{label}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
