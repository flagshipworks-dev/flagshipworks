import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FlagshipWorks合同会社";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#191e28",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          position: "relative",
        }}
      >
        {/* ブループリントグリッド（横） */}
        {[90, 210, 330, 450, 570].map((top) => (
          <div
            key={top}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top,
              height: 1,
              background: "rgba(255,255,255,0.028)",
            }}
          />
        ))}
        {/* ブループリントグリッド（縦） */}
        {[120, 240, 360, 480, 600, 720, 840, 960, 1080].map((left) => (
          <div
            key={left}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left,
              width: 1,
              background: "rgba(255,255,255,0.028)",
            }}
          />
        ))}

        {/* 上部ラベル */}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "#93c5fd",
            }}
          >
            {"// "}
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            FLAGSHIP WORKS — DESIGNATION
          </span>
        </div>

        {/* メインコピー */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: "0.5em",
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            The Platform for Flagships.
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            FlagshipWorks
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.1em",
              display: "flex",
            }}
          >
            合同会社
          </div>
        </div>

        {/* 下部 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.25)",
              display: "flex",
            }}
          >
            flagshipworks.co.jp
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "1px solid rgba(147,197,253,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#93c5fd",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "rgba(147,197,253,0.5)",
              }}
            >
              REF: FW-CORP-01
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
