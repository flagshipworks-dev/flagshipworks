import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { getAllWorks } from "@/lib/content";

export const metadata: Metadata = {
  title: "制作実績",
  description: "FlagshipWorksの制作実績。医療業界向けWebサイト制作を中心に掲載します",
  alternates: {
    canonical: "https://flagshipworks.co.jp/works",
  },
};

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

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <>
      {/* ── ページヘッダー ── */}
      <section className="relative overflow-hidden border-b border-border blueprint-grid px-6 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-foreground/30 transition-colors hover:text-foreground/60"
          >
            <ArrowLeft className="h-3 w-3" />
            TOP
          </Link>
          <FadeIn>
            <TechLabel>// WORKS — PROJECT ARCHIVE</TechLabel>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              制作実績
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              医療業界向けWebサイト制作を中心に、実績を順次公開予定
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── 実績一覧 ── */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          {works.length === 0 ? (
            <FadeIn>
              <div className="relative border border-border/50 p-16 text-center md:p-24">
                {/* コーナーブラケット */}
                <span className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-foreground/35" />
                <span className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-foreground/35" />
                <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-foreground/35" />
                <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-foreground/35" />

                <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-foreground/25">
                  STATUS: LOADING
                </p>
                <p className="text-sm text-muted-foreground">
                  制作実績を順次公開予定
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
              {works.map((work) => (
                <FadeIn key={work.slug} className="h-full">
                  <Link
                    href={`/works/${work.slug}`}
                    className="group relative flex h-full flex-col bg-background blueprint-grid p-8 transition-colors hover:bg-card md:p-10"
                  >
                    {/* コーナーブラケット */}
                    <span className="absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2 border-foreground/35" />
                    <span className="absolute top-0 right-0 h-5 w-5 border-t-2 border-r-2 border-foreground/35" />
                    <span className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-foreground/35" />
                    <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-foreground/35" />

                    <p className="mb-6 font-mono text-[9px] tracking-[0.15em] text-blue-300">
                      {work.category}
                    </p>
                    <h2 className="mb-2 flex-1 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-blue-300">
                      {work.title}
                    </h2>
                    <p className="mb-5 font-mono text-[10px] tracking-widest text-muted-foreground">
                      {work.client}
                    </p>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {work.description}
                    </p>

                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-foreground/40 transition-colors group-hover:text-foreground/60">
                      VIEW <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
