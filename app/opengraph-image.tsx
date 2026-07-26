import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MilanoFloral — Celebrations, beautifully felt.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f4ef", color: "#302a28", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 540, height: 540, borderRadius: 999, background: "#f2dfda", right: -100, top: -180 }} />
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: 999, border: "2px solid #e9cdc6", left: -100, bottom: -100 }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", zIndex: 2 }}>
        <div style={{ fontFamily: "serif", fontSize: 86, letterSpacing: -3 }}>MilanoFloral</div>
        <div style={{ marginTop: 22, fontFamily: "serif", fontSize: 50 }}>Celebrations, beautifully felt.</div>
        <div style={{ marginTop: 24, fontSize: 20, textTransform: "uppercase", letterSpacing: 7, color: "#9f6f65" }}>Weddings · Florals · Events</div>
      </div>
    </div>, size
  );
}
