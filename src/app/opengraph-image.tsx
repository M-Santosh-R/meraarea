import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MeraArea — Find local businesses near you";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #EA580C 0%, #0F172A 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: 24,
              background: "rgba(255,255,255,0.16)",
              color: "#FFFFFF",
              fontSize: 56,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ display: "flex", color: "#FFFFFF", fontSize: 76, fontWeight: 700, letterSpacing: -1 }}>
            MeraArea
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 28, color: "rgba(255,255,255,0.85)", fontSize: 32 }}>
          Find trusted local businesses near you
        </div>
      </div>
    ),
    { ...size }
  );
}
