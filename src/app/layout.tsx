import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
    "ひとつの母艦から、それぞれの旗艦へ。現役デザイナーと現役眼科医が手がける、ホールディングス型スタートアップ。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://flagshipworks.co.jp",
    siteName: "FlagshipWorks合同会社",
    title: "FlagshipWorks合同会社",
    description:
      "ひとつの母艦から、それぞれの旗艦へ。現役デザイナーと現役眼科医が手がける、ホールディングス型スタートアップ。",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlagshipWorks合同会社",
    description: "ひとつの母艦から、それぞれの旗艦へ。",
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
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
