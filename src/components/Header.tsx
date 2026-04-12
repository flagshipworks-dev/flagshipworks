"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#business", label: "事業領域" },
  { href: "/#about", label: "会社概要" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md blueprint-grid"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* ロゴ */}
        <Link href="/" aria-label="FlagshipWorks トップへ">
          <Image
            src="/logo.svg"
            alt="FlagshipWorks"
            width={160}
            height={24}
            className="h-6 w-auto brightness-0 invert"
            priority
          />
        </Link>

        {/* ナビゲーション */}
        <nav className="flex items-center gap-6">
          {/* 設計図リファレンス番号 */}
          <span className="hidden font-mono text-[9px] tracking-widest text-foreground/20 md:block">
            REF: FW-01
          </span>
          <span className="hidden h-3 w-px bg-foreground/10 md:block" />

          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hidden text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground md:block"
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
          ))}
          <a
            href="https://forms.gle/xcK8c2gDTfy8u6G77"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-foreground/20 px-4 py-2 font-mono text-xs tracking-widest text-foreground transition-colors hover:bg-foreground/5"
          >
            お問い合わせ
          </a>
        </nav>
      </div>
    </header>
  );
}
