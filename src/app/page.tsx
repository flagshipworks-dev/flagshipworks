import { ArrowDown, ArrowRight, Code2, Building2, Activity, Monitor } from "lucide-react";
import Link from "next/link";
import { StarField } from "@/components/StarField";
import { FadeIn } from "@/components/FadeIn";
import { getAllLogs, getAllWorks } from "@/lib/content";

/* ── 設計図クロスヘア ── */
function Crosshair({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      aria-hidden
    >
      <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="0.75" />
      <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

/* ── セクション技術ラベル ── */
function TechLabel({ children }: { children: string }) {
  const hasPrefix = children.startsWith("// ");
  const text = hasPrefix ? children.slice(3) : children;
  return (
    <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-foreground/30">
      {hasPrefix && <span className="text-blue-300">{"// "}</span>}
      {text}
    </p>
  );
}

/* ── ブループリントレティクル（ヒーロー右パネル） ── */
function BlueprintReticle({ className }: { className?: string }) {
  const cx = 260, cy = 260;
  const rOuter = 160, rInner = 90, rCenter = 14;
  const origin = `${cx}px ${cy}px`;

  const units = [
    { angle: -90, id: "01", name: "WEB & DIGITAL", delay: "0s"   },
    { angle:  30, id: "02", name: "HOSPITALITY",   delay: "1s"   },
    { angle: 150, id: "03", name: "MEDICAL",        delay: "2s"   },
  ];

  return (
    <svg viewBox="0 0 520 520" fill="none" stroke="currentColor" className={className} aria-hidden>
      {/* 外周リング＋目盛り（ゆっくり時計回り） */}
      <g style={{ transformOrigin: origin, animation: 'reticle-cw 60s linear infinite' }}>
        <circle cx={cx} cy={cy} r={rOuter} strokeWidth="0.8" strokeOpacity="0.45" />
        {Array.from({ length: 36 }, (_, i) => {
          const a = (i * 10 * Math.PI) / 180;
          const isMajor = i % 9 === 0;
          const r2 = rOuter - (isMajor ? 14 : 7);
          return (
            <line
              key={i}
              x1={cx + rOuter * Math.cos(a)} y1={cy + rOuter * Math.sin(a)}
              x2={cx + r2     * Math.cos(a)} y2={cy + r2     * Math.sin(a)}
              strokeWidth={isMajor ? "1" : "0.5"}
              strokeOpacity={isMajor ? "0.55" : "0.25"}
            />
          );
        })}
      </g>

      {/* 内周リング（反時計回り） */}
      <g style={{ transformOrigin: origin, animation: 'reticle-ccw 25s linear infinite' }}>
        <circle cx={cx} cy={cy} r={rInner} strokeWidth="0.9" strokeDasharray="10,8" strokeOpacity="0.45" />
      </g>

      {/* センターマーカー */}
      <circle cx={cx} cy={cy} r={rCenter} strokeWidth="0.8" strokeOpacity="0.55" />

      {/* クロスヘア */}
      <line x1="20"           y1={cy}           x2={cx - rCenter} y2={cy}           strokeWidth="0.6" strokeOpacity="0.3" />
      <line x1={cx + rCenter} y1={cy}           x2="500"          y2={cy}           strokeWidth="0.6" strokeOpacity="0.3" />
      <line x1={cx}           y1="20"           x2={cx}           y2={cy - rCenter} strokeWidth="0.6" strokeOpacity="0.3" />
      <line x1={cx}           y1={cy + rCenter} x2={cx}           y2="500"          strokeWidth="0.6" strokeOpacity="0.3" />

      {/* レーダースイープライン */}
      <g style={{ transformOrigin: origin, animation: 'reticle-cw 5s linear infinite' }}>
        <line
          x1={cx} y1={cy} x2={cx} y2={cy - rOuter}
          stroke="#93c5fd" strokeWidth="1" strokeOpacity="0.7"
        />
      </g>

      {/* センタードット（点滅） */}
      <circle
        cx={cx} cy={cy} r={4}
        fill="#93c5fd" strokeWidth="0"
        style={{ animation: 'reticle-blink 2s ease-in-out infinite' }}
      />

      {/* ユニットマーカー＋コールアウト */}
      {units.map(({ angle, id, name, delay }) => {
        const rad  = (angle * Math.PI) / 180;
        const dx   = Math.cos(rad), dy = Math.sin(rad);
        const dotX = cx + rOuter * dx, dotY = cy + rOuter * dy;
        const ex   = dotX + dx * 24,   ey   = dotY + dy * 24;
        const isTop   = dy < -0.7;
        const isRight = dx > -0.1;
        const hx2     = isTop ? ex + 38 : ex + (isRight ? 38 : -38);
        const textX   = isTop || isRight ? hx2 + 5 : hx2 - 5;
        const anchor  = isTop || isRight ? "start" : "end";
        return (
          <g key={id} style={{ animation: `reticle-blink 3s ease-in-out ${delay} infinite` }}>
            <circle cx={dotX} cy={dotY} r="5.5" stroke="#93c5fd" strokeWidth="1" strokeOpacity="0.7" fill="none" />
            <circle cx={dotX} cy={dotY} r="2"   fill="#93c5fd"   strokeWidth="0" opacity="0.9" />
            <line x1={dotX} y1={dotY} x2={ex}  y2={ey}  strokeWidth="0.6" strokeDasharray="4,3" strokeOpacity="0.4" />
            <line x1={ex}   y1={ey}   x2={hx2} y2={ey}  strokeWidth="0.6" strokeOpacity="0.4" />
            <text x={textX} y={ey - 3}  textAnchor={anchor} fontSize="8"   fill="currentColor" fillOpacity="0.65" stroke="none" fontFamily="monospace" letterSpacing="1.5">{`UNIT.${id}`}</text>
            <text x={textX} y={ey + 10} textAnchor={anchor} fontSize="6.5" fill="currentColor" fillOpacity="0.4"  stroke="none" fontFamily="monospace" letterSpacing="1"  >{name}</text>
          </g>
        );
      })}

      {/* 座標アノテーション */}
      <text x={cx} y="16"  textAnchor="middle" fontSize="7" fill="currentColor" fillOpacity="0.3" stroke="none" fontFamily="monospace" letterSpacing="2">REF: FW-CORP-01</text>
      <text x={cx} y="510" textAnchor="middle" fontSize="7" fill="currentColor" fillOpacity="0.3" stroke="none" fontFamily="monospace" letterSpacing="2">REV. 1.0 — 2025</text>
    </svg>
  );
}

/* ── 事業領域データ ── */
const businesses = [
  {
    number: "01",
    ref: "// UNIT.01 — WEB & DIGITAL",
    icon: Code2,
    title: "Web · IT",
    subtitle: "Web / Digital",
    description:
      "Webサイト制作・システム開発・デジタル戦略の立案まで、ビジネスのデジタル基盤を構築します。",
  },
  {
    number: "02",
    ref: "// UNIT.02 — HOSPITALITY",
    icon: Building2,
    title: "民泊 · 旅館業",
    subtitle: "Hospitality",
    description:
      "デザインと細部へのこだわりが生む、唯一無二の宿泊体験を企画・運営します。",
  },
  {
    number: "03",
    ref: "// UNIT.03 — MEDICAL",
    icon: Activity,
    title: "医療",
    subtitle: "Medical",
    description:
      "眼科専門医の知見を活かし、医療とデザインが融合した新しい医療事業を展開します。",
  },
];

/* ── メンバーデータ ── */
const members = [
  {
    id: "01",
    ref: "// MEMBER.01 — REPRESENTATIVE",
    role: "代表社員",
    name: "金森祥治",
    bio: "IT業界にてCDOとして実務を指揮しつつ、事業推進および組織構築に従事。単なる戦略策定に留まらず、自ら実務に携わりながら事業が継続する体制を構築してきた点が特徴である。\nデザイナーのアサイン管理や採用計画、売上進捗に基づく数値管理など、事業運営の要諦を一貫して担う。リソースの最適配置や属人化の排除、コスト統制を徹底し、データに基づいた迅速な意思決定で事業の安定成長を支える。",
  },
  {
    id: "02",
    ref: "// MEMBER.02 — EXECUTIVE",
    role: "業務執行社員",
    name: "鈴木規識",
    bio: "常勤医師として約4年間、外来診療、手術、当直業務に継続的に従事。日常診療の完遂はもとより、手術運営や現場調整、患者対応といった医療現場の中核をなす運営業務を専門とする。\n最大の特徴は、単なる診療行為に留まらず、多職種が介在する現場を安全かつ円滑に機能させる「調整役」としての能力にある。常に全体を俯瞰し、リスク管理と効率的な運営を両立させることで、質の高い医療提供体制を支える。",
  },
];

/* ── 会社概要データ ── */
const companyInfo = [
  { label: "COMPANY",  value: "FlagshipWorks合同会社" },
  { label: "CEO",      value: "金森祥治" },
  { label: "CO-FOUNDER", value: "鈴木規識" },
  { label: "FOUNDED",  value: "2026年1月29日" },
  { label: "CAPITAL",  value: "500,000円" },
  { label: "LOCATION", value: "東京都世田谷区" },
  { label: "DOMAIN",   value: "Web・IT / 民泊・旅館業 / 医療" },
];

export default function HomePage() {
  const logs = getAllLogs().slice(0, 3);
  const works = getAllWorks().slice(0, 3);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pt-28 pb-36 md:pt-36 md:pb-44">
        {/* 星空 + 旗艦 */}
        <StarField />

        {/* ネビュラグロー（モバイルでは非表示：blur-filterはiOSで重い） */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute -top-32 right-1/4 h-125 w-125 rounded-full bg-blue-950/40 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 h-100 w-100 rounded-full bg-indigo-950/30 blur-[100px]" />
        </div>

        {/* 上下のラインマーカー */}
        <div className="absolute inset-x-0 top-0 h-px bg-border" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-border" />

        {/* 四隅のクロスヘア */}
        <Crosshair className="absolute top-8 left-8 text-foreground/20" />
        <Crosshair className="absolute top-8 right-8 text-foreground/20" />
        <Crosshair className="absolute bottom-8 left-8 text-foreground/20" />
        <Crosshair className="absolute bottom-8 right-8 text-foreground/20" />

        {/* 技術アノテーション（隅） */}
        <span className="absolute top-10 left-16 font-mono text-[9px] tracking-widest text-foreground/15 hidden md:block">
          SPEC: FW-CORP-01
        </span>
        <span className="absolute bottom-10 right-16 font-mono text-[9px] tracking-widest text-foreground/15 hidden md:block">
          REV. 1.0 — 2025
        </span>

        {/* コンテンツグリッド */}
        <div className="relative z-10 mx-auto flex min-h-[45vh] w-full max-w-6xl items-center">
          <div className="grid w-full grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            {/* 左: テキスト */}
            <FadeIn>
            <div>
              <TechLabel>// FLAGSHIP WORKS — DESIGNATION</TechLabel>

              {/* タグライン */}
              <p className="mb-5 text-xs font-medium tracking-[0.5em] text-muted-foreground uppercase">
                The Platform for Flagships.
              </p>

              {/* メインコピー */}
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-[4.5rem]">
                すべての事業を
                <br />
                旗艦として
              </h1>

              {/* サブコピー */}
              <p className="mt-7 text-sm leading-relaxed text-muted-foreground md:text-base">
                ひとつの母艦から、それぞれの旗艦へ
              </p>
            </div>
            </FadeIn>

            {/* 右: ブループリントレティクル */}
            <div className="hidden md:flex items-center justify-center">
              <BlueprintReticle className="w-full max-w-[480px] text-foreground" />
            </div>
          </div>
        </div>

        {/* スクロールインジケーター */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.5em] text-foreground/60 uppercase">
            Scroll
          </span>
          <div className="relative flex h-10 w-6 items-start justify-center rounded-full border border-foreground/40 pt-1.5">
            <div className="h-2 w-0.5 md:animate-[scroll-dot_1.6s_ease-in-out_infinite] rounded-full bg-foreground/60" />
          </div>
          <ArrowDown className="h-3.5 w-3.5 md:animate-bounce text-foreground/50" strokeWidth={1.5} />
        </div>
      </section>

      {/* ── Business ── */}
      <section id="business" className="relative overflow-hidden border-t border-border bg-card blueprint-grid px-6 py-24 md:py-32">
        {/* ゴーストナンバー */}
        <span className="pointer-events-none absolute -left-4 top-4 select-none font-mono text-[11rem] font-bold leading-none text-foreground/4 md:text-[16rem]">
          01
        </span>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
          <div className="mb-16">
            <TechLabel>// SECTION.01 — BUSINESS DOMAIN</TechLabel>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              事業領域
            </h2>
          </div>
          </FadeIn>

          {/* カードグリッド */}
          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3" id="business-grid">
            {businesses.map(({ number, ref, icon: Icon, title, subtitle, description }, i) => (
              <FadeIn key={number} className="h-full">
              <div
                className="relative flex h-full flex-col bg-background blueprint-grid p-8 md:p-10"
              >
                {/* コーナーブラケット（太め・濃いめ） */}
                <span className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-foreground/35" />
                <span className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-foreground/35" />
                <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-foreground/35" />
                <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-foreground/35" />

                {/* 技術参照ラベル */}
                <p className="mb-6 font-mono text-[9px] tracking-[0.15em] text-blue-300">
                  {ref}
                </p>

                <Icon className="mb-6 h-7 w-7 text-foreground/50" strokeWidth={1.5} />

                <h3 className="mb-1 text-lg font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mb-5 font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                  {subtitle}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
              </FadeIn>
            ))}
          </div>

          {/* 3事業を束ねる寸法線 */}
          <div className="mt-3 px-1 hidden md:block">
            <svg
              viewBox="0 0 1000 28"
              className="w-full text-foreground/25"
              fill="none"
              stroke="currentColor"
              aria-hidden
            >
              {/* 横線 */}
              <line x1="8" y1="14" x2="992" y2="14" strokeWidth="0.8" />
              {/* 端のティック */}
              <line x1="8"   y1="6" x2="8"   y2="22" strokeWidth="0.8" />
              <line x1="992" y1="6" x2="992" y2="22" strokeWidth="0.8" />
              {/* 矢印 */}
              <polyline points="32,9 8,14 32,19"   strokeWidth="0.8" />
              <polyline points="968,9 992,14 968,19" strokeWidth="0.8" />
              {/* 中間ティック（3分割） */}
              <line x1="336" y1="10" x2="336" y2="18" strokeWidth="0.6" />
              <line x1="664" y1="10" x2="664" y2="18" strokeWidth="0.6" />
              {/* ラベル */}
              <text
                x="500" y="11"
                textAnchor="middle"
                fontSize="7"
                fill="currentColor"
                stroke="none"
                fontFamily="monospace"
                letterSpacing="2"
              >
                BUSINESS DOMAIN — 3 UNITS
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="relative overflow-hidden border-t border-border px-6 py-24 md:py-32">
        {/* ゴーストナンバー */}
        <span className="pointer-events-none absolute -right-4 top-4 select-none font-mono text-[11rem] font-bold leading-none text-foreground/4 md:text-[16rem]">
          02
        </span>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
          <div className="mb-16">
            <TechLabel>// SECTION.02 — SERVICES</TechLabel>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              サービス
            </h2>
          </div>
          </FadeIn>

          {/* フィーチャードサービスカード */}
          <FadeIn>
          <div className="relative border border-border bg-card blueprint-grid p-8 md:p-12">
            {/* コーナーブラケット */}
            <span className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-foreground/35" />
            <span className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-foreground/35" />
            <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-foreground/35" />
            <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-foreground/35" />

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
              {/* 左: サービス概要 */}
              <div>
                <p className="mb-6 font-mono text-[9px] tracking-[0.15em] text-blue-300">
                  // SERVICE.01 — MEDICAL WEB
                </p>
                <Monitor className="mb-6 h-7 w-7 text-foreground/50" strokeWidth={1.5} />
                <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  医療業界向け
                  <br />
                  サイト制作
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                  現役眼科医の知見とWebデザインの専門性を掛け合わせ、医療機関に特化したウェブサイトを制作します。患者体験の向上・予約導線の最適化・医療広告ガイドラインへの対応まで、医療現場を知るチームが一貫して担います。
                </p>
                <a
                  href="/service/medical-web"
                  className="inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/5 uppercase"
                >
                  詳しく見る
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* 右: 特徴リスト */}
              <div className="space-y-0 border border-border/50">
                {[
                  { id: "01", label: "医療広告ガイドライン対応" },
                  { id: "02", label: "患者向けUX設計" },
                  { id: "03", label: "予約・問い合わせ導線の最適化" },
                  { id: "04", label: "モバイルファースト対応" },
                  { id: "05", label: "SEO・MEO対策" },
                  { id: "06", label: "現役医師による監修" },
                ].map(({ id, label }, i, arr) => (
                  <div
                    key={id}
                    className={`flex items-center gap-4 p-4 ${i !== arr.length - 1 ? "border-b border-dashed border-border/40" : ""}`}
                  >
                    <span className="shrink-0 font-mono text-[9px] tracking-widest text-foreground/25">{id}</span>
                    <span className="text-sm text-foreground/80">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Works ── */}
      <section id="works" className="relative overflow-hidden border-t border-border bg-card blueprint-grid px-6 py-24 md:py-32">
        {/* ゴーストナンバー */}
        <span className="pointer-events-none absolute -left-4 top-4 select-none font-mono text-[11rem] font-bold leading-none text-foreground/4 md:text-[16rem]">
          03
        </span>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
          <div className="mb-16 flex items-end justify-between gap-8">
            <div>
              <TechLabel>// SECTION.03 — WORKS</TechLabel>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                制作実績
              </h2>
            </div>
            {works.length > 0 && (
              <Link
                href="/works"
                className="hidden shrink-0 items-center gap-3 border border-foreground/20 px-5 py-2.5 font-mono text-xs tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/5 md:inline-flex"
              >
                すべての実績
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
          </FadeIn>

          {works.length === 0 ? (
            <FadeIn>
            <div className="relative border border-border/50 p-12 text-center md:p-20">
              <span className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-foreground/35" />
              <span className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-foreground/35" />
              <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-foreground/35" />
              <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-foreground/35" />
              <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-foreground/25">
                STATUS: LOADING
              </p>
              <p className="text-sm text-muted-foreground">制作実績を順次公開予定</p>
            </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
              {works.map(({ slug, title, category, description }) => (
                <FadeIn key={slug} className="h-full">
                <Link
                  href={`/works/${slug}`}
                  className="group relative flex h-full flex-col bg-background blueprint-grid p-8 transition-colors hover:bg-card"
                >
                  <span className="absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2 border-foreground/35" />
                  <span className="absolute top-0 right-0 h-5 w-5 border-t-2 border-r-2 border-foreground/35" />
                  <span className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-foreground/35" />
                  <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-foreground/35" />
                  <p className="mb-4 font-mono text-[9px] tracking-[0.15em] text-blue-300">{category}</p>
                  <h3 className="mb-3 flex-1 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-blue-300">{title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-foreground/40 group-hover:text-foreground/60">
                    VIEW <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
                </FadeIn>
              ))}
            </div>
          )}

          {works.length > 0 && (
            <div className="mt-6 flex justify-end md:hidden">
              <Link
                href="/works"
                className="inline-flex items-center gap-3 border border-foreground/20 px-5 py-2.5 font-mono text-xs tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/5"
              >
                すべての実績
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="relative overflow-hidden border-t border-border px-6 py-24 md:py-32">
        {/* ゴーストナンバー */}
        <span className="pointer-events-none absolute -right-4 top-4 select-none font-mono text-[11rem] font-bold leading-none text-foreground/4 md:text-[16rem]">
          04
        </span>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
            {/* 左: 見出し */}
            <FadeIn>
            <div>
              <TechLabel>// SECTION.04 — COMPANY PROFILE</TechLabel>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                会社概要
              </h2>
            </div>
            </FadeIn>

            {/* 右: 内容 */}
            <FadeIn>
            <div className="space-y-8">
              <p className="text-sm leading-loose text-muted-foreground">
                FlagshipWorks合同会社は、現役デザイナーと現役眼科医の2名によって設立されました。
                「医療の精密さ」と「デザインの創造性」という専門性を融合させ、
                様々な事業を展開していきます。
              </p>

              {/* スペックシートテーブル */}
              <div className="border border-border/50">
                {companyInfo.map(({ label, value }, i) => (
                  <div
                    key={label}
                    className={`flex gap-0 ${i !== companyInfo.length - 1 ? "border-b border-dashed border-border/40" : ""}`}
                  >
                    <span className="w-28 shrink-0 border-r border-dashed border-border/40 p-3 font-mono text-[10px] tracking-widest text-foreground/35">
                      {label}
                    </span>
                    <span className={`p-3 text-sm ${value === "OPERATIONAL" ? "font-mono text-[11px] tracking-widest text-blue-300" : "text-foreground/80"}`}>
                      {value === "OPERATIONAL" ? (
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" />
                          {value}
                        </span>
                      ) : value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Members ── */}
      <section id="members" className="relative overflow-hidden border-t border-border bg-card blueprint-grid px-6 py-24 md:py-32">
        {/* ゴーストナンバー */}
        <span className="pointer-events-none absolute -left-4 top-4 select-none font-mono text-[11rem] font-bold leading-none text-foreground/4 md:text-[16rem]">
          05
        </span>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
          <div className="mb-16">
            <TechLabel>// SECTION.05 — MEMBERS</TechLabel>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              メンバー
            </h2>
          </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
            {members.map(({ id, ref, role, name, bio }) => (
              <FadeIn key={id} className="h-full">
              <div className="relative flex h-full flex-col bg-background blueprint-grid p-8 md:p-10">
                {/* コーナーブラケット */}
                <span className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-foreground/35" />
                <span className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-foreground/35" />
                <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-foreground/35" />
                <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-foreground/35" />

                {/* 技術参照ラベル */}
                <p className="mb-6 font-mono text-[9px] tracking-[0.15em] text-blue-300">{ref}</p>

                {/* 写真 + 氏名・肩書 横並び */}
                <div className="mb-8 flex items-center gap-6">
                  {/* 写真プレースホルダー */}
                  <div className="relative h-20 w-20 shrink-0 border border-border/50">
                    <svg
                      viewBox="0 0 80 80"
                      className="absolute inset-0 h-full w-full text-foreground/10"
                      fill="none"
                      stroke="currentColor"
                      aria-hidden
                    >
                      <line x1="0" y1="0" x2="80" y2="80" strokeWidth="0.6" />
                      <line x1="80" y1="0" x2="0" y2="80" strokeWidth="0.6" />
                      <line x1="40" y1="0" x2="40" y2="80" strokeWidth="0.4" strokeDasharray="4,4" />
                      <line x1="0" y1="40" x2="80" y2="40" strokeWidth="0.4" strokeDasharray="4,4" />
                      <circle cx="40" cy="40" r="6" strokeWidth="0.6" />
                    </svg>
                    <span className="absolute bottom-1 right-1.5 font-mono text-[7px] tracking-widest text-foreground/20">
                      PHOTO
                    </span>
                  </div>

                  {/* 役職・名前 */}
                  <div>
                    <p className="mb-1.5 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                      {role}
                    </p>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {name}
                    </h3>
                  </div>
                </div>

                {/* 紹介文 */}
                {bio ? (
                  <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{bio}</p>
                ) : (
                  <p className="font-mono text-[9px] tracking-widest text-foreground/20">— BIO COMING SOON —</p>
                )}
              </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Log ── */}
      <section id="log" className="relative overflow-hidden border-t border-border px-6 py-24 md:py-32">
        {/* ゴーストナンバー */}
        <span className="pointer-events-none absolute -right-4 top-4 select-none font-mono text-[11rem] font-bold leading-none text-foreground/4 md:text-[16rem]">
          06
        </span>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
          <div className="mb-16 flex items-end justify-between gap-8">
            <div>
              <TechLabel>// SECTION.06 — LOG</TechLabel>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                ログ
              </h2>
            </div>
            <Link
              href="/log"
              className="hidden shrink-0 items-center gap-3 border border-foreground/20 px-5 py-2.5 font-mono text-xs tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/5 md:inline-flex"
            >
              すべての記事
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          </FadeIn>

          {logs.length > 0 && (
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
              {logs.map(({ slug, title, date, description, tags }) => (
                <FadeIn key={slug} className="h-full">
                <Link
                  href={`/log/${slug}`}
                  className="group relative flex h-full flex-col bg-background blueprint-grid p-8 transition-colors hover:bg-card"
                >
                  <span className="absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2 border-foreground/35" />
                  <span className="absolute top-0 right-0 h-5 w-5 border-t-2 border-r-2 border-foreground/35" />
                  <span className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-foreground/35" />
                  <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-foreground/35" />
                  <p className="mb-4 font-mono text-[9px] tracking-widest text-foreground/30">{date}</p>
                  <h3 className="mb-3 flex-1 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-blue-300">{title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  {tags.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="border border-foreground/15 px-2 py-1 font-mono text-[9px] tracking-widest text-foreground/40">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-foreground/40 group-hover:text-foreground/60">
                    READ <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
                </FadeIn>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-end md:hidden">
            <Link
              href="/log"
              className="inline-flex items-center gap-3 border border-foreground/20 px-5 py-2.5 font-mono text-xs tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/5"
            >
              すべての記事
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="relative overflow-hidden border-t border-border px-6 py-24 md:py-32">
        {/* ゴーストナンバー */}
        <span className="pointer-events-none absolute -left-4 top-4 select-none font-mono text-[11rem] font-bold leading-none text-foreground/4 md:text-[16rem]">
          07
        </span>
        <div className="mx-auto max-w-6xl">
          <FadeIn>
          <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
            <div>
              <TechLabel>// SECTION.07 — CONTACT</TechLabel>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                お問い合わせ
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                事業のご相談、パートナーシップのご提案など、お気軽にご連絡ください。
              </p>
            </div>

            {/* お問い合わせフォームリンク（ブラケット付き） */}
            <div className="relative">
              <Crosshair className="absolute -top-4 -left-4 text-foreground/15" />
              <Crosshair className="absolute -bottom-4 -right-4 text-foreground/15" />
              <a
                href="https://forms.gle/xcK8c2gDTfy8u6G77"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-foreground/20 px-8 py-4 font-mono text-xs tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/5 uppercase"
              >
                お問い合わせフォームへ
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
