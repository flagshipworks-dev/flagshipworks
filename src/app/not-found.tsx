import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — ページが見つかりません",
};

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

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-border px-6 py-24">
      {/* 上下のラインマーカー */}
      <div className="absolute inset-x-0 top-0 h-px bg-border" />

      {/* 四隅のクロスヘア */}
      <Crosshair className="absolute top-8 left-8 text-foreground/20" />
      <Crosshair className="absolute top-8 right-8 text-foreground/20" />
      <Crosshair className="absolute bottom-8 left-8 text-foreground/20" />
      <Crosshair className="absolute bottom-8 right-8 text-foreground/20" />

      {/* 技術アノテーション */}
      <span className="absolute top-10 left-16 font-mono text-[9px] tracking-widest text-foreground/15 hidden md:block">
        SPEC: FW-CORP-01
      </span>
      <span className="absolute bottom-10 right-16 font-mono text-[9px] tracking-widest text-foreground/15 hidden md:block">
        STATUS: NOT FOUND
      </span>

      {/* ゴーストナンバー */}
      <span className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-mono text-[16rem] font-bold leading-none text-foreground/4 md:text-[22rem]">
        404
      </span>

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-foreground/30">
          <span className="text-blue-300">{"// "}</span>
          ERROR.404 — PAGE NOT FOUND
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          ページが
          <br />
          見つかりません
        </h1>

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base max-w-sm">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>

        {/* スペックライン */}
        <div className="mt-8 flex items-center gap-4">
          <span className="font-mono text-[9px] tracking-widest text-foreground/25">REF.</span>
          <div className="h-px w-12 bg-foreground/15" />
          <span className="font-mono text-[9px] tracking-widest text-foreground/25">HTTP 404</span>
        </div>

        {/* 戻るリンク */}
        <div className="relative mt-12 inline-block">
          <Crosshair className="absolute -top-4 -left-4 text-foreground/15" />
          <Crosshair className="absolute -bottom-4 -right-4 text-foreground/15" />
          <Link
            href="/"
            className="inline-flex items-center gap-3 border border-foreground/20 px-8 py-4 font-mono text-xs tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/5 uppercase"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            トップへ戻る
          </Link>
        </div>
      </div>
    </section>
  );
}
