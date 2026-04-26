import { ImageResponse } from "next/og";
import { getLog } from "@/lib/content";

export const alt = "FlagshipWorks ログ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const log = getLog(slug);

  // curl の UA を使うと Google Fonts が TTF 形式で返す（Satori が woff2 非対応のため）
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700",
    { headers: { "User-Agent": "curl/7.64.1" } }
  ).then((r) => r.text());
  const ttfUrl = css.match(/src: url\((.+?)\)/)?.[1] ?? "";
  const notoFont = ttfUrl
    ? await fetch(ttfUrl).then((r) => r.arrayBuffer())
    : null;

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
          fontFamily: "Noto Sans JP",
          position: "relative",
        }}
      >
        {/* Blueprint grid 横 */}
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
        {/* Blueprint grid 縦 */}
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
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.2em",
              color: "#93c5fd",
            }}
          >
            {"// "}
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            LOG — FLAGSHIP WORKS
          </span>
        </div>

        {/* メインコンテンツ：タイトル＋タグ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 46,
              lineHeight: 1.45,
              color: "#f5f5f5",
              letterSpacing: "-0.01em",
            }}
          >
            {log.title}
          </div>

          {log.tags.length > 0 && (
            <div style={{ display: "flex", gap: 10 }}>
              {log.tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    padding: "4px 12px",
                    fontSize: 12,
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.4)",
                    display: "flex",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
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
              fontSize: 13,
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
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "rgba(147,197,253,0.5)",
                display: "flex",
              }}
            >
              REF: FW-LOG
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: notoFont
        ? [{ name: "Noto Sans JP", data: notoFont, weight: 700 }]
        : [],
    }
  );
}
