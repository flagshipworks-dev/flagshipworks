"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#about", label: "会社概要" },
  { href: "/#business", label: "事業内容" },
  { href: "https://forms.gle/xcK8c2gDTfy8u6G77", label: "お問い合わせ", external: true },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* ロゴ */}
          <Link href="/" aria-label="FlagshipWorks トップへ">
            <Image
              src="/logo.svg"
              alt="FlagshipWorks"
              width={140}
              height={20}
              className="h-5 w-auto brightness-0 invert opacity-60"
            />
          </Link>

          {/* リンク */}
          <nav className="flex items-center gap-6">
            {navLinks.map(({ href, label, external }) =>
              external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                  onClick={(e) => {
                    if (pathname === "/") {
                      e.preventDefault();
                      const id = href.replace("/", "");
                      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {label}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* コピーライト + 設計図分類 */}
        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-6">
            <Link
              href="/privacy"
              className="text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              プライバシーポリシー
            </Link>
            <p className="text-xs tracking-widest text-muted-foreground">
              © {new Date().getFullYear()} FlagshipWorks合同会社. All rights reserved.
            </p>
          </div>
          <p className="font-mono text-[9px] tracking-widest text-foreground/15">
            CLASSIFICATION: PUBLIC // DOC-FW-CORP-01 // REV.1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
