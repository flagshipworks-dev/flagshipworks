import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Monitor, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "医療業界向けサイト制作",
  description:
    "現役眼科医の知見とWebデザインの専門性を掛け合わせ、医療機関に特化したウェブサイトを制作します。医療広告ガイドライン対応・患者UX設計・SEO・MEO対策まで一貫して担います。",
  keywords: [
    "医療業界 サイト制作",
    "医療 ホームページ制作",
    "クリニック ホームページ",
    "病院 ウェブサイト",
    "医療広告ガイドライン",
    "医療 SEO",
    "医療 MEO",
    "眼科 ホームページ",
    "FlagshipWorks",
  ],
  alternates: {
    canonical: "https://flagshipworks.co.jp/service/medical-web",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://flagshipworks.co.jp/service/medical-web",
    siteName: "FlagshipWorks合同会社",
    title: "医療業界向けサイト制作 | FlagshipWorks",
    description:
      "現役眼科医の知見とWebデザインの専門性を掛け合わせ、医療機関に特化したウェブサイトを制作します。医療広告ガイドライン対応・患者UX設計・SEO対策まで一貫して担います。",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "医療業界向けサイト制作 | FlagshipWorks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "医療業界向けサイト制作 | FlagshipWorks",
    description:
      "現役眼科医の知見とWebデザインの専門性を掛け合わせ、医療機関に特化したウェブサイトを制作します。",
    images: ["/opengraph-image"],
  },
};

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

const features = [
  {
    id: "01",
    title: "医療広告ガイドライン対応",
    description:
      "厚生労働省の医療広告ガイドラインに準拠したコンテンツ設計・校正を行います。不適切な表現リスクを排除し、安心して公開できるサイトを構築します。",
  },
  {
    id: "02",
    title: "患者向けUX設計",
    description:
      "来院前の不安軽減・診療内容の分かりやすい説明・アクセス情報の最適化など、患者の動線を意識した情報設計を行います。",
  },
  {
    id: "03",
    title: "予約・問い合わせ導線の最適化",
    description:
      "オンライン予約システムの導入・問い合わせフォームの設置など、患者が行動しやすい導線を設計します。",
  },
  {
    id: "04",
    title: "モバイルファースト対応",
    description:
      "スマートフォンからのアクセスが多い医療サイトの特性を踏まえ、すべてのデバイスで快適に閲覧できるレスポンシブデザインを実装します。",
  },
  {
    id: "05",
    title: "SEO・MEO対策",
    description:
      "地域名＋診療科目での検索上位表示を目指すSEO対策と、Googleマップでの露出を高めるMEO対策を実施します。",
  },
  {
    id: "06",
    title: "現役医師による監修",
    description:
      "業務執行社員である現役眼科医が医療コンテンツを監修します。専門的な観点から正確かつ適切な情報発信をサポートします。",
  },
];

const process = [
  { step: "01", title: "ヒアリング", description: "診療内容・ターゲット患者層・競合環境・ご要望を詳しくお聞きします。" },
  { step: "02", title: "設計・提案", description: "サイト構成・デザインコンセプト・スケジュールをご提案します。" },
  { step: "03", title: "デザイン制作", description: "ガイドラインに沿ったビジュアルデザインを制作し、フィードバックを反映します。" },
  { step: "04", title: "コーディング・実装", description: "高速・安全・SEOに強いコードで実装します。" },
  { step: "05", title: "医師監修・最終確認", description: "コンテンツを医師が監修し、広告ガイドライン遵守を確認します。" },
  { step: "06", title: "公開・サポート", description: "サイトを公開後も、更新サポートや改善提案を継続的に行います。" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "医療業界向けサイト制作",
  description:
    "現役眼科医の知見とWebデザインの専門性を掛け合わせ、医療機関に特化したウェブサイトを制作します。医療広告ガイドライン対応・患者UX設計・SEO・MEO対策まで一貫して担います。",
  url: "https://flagshipworks.co.jp/service/medical-web",
  serviceType: "Webサイト制作",
  areaServed: {
    "@type": "Country",
    name: "Japan",
  },
  provider: {
    "@type": "Organization",
    name: "FlagshipWorks合同会社",
    url: "https://flagshipworks.co.jp",
  },
};

export default function MedicalWebPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── ヘッダー ── */}
      <section className="relative overflow-hidden border-b border-border px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-blue-950/30 blur-[100px]" />
        </div>
        <div className="mx-auto max-w-6xl">
          {/* 戻るリンク */}
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground uppercase"
          >
            <ArrowLeft className="h-3 w-3" />
            トップへ戻る
          </Link>

          <TechLabel>// SERVICE.01 — MEDICAL WEB</TechLabel>
          <div className="flex items-start gap-6">
            <Monitor className="mt-1 h-8 w-8 shrink-0 text-foreground/40" strokeWidth={1.2} />
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                医療業界向けサイト制作
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                現役眼科医の知見とWebデザインの専門性を掛け合わせ、医療機関に特化したウェブサイトを制作します。
                医療現場を知るチームが、患者体験の向上から広告ガイドライン対応まで一貫して担います。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 特徴 ── */}
      <section className="border-b border-border bg-card blueprint-grid px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <TechLabel>// FEATURES — 6 POINTS</TechLabel>
          <h2 className="mb-12 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            サービスの特徴
          </h2>

          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ id, title, description }) => (
              <div key={id} className="relative bg-background blueprint-grid p-8">
                {/* コーナーブラケット */}
                <span className="absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2 border-foreground/35" />
                <span className="absolute top-0 right-0 h-5 w-5 border-t-2 border-r-2 border-foreground/35" />
                <span className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-foreground/35" />
                <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-foreground/35" />

                <p className="mb-4 font-mono text-[9px] tracking-[0.15em] text-blue-300">{id}</p>
                <h3 className="mb-3 text-sm font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── こんな医療機関に ── */}
      <section className="border-b border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
            <div>
              <TechLabel>// TARGET — WHO WE SERVE</TechLabel>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                こんな医療機関に
              </h2>
            </div>
            <div className="space-y-0 border border-border/50">
              {[
                "開業・移転にあわせてサイトをリニューアルしたい",
                "既存サイトが古く、スマートフォンに対応していない",
                "患者からの問い合わせや予約をオンラインで受けたい",
                "Googleマップでの露出を増やして新患を獲得したい",
                "医療広告ガイドラインに不安があり専門家に任せたい",
                "医師や医療機関の視点でコンテンツを監修してほしい",
              ].map((item, i, arr) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-4 ${i !== arr.length - 1 ? "border-b border-dashed border-border/40" : ""}`}
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-300/70" strokeWidth={1.5} />
                  <span className="text-sm text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 制作の流れ ── */}
      <section className="border-b border-border bg-card blueprint-grid px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <TechLabel>// PROCESS — 6 STEPS</TechLabel>
          <h2 className="mb-12 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            制作の流れ
          </h2>

          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {process.map(({ step, title, description }) => (
              <div key={step} className="relative bg-background p-8">
                <p className="mb-4 font-mono text-[9px] tracking-[0.15em] text-blue-300">STEP.{step}</p>
                <h3 className="mb-3 text-sm font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <TechLabel>// CTA — GET IN TOUCH</TechLabel>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                まずはお気軽にご相談ください
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                ご要望・ご予算・スケジュールなど、どんなことでもお問い合わせください。
              </p>
            </div>
            <a
              href="https://forms.gle/xcK8c2gDTfy8u6G77"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-3 border border-foreground/20 px-8 py-4 font-mono text-xs tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/5 uppercase"
            >
              お問い合わせフォームへ
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
