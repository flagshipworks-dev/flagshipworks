import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "基本方針",
    content: `FlagshipWorks合同会社（以下「当社」）は、お客様の個人情報の保護を重要な責務と認識し、個人情報の保護に関する法律（個人情報保護法）およびその他関連法令を遵守し、適切に取り扱います。`,
  },
  {
    title: "収集する個人情報の種類",
    content: `当社は、以下の個人情報を収集することがあります。\n\n・お名前\n・メールアドレス\n・お問い合わせ内容\n・その他、お客様が任意でご提供いただいた情報`,
  },
  {
    title: "利用目的",
    content: `収集した個人情報は、以下の目的に限り利用します。\n\n・お問い合わせへの回答および対応\n・サービスの提供および改善\n・事業に関するご案内・情報提供\n・法令上の義務の履行`,
  },
  {
    title: "第三者提供について",
    content: `当社は、以下の場合を除き、お客様の個人情報を第三者に提供しません。\n\n・お客様の同意がある場合\n・法令に基づく場合\n・人の生命・身体・財産の保護のために必要な場合\n\nなお、当社のお問い合わせフォームにはGoogle LLC（Google フォーム）を利用しています。Google の個人情報の取り扱いについては、Google のプライバシーポリシーをご参照ください。`,
  },
  {
    title: "個人情報の管理",
    content: `当社は、収集した個人情報を適切に管理し、不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、必要かつ適切なセキュリティ対策を講じます。`,
  },
  {
    title: "開示・訂正・削除等のご請求",
    content: `お客様は、当社が保有するご自身の個人情報について、開示・訂正・削除・利用停止を請求することができます。ご請求の際は、下記お問い合わせ窓口までご連絡ください。ご本人確認のうえ、合理的な期間内に対応いたします。`,
  },
  {
    title: "Cookieについて",
    content: `当社のウェブサイトでは、サービス向上を目的としてCookieを使用する場合があります。ブラウザの設定によりCookieを無効にすることができますが、一部機能が制限される場合があります。`,
  },
  {
    title: "本ポリシーの変更",
    content: `当社は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のポリシーは、当ウェブサイトに掲載した時点から効力を生じるものとします。`,
  },
  {
    title: "お問い合わせ",
    content: `個人情報の取り扱いに関するお問い合わせは、下記よりご連絡ください。\n\n会社名：FlagshipWorks合同会社\n代表者：金森祥治\n所在地：東京都世田谷区`,
  },
];

export default function PrivacyPage() {
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
          LEGAL — PRIVACY POLICY
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          プライバシーポリシー
        </h1>
        <p className="mt-4 font-mono text-[10px] tracking-widest text-foreground/25">
          最終更新日：2026年4月13日
        </p>
      </div>

      {/* セクション */}
      <div className="space-y-12">
        {sections.map(({ title, content }, i) => (
          <div key={title} className="border-t border-border/40 pt-8">
            <div className="mb-4 flex items-center gap-4">
              <span className="font-mono text-[9px] tracking-widest text-foreground/25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-sm font-semibold tracking-wide text-foreground">
                {title}
              </h2>
            </div>
            <p className="whitespace-pre-line text-sm leading-loose text-muted-foreground">
              {content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
