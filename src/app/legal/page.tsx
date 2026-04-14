import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description: "FlagshipWorks合同会社の特定商取引法に基づく表記です。",
  alternates: {
    canonical: "https://flagshipworks.co.jp/legal",
  },
  robots: {
    index: true,
    follow: false,
  },
};

const items = [
  {
    label: "販売事業者",
    value: "FlagshipWorks合同会社",
  },
  {
    label: "代表者",
    value: "金森祥治",
  },
  {
    label: "所在地",
    value: "東京都世田谷区中町５丁目１４－８",
  },
  {
    label: "電話番号",
    value: "080-2012-8646",
    note: "お電話でのお問い合わせは受け付けておりません。メールまたはお問い合わせフォームをご利用ください。",
  },
  {
    label: "メールアドレス",
    value: "info@flagshipworks.co.jp",
  },
  {
    label: "販売価格",
    value: "各サービスページに記載の金額（税別）。詳細はお見積りにより別途ご提示します。",
  },
  {
    label: "支払い方法",
    value: "銀行振込",
  },
  {
    label: "支払い時期",
    value:
      "初期制作費：契約時に50%（着手金）、納品・検収完了後に残50%をお支払いください。\n月額保守費：毎月末日に翌月分をご請求します。",
  },
  {
    label: "サービス提供時期",
    value:
      "Webサイト制作：ご契約後、通常3ヶ月程度での納品を目安としています（規模・内容により変動）。\n月額保守サービス：公開翌月1日より提供開始します。",
  },
  {
    label: "キャンセル・返金について",
    value:
      "制作着手後にお客様都合によりキャンセルされた場合、着手済み工程に応じたキャンセル料が発生します。\n納品・検収完了後の返金はお受けできません。\n月額保守費については、お支払い済み分の返金はいたしかねます。",
  },
  {
    label: "動作環境",
    value:
      "納品するWebサイトの推奨ブラウザはGoogle Chrome・Safari・Firefox・Edgeの各最新版です。",
  },
];

export default function TokushoPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32">
      {/* 戻るリンク */}
      <Link
        href="/"
        className="mb-12 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground uppercase"
      >
        <ArrowLeft className="h-3 w-3" />
        トップへ戻る
      </Link>

      {/* ヘッダー */}
      <div className="mb-16">
        <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-foreground/30">
          <span className="text-blue-300">{"// "}</span>
          LEGAL — SPECIFIED COMMERCIAL TRANSACTIONS
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          特定商取引法に基づく表記
        </h1>
        <p className="mt-4 font-mono text-[10px] tracking-widest text-foreground/25">
          最終更新日：2026年4月15日
        </p>
      </div>

      {/* テーブル */}
      <div className="space-y-0">
        {items.map(({ label, value, note }, i) => (
          <div
            key={label}
            className={`grid grid-cols-1 gap-2 border-t border-border/40 py-6 md:grid-cols-[200px_1fr] md:gap-8 ${
              i === items.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 font-mono text-[9px] tracking-widest text-foreground/25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="text-xs font-semibold tracking-wide text-foreground">
                {label}
              </dt>
            </div>
            <div>
              <dd className="whitespace-pre-line text-sm leading-loose text-muted-foreground">
                {value}
              </dd>
              {note && (
                <p className="mt-2 text-xs leading-relaxed text-foreground/40">
                  ※ {note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
