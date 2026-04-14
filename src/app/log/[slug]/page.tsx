import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getAllLogs, getLog } from "@/lib/content";
import { MdxContent } from "@/components/MdxContent";
import { LogCta } from "@/components/LogCta";

export async function generateStaticParams() {
  const logs = getAllLogs();
  return logs.map((log) => ({ slug: log.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const log = getLog(slug);
    return {
      title: log.title,
      description: log.description,
      alternates: {
        canonical: `https://flagshipworks.co.jp/log/${slug}`,
      },
      openGraph: {
        title: `${log.title} | FlagshipWorks`,
        description: log.description,
      },
    };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function LogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let log;
  try {
    log = getLog(slug);
  } catch {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 pt-32 pb-24 md:pt-40">
      {/* 戻るリンク */}
      <Link
        href="/log"
        className="mb-12 inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-foreground/30 transition-colors hover:text-foreground/60"
      >
        <ArrowLeft className="h-3 w-3" />
        LOG
      </Link>

      {/* メタ情報 */}
      <p className="mb-4 font-mono text-[10px] tracking-widest text-foreground/30">
        {log.date}
      </p>

      {/* タグ */}
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

      {/* タイトル */}
      <h1 className="mb-12 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
        {log.title}
      </h1>

      {/* 区切り線 */}
      <div className="mb-12 h-px bg-border" />

      {/* 本文 */}
      <MdxContent source={log.content} />

      {/* CTA */}
      <LogCta tags={log.tags} />

      {/* フッターリンク */}
      <div className="mt-16 border-t border-border pt-10">
        <Link
          href="/log"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-foreground/30 transition-colors hover:text-foreground/60"
        >
          <ArrowLeft className="h-3 w-3" />
          Logに戻る
        </Link>
      </div>
    </article>
  );
}
