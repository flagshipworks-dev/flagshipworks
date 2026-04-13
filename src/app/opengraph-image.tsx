import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "FlagshipWorks合同会社";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const geistBold = readFileSync(
    join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf")
  );
  const geistRegular = readFileSync(
    join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf")
  );

  // ロゴSVGを読み込み、fillを白に変更
  const logoSvg = readFileSync(join(process.cwd(), "public/logo.svg"), "utf-8").replace(
    "fill: #191e28",
    "fill: #ffffff"
  );
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

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
          fontFamily: "Geist",
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "Geist",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.2em",
              color: "#93c5fd",
            }}
          >
            {"// "}
          </span>
          <span
            style={{
              fontFamily: "Geist",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            FLAGSHIP WORKS — DESIGNATION
          </span>
        </div>

        {/* メインコンテンツ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontFamily: "Geist",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: "0.5em",
              color: "rgba(255,255,255,0.45)",
              display: "flex",
            }}
          >
            The Platform for Flagships.
          </div>

          {/* ロゴ画像 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={600}
            height={88}
            alt="FlagshipWorks"
            style={{ objectFit: "contain", objectPosition: "left" }}
          />
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
              fontFamily: "Geist",
              fontWeight: 400,
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
                fontFamily: "Geist",
                fontWeight: 700,
                fontSize: 12,
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
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistBold, style: "normal", weight: 700 },
        { name: "Geist", data: geistRegular, style: "normal", weight: 400 },
      ],
    }
  );
}
