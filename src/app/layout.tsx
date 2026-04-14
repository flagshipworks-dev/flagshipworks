import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const GTM_ID = "GTM-TG2LQLP9";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flagshipworks.co.jp"),
  title: {
    default: "FlagshipWorks合同会社",
    template: "%s | FlagshipWorks",
  },
  description:
    "ひとつの母艦から、それぞれの旗艦へ。現役デザイナーと現役眼科医が手がける、複合事業型スタートアップ。Web・IT / 民泊・旅館業 / 医療の3領域で事業を展開。東京都世田谷区。",
  keywords: [
    "FlagshipWorks",
    "FlagshipWorks合同会社",
    "医療業界 サイト制作",
    "医療 ホームページ制作",
    "Webデザイン",
    "東京",
    "世田谷",
    "複合事業",
    "スタートアップ",
  ],
  authors: [{ name: "FlagshipWorks合同会社", url: "https://flagshipworks.co.jp" }],
  creator: "FlagshipWorks合同会社",
  publisher: "FlagshipWorks合同会社",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://flagshipworks.co.jp",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://flagshipworks.co.jp",
    siteName: "FlagshipWorks合同会社",
    title: "FlagshipWorks合同会社",
    description:
      "ひとつの母艦から、それぞれの旗艦へ。現役デザイナーと現役眼科医が手がける、複合事業型スタートアップ。",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FlagshipWorks合同会社",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlagshipWorks合同会社",
    description: "ひとつの母艦から、それぞれの旗艦へ。",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} dark h-full antialiased`}
    >
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "FlagshipWorks合同会社",
                url: "https://flagshipworks.co.jp",
                logo: "https://flagshipworks.co.jp/logo.svg",
                description:
                  "ひとつの母艦から、それぞれの旗艦へ。現役デザイナーと現役眼科医が手がける、複合事業型スタートアップ。",
                foundingDate: "2026-01-29",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "世田谷区",
                  addressRegion: "東京都",
                  addressCountry: "JP",
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  url: "https://forms.gle/xcK8c2gDTfy8u6G77",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "FlagshipWorks合同会社",
                url: "https://flagshipworks.co.jp",
              },
            ]),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
