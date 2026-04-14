import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Monitor, CheckCircle2 } from "lucide-react";
import { getAllLogs, getAllWorks } from "@/lib/content";

export const metadata: Metadata = {
  title: "医療業界向けサイト制作 | FlagshipWorks",
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
    siteName: "FlagshipWorks",
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
  const medicalLogs = getAllLogs()
    .filter((log) => log.tags.includes("医療"))
    .slice(0, 3);
  const medicalWorks = getAllWorks()
    .filter((work) => work.category.includes("医療"))
    .slice(0, 3);

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

      {/* ── 料金プラン ── */}
      <section className="border-b border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <TechLabel>// PRICING — PLANS</TechLabel>
          <h2 className="mb-12 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            料金プラン
          </h2>

          <div className="relative border border-border blueprint-grid">
            <span className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-foreground/35" />
            <span className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-foreground/35" />
            <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-foreground/35" />
            <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-foreground/35" />

          <div className="grid grid-cols-1 gap-px bg-foreground/20 md:grid-cols-2">
            {/* Standard Plan */}
            <div className="bg-background/60 p-8 md:p-10">
              <p className="mb-4 font-mono text-[9px] tracking-[0.15em] text-blue-300">STANDARD PLAN</p>
              <p className="mb-6 text-4xl font-bold tracking-tight text-foreground">
                ¥600,000
                <span className="ml-2 text-sm font-normal text-muted-foreground">〜（税別）</span>
              </p>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                院の顔としての信頼性と、ガイドライン遵守を両立させた基本プランです
              </p>
              <div className="mb-3 border border-blue-300/20 bg-blue-300/5 p-4">
                <p className="mb-1.5 font-mono text-[9px] tracking-widest text-blue-300">MEDICAL CHECK</p>
                <p className="text-sm text-foreground/80">現役医師による医療広告ガイドライン適合チェック</p>
              </div>
              <div className="mb-8 p-4 hidden md:invisible md:block">
                <p className="mb-1.5 font-mono text-[9px] tracking-widest">STRATEGY</p>
                <p className="text-sm">新規事業開発プロフェッショナルによる集患導線・競合分析レポート</p>
              </div>
              <p className="mb-3 font-mono text-[9px] tracking-widest text-foreground/30">INCLUDES</p>
              <div className="space-y-0">
                {[
                  "ページ制作（5〜8枚）",
                  "スマートフォン最適化",
                  "お問い合わせフォーム",
                  "内部SEO対策",
                  "Googleアナリティクス設置",
                ].map((item, i, arr) => (
                  <div
                    key={item}
                    className={`flex items-center gap-3 p-3 ${i !== arr.length - 1 ? "border-b border-dashed border-border/40" : ""}`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-300/70" strokeWidth={1.5} />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Plan */}
            <div className="bg-background/60 p-8 md:p-10">
              <p className="mb-4 font-mono text-[9px] tracking-[0.15em] text-blue-300">PROFESSIONAL PLAN</p>
              <p className="mb-6 text-4xl font-bold tracking-tight text-foreground">
                ¥1,200,000
                <span className="ml-2 text-sm font-normal text-muted-foreground">〜（税別）</span>
              </p>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                ブランディングまで含めた、より本格的な集患・信頼構築を目指すプランです
              </p>
              <div className="mb-3 border border-blue-300/20 bg-blue-300/5 p-4">
                <p className="mb-1.5 font-mono text-[9px] tracking-widest text-blue-300">MEDICAL CHECK</p>
                <p className="text-sm text-foreground/80">現役医師による医療広告ガイドライン適合チェック</p>
              </div>
              <div className="mb-8 border border-blue-300/20 bg-blue-300/5 p-4">
                <p className="mb-1.5 font-mono text-[9px] tracking-widest text-blue-300">STRATEGY</p>
                <p className="text-sm text-foreground/80">新規事業開発プロフェッショナルによる集患導線・競合分析レポート</p>
              </div>
              <p className="mb-3 font-mono text-[9px] tracking-widest text-foreground/30">INCLUDES</p>
              <div className="space-y-0">
                {[
                  "ページ制作（10〜15枚）",
                  "スマートフォン最適化",
                  "お問い合わせフォーム",
                  "内部SEO対策",
                  "Googleアナリティクス設置",
                  "写真撮影ディレクション",
                  "ロゴデザイン",
                ].map((item, i, arr) => (
                  <div
                    key={item}
                    className={`flex items-center gap-3 p-3 ${i !== arr.length - 1 ? "border-b border-dashed border-border/40" : ""}`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-300/70" strokeWidth={1.5} />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>{/* /blueprint-grid wrapper */}

          <div className="mt-6 space-y-2">
            <p className="text-xs leading-relaxed text-muted-foreground">
              ※ 掲載価格はあくまでも参考目安です。ページ数・機能要件・デザインの複雑さによって変動するため、実際のお見積りはヒアリング後にご提示します。
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              ※ 表示価格はすべて税別です。月額保守費は別途お見積りとなります。
              お支払い方法・キャンセルポリシー等の詳細は
              <Link
                href="/legal"
                className="underline underline-offset-2 transition-colors hover:text-foreground"
              >
                特定商取引法に基づく表記
              </Link>
              をご確認ください。
            </p>
          </div>
        </div>
      </section>

      {/* ── モニター募集 ── */}
      <section className="border-b border-border bg-card blueprint-grid px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <TechLabel>// CAMPAIGN — 2026 LAUNCH PARTNER PROGRAM</TechLabel>

          <div className="relative border border-blue-300/30 bg-blue-300/5 p-8 md:p-12">
            <span className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-blue-300/50" />
            <span className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-blue-300/50" />
            <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-blue-300/50" />
            <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-blue-300/50" />

            {/* VACANCYバナー */}
            <div className="mb-10 flex items-center justify-between border-b border-blue-300/20 pb-8">
              <div className="flex items-baseline gap-3">
                <p className="font-mono text-5xl font-bold leading-none text-blue-300">3</p>
                <p className="font-mono text-xs tracking-widest text-blue-300/70">枠 残っています</p>
              </div>
              <p className="font-mono text-[9px] tracking-widest text-foreground/30">2026 LAUNCH PARTNER</p>
            </div>

            {/* ヘッダー */}
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                2026年度 ローンチパートナー募集
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                FlagshipWorksは、現役医師と事業開発プロが立ち上げた新しいチームです。今年度は「実績の質」を最優先するため、私たちのメソッドを共に形にしてくださるローンチパートナーを募集いたします。
              </p>
            </div>

            <div className="flex flex-col gap-10">
              {/* 左: 特典 */}
              <div>
                <p className="mb-4 font-mono text-[9px] tracking-widest text-foreground/30">BENEFITS</p>
                <div className="grid grid-cols-1 gap-px bg-blue-300/10 md:grid-cols-3">
                  {[
                    {
                      label: "制作費特別割引",
                      value: "通常価格より 40% OFF",
                    },
                    {
                      label: "戦略コンサル無償提供",
                      value: "新規事業開発の知見を活かした集患・ブランディング戦略を無償で立案",
                    },
                    {
                      label: "医師によるフル監修",
                      value: "サイト全編にわたり、現役医師が薬機法・広告ガイドラインを徹底診断",
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="border border-blue-300/20 bg-blue-300/5 p-4">
                      <CheckCircle2 className="mb-3 h-4 w-4 text-blue-300/70" strokeWidth={1.5} />
                      <p className="mb-2 text-sm font-semibold tracking-tight text-foreground">{label}</p>
                      <p className="text-sm leading-relaxed text-foreground/60">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右: 応募条件 + CTA */}
              <div>
                <p className="mb-3 font-mono text-[9px] tracking-widest text-foreground/20">REQUIREMENTS</p>
                <div className="mb-8 space-y-2">
                  {[
                    "制作事例として当サイトへ貴院名・URLを掲載可能なこと",
                    "導入後の効果（予約数等）の共有、およびインタビューにご協力いただけること",
                    "誠実な医療提供を通じて、共に地域医療を支える志をお持ちであること",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 font-mono text-[9px] tracking-widest text-foreground/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-xs leading-relaxed text-foreground/40">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <a
                    href="https://forms.gle/xcK8c2gDTfy8u6G77"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 border border-blue-300/40 bg-blue-300/10 px-6 py-3 font-mono text-xs tracking-[0.2em] text-blue-300 transition-colors hover:bg-blue-300/20"
                  >
                    無料相談・ローンチパートナー応募はこちら
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 制作実績 ── */}
      <section className="border-b border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-8">
            <div>
              <TechLabel>// WORKS — PROJECT ARCHIVE</TechLabel>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                制作実績
              </h2>
            </div>
            {medicalWorks.length > 0 && (
              <Link
                href="/works"
                className="hidden shrink-0 items-center gap-3 border border-foreground/20 px-5 py-2.5 font-mono text-xs tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/5 md:inline-flex"
              >
                すべての実績
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          {medicalWorks.length === 0 ? (
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
          ) : (
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
              {medicalWorks.map(({ slug, title, category, description }) => (
                <Link
                  key={slug}
                  href={`/works/${slug}`}
                  className="group relative flex flex-col bg-background blueprint-grid p-8 transition-colors hover:bg-card"
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
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 関連ログ ── */}
      <section className="border-b border-border bg-card blueprint-grid px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-8">
            <div>
              <TechLabel>// LOG — RELATED ARTICLES</TechLabel>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                関連ログ
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

          {medicalLogs.length > 0 && (
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
              {medicalLogs.map(({ slug, title, date, description, tags }) => (
                <Link
                  key={slug}
                  href={`/log/${slug}`}
                  className="group relative flex flex-col bg-background blueprint-grid p-8 transition-colors hover:bg-card"
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
              ))}
            </div>
          )}
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
              無料相談はこちら
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
