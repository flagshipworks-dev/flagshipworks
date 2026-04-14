"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#business", label: "事業内容" },
  { href: "/#services", label: "サービス" },
  { href: "/log", label: "ログ" },
  { href: "/#about", label: "会社概要" },
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
          <nav className="flex flex-wrap gap-x-6 gap-y-3">
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
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href="/privacy"
                className="text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/legal"
                className="text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                特定商取引法に基づく表記
              </Link>
            </div>
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
