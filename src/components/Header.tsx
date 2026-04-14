"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#business", label: "事業領域" },
  { href: "/#services", label: "サービス" },
  { href: "/log", label: "ログ" },
  { href: "/#about", label: "会社概要" },
];

const CONTACT_URL = "https://forms.gle/xcK8c2gDTfy8u6G77";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMenuOpen(false);
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      document
        .querySelector(href.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "border-b border-border bg-background/90 backdrop-blur-md blueprint-grid"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* ロゴ */}
          <Link
            href="/"
            aria-label="FlagshipWorks トップへ"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/logo.svg"
              alt="FlagshipWorks"
              width={160}
              height={24}
              className="h-6 w-auto brightness-0 invert"
              priority
            />
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden items-center gap-6 md:flex">
            <span className="font-mono text-[9px] tracking-widest text-foreground/20">
              REF: FW-01
            </span>
            <span className="h-3 w-px bg-foreground/10" />
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </Link>
            ))}
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground/20 px-4 py-2 font-mono text-xs tracking-widest text-foreground transition-colors hover:bg-foreground/5"
            >
              お問い合わせ
            </a>
          </nav>

          {/* モバイル右側: お問い合わせ + ハンバーガー */}
          <div className="flex items-center gap-4 md:hidden">
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground/20 px-3 py-1.5 font-mono text-[10px] tracking-widest text-foreground transition-colors hover:bg-foreground/5"
            >
              お問い合わせ
            </a>

            {/* アニメーション付きハンバーガーボタン */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={menuOpen}
              className="relative h-5 w-5 text-foreground/70 transition-colors hover:text-foreground"
            >
              {/* 上の線 */}
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ease-in-out ${
                  menuOpen ? "top-[9px] rotate-45" : "top-[4px]"
                }`}
              />
              {/* 中の線 */}
              <span
                className={`absolute left-0 top-[9px] h-px bg-current transition-all duration-300 ease-in-out ${
                  menuOpen ? "w-0 opacity-0" : "w-full opacity-100"
                }`}
              />
              {/* 下の線 */}
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ease-in-out ${
                  menuOpen ? "top-[9px] -rotate-45" : "top-[14px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* モバイルメニュー（常にDOMに存在、CSSでアニメーション） */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-background pt-16 md:hidden transition-all duration-300 ease-out ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col border-t border-border">
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between border-b border-border/50 px-6 py-5 text-sm tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{
                transitionDelay: menuOpen ? `${i * 60 + 80}ms` : "0ms",
              }}
              onClick={(e) => handleNavClick(e, href)}
            >
              <span>{label}</span>
              <span className="font-mono text-[9px] tracking-widest text-foreground/20">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
        </nav>
        <div
          className={`px-6 pt-6 transition-all duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transitionDelay: menuOpen ? `${navLinks.length * 60 + 80}ms` : "0ms",
          }}
        >
          <p className="font-mono text-[9px] tracking-widest text-foreground/20">
            REF: FW-01 // NAVIGATION
          </p>
        </div>
      </div>
    </>
  );
}
