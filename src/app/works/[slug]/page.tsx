import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getAllWorks, getWork } from "@/lib/content";
import { MdxContent } from "@/components/MdxContent";

export async function generateStaticParams() {
  const works = getAllWorks();
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const work = getWork(slug);
    return {
      title: work.title,
      description: work.description,
      alternates: {
        canonical: `https://flagshipworks.co.jp/works/${slug}`,
      },
      openGraph: {
        title: `${work.title} | FlagshipWorks`,
        description: work.description,
      },
    };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let work;
  try {
    work = getWork(slug);
  } catch {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 pt-32 pb-24 md:pt-40">
      {/* 戻るリンク */}
      <Link
        href="/works"
        className="mb-12 inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-foreground/30 transition-colors hover:text-foreground/60"
      >
        <ArrowLeft className="h-3 w-3" />
        WORKS
      </Link>

      {/* カテゴリ */}
      <p className="mb-4 font-mono text-[9px] tracking-[0.15em] text-blue-300">
        {work.category}
      </p>

      {/* タイトル */}
      <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
        {work.title}
      </h1>

      {/* クライアント・日付 */}
      <div className="mb-12 flex flex-wrap gap-6">
        <div>
          <p className="mb-1 font-mono text-[9px] tracking-widest text-foreground/30">
            CLIENT
          </p>
          <p className="text-sm text-foreground/80">{work.client}</p>
        </div>
        <div>
          <p className="mb-1 font-mono text-[9px] tracking-widest text-foreground/30">
            DATE
          </p>
          <p className="text-sm text-foreground/80">{work.date}</p>
        </div>
      </div>

      {/* 区切り線 */}
      <div className="mb-12 h-px bg-border" />

      {/* 本文 */}
      <MdxContent source={work.content} />

      {/* フッターリンク */}
      <div className="mt-16 border-t border-border pt-10">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-foreground/30 transition-colors hover:text-foreground/60"
        >
          <ArrowLeft className="h-3 w-3" />
          制作実績に戻る
        </Link>
      </div>
    </article>
  );
}
