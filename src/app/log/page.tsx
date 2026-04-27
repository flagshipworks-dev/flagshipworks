import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { getAllLogs } from "@/lib/content";

export const metadata: Metadata = {
  title: "ログ",
  description: "医療業界向けWeb制作に関する情報を発信します",
  alternates: {
    canonical: "https://flagshipworks.co.jp/log",
  },
};

const PER_PAGE = 12;

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

export default async function LogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const allLogs = getAllLogs();
  const totalPages = Math.max(1, Math.ceil(allLogs.length / PER_PAGE));
  const currentPage = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const logs = allLogs.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

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
            <TechLabel>// LOG — FIELD NOTES</TechLabel>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              ログ
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              医療業界向けWeb制作に関する情報を発信
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── 記事一覧 ── */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          {logs.length === 0 ? (
            <p className="font-mono text-[10px] tracking-widest text-foreground/30">
              — NO ENTRIES —
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
                {logs.map((log) => (
                  <FadeIn key={log.slug} className="h-full">
                    <Link
                      href={`/log/${log.slug}`}
                      className="group relative flex h-full flex-col bg-background blueprint-grid p-8 transition-colors hover:bg-card"
                    >
                      {/* コーナーブラケット */}
                      <span className="absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2 border-foreground/35" />
                      <span className="absolute top-0 right-0 h-5 w-5 border-t-2 border-r-2 border-foreground/35" />
                      <span className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-foreground/35" />
                      <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-foreground/35" />

                      <p className="mb-4 font-mono text-[9px] tracking-widest text-foreground/30">
                        {log.date}
                      </p>
                      <h2 className="mb-3 flex-1 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-blue-300">
                        {log.title}
                      </h2>
                      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                        {log.description}
                      </p>

                      {log.tags.length > 0 && (
                        <div className="mb-6 flex flex-wrap gap-2">
                          {log.tags.map((tag) => (
                            <span
                              key={tag}
                              className="border border-foreground/15 px-2 py-1 font-mono text-[9px] tracking-widest text-foreground/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-foreground/40 transition-colors group-hover:text-foreground/60">
                        READ <ArrowRight className="h-3 w-3" />
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>

              {/* ── ページネーション ── */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-1">
                  <Link
                    href={currentPage > 1 ? `/log?page=${currentPage - 1}` : "#"}
                    aria-disabled={currentPage <= 1}
                    className={`flex h-8 w-8 items-center justify-center border border-border font-mono text-[10px] tracking-widest transition-colors ${
                      currentPage <= 1
                        ? "pointer-events-none text-foreground/20"
                        : "text-foreground/40 hover:border-foreground/40 hover:text-foreground/60"
                    }`}
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </Link>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/log?page=${p}`}
                      className={`flex h-8 w-8 items-center justify-center border font-mono text-[10px] tracking-widest transition-colors ${
                        p === currentPage
                          ? "border-foreground/40 text-foreground"
                          : "border-border text-foreground/40 hover:border-foreground/40 hover:text-foreground/60"
                      }`}
                    >
                      {p}
                    </Link>
                  ))}

                  <Link
                    href={currentPage < totalPages ? `/log?page=${currentPage + 1}` : "#"}
                    aria-disabled={currentPage >= totalPages}
                    className={`flex h-8 w-8 items-center justify-center border border-border font-mono text-[10px] tracking-widest transition-colors ${
                      currentPage >= totalPages
                        ? "pointer-events-none text-foreground/20"
                        : "text-foreground/40 hover:border-foreground/40 hover:text-foreground/60"
                    }`}
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
