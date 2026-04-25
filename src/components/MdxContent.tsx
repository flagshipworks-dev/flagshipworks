import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";
import remarkGfm from "remark-gfm";

const components: MDXComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="mb-6 mt-10 text-2xl font-bold tracking-tight text-foreground first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="mb-4 mt-10 border-b border-border/50 pb-3 text-xl font-bold tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="mb-3 mt-8 text-base font-semibold text-foreground">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-5 text-sm leading-[1.9] text-muted-foreground">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-5 list-disc space-y-1 pl-5 text-sm leading-[1.9] text-muted-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-5 list-decimal space-y-1 pl-5 text-sm leading-[1.9] text-muted-foreground">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li>{children}</li>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} className="text-blue-300 underline-offset-2 hover:underline">
      {children}
    </a>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[0.8em] text-blue-300">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="mb-5 overflow-x-auto border border-border bg-card p-5 font-mono text-sm text-foreground [&_code]:border-none [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-foreground">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="mb-5 border-l-2 border-blue-300/50 pl-4 text-sm text-muted-foreground">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-border" />,
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="relative mb-8 overflow-x-auto border border-border">
      <span className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-foreground/35" />
      <span className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-foreground/35" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-foreground/35" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-foreground/35" />
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="border-b border-border bg-card">{children}</thead>
  ),
  tbody: ({ children }: { children?: React.ReactNode }) => (
    <tbody>{children}</tbody>
  ),
  tr: ({ children }: { children?: React.ReactNode }) => (
    <tr className="border-b border-border/50 last:border-0">{children}</tr>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="border-r border-border/50 px-5 py-3 text-left font-mono text-[10px] tracking-widest text-foreground/40 last:border-r-0">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="border-r border-border/30 px-5 py-3.5 text-sm leading-relaxed text-muted-foreground last:border-r-0">
      {children}
    </td>
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
