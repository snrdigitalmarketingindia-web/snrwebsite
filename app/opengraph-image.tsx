import { ImageResponse } from "next/og";

export const alt = "SNR Digital Marketing — Get More Customers Online in India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0A0F1E",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
          {/* SNR block */}
          <div
            style={{
              width: "120px",
              height: "80px",
              background: "#1E3A8A",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Green corner */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 0,
                height: 0,
                borderStyle: "solid",
                borderWidth: "0 52px 52px 0",
                borderColor: "transparent #22C55E transparent transparent",
              }}
            />
            {/* Arrow glyph */}
            <div
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                fontSize: "18px",
                color: "white",
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              ↗
            </div>
            <span style={{ fontSize: "36px", fontWeight: 900, color: "white", letterSpacing: "3px" }}>
              SNR
            </span>
          </div>

          {/* Wordmark */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "32px", fontWeight: 700, color: "#93C5FD" }}>Digital</span>
            <span style={{ fontSize: "32px", fontWeight: 700, color: "#22C55E" }}>Marketing</span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: "900px",
            marginBottom: "20px",
          }}
        >
          Get More Customers Online in India
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: "24px",
            color: "#94A3B8",
            textAlign: "center",
            maxWidth: "760px",
            marginBottom: "36px",
          }}
        >
          SEO · Google Ads · Meta Ads · Websites · AI & GEO
        </div>

        {/* CTA pill */}
        <div
          style={{
            background: "#22C55E",
            color: "#052E16",
            fontSize: "20px",
            fontWeight: 700,
            padding: "12px 36px",
            borderRadius: "12px",
          }}
        >
          Free Business Growth Audit — snrdigitalmarketing.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
