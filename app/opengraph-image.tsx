import { ImageResponse } from "next/og";

export const alt = "Eventlybuilt by Funbi: from boring to fun";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const tags = [
    "Wedding websites",
    "Digital IVs",
    "Aso-ebi orders",
    "Forms",
    "QR menus",
  ];
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background:
          "linear-gradient(135deg, #fff6f9 0%, #ffd9e8 55%, #f6c2d8 100%)",
        color: "#4a1430",
        fontFamily: "serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            background: "#4a1430",
            color: "#ff8fbf",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          E
        </div>
        <div
          style={{
            fontSize: 30,
            fontFamily: "sans-serif",
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          Eventlybuilt by Funbi
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 108, lineHeight: 1, letterSpacing: -2 }}>
          From boring
        </div>
        <div
          style={{
            fontSize: 108,
            lineHeight: 1,
            letterSpacing: -2,
            color: "#d0457f",
            fontStyle: "italic",
          }}
        >
          to fun.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 12, maxWidth: 820 }}
        >
          {tags.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 999,
                background: "#ffffff",
                border: "2px solid #f0b6cc",
                fontSize: 24,
                fontFamily: "sans-serif",
                fontWeight: 600,
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontFamily: "sans-serif",
            color: "#7a3a58",
          }}
        >
          Abuja · 3–7 days
        </div>
      </div>
    </div>,
    size,
  );
}
