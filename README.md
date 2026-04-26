# FlagshipWorks コーポレートサイト

> **このファイルについて**: 開発者向けのセットアップ・実装規約ドキュメントです。技術スタック・コマンド・URL設計・SEO/OGP規約・コンテンツ管理ルールを記載します。ビジュアル・デザインルールは `DESIGN.md` を参照してください。

FlagshipWorks合同会社のコーポレートサイトです。

## 技術スタック

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**

## コマンド

```bash
npm run dev      # 開発サーバー起動（http://localhost:3000）
npm run build    # 本番ビルド
npm run start    # 本番サーバー起動
npm run lint     # ESLint 実行
```

## ディレクトリ構成

```
src/
├── app/                  # ページ（App Router）
│   ├── layout.tsx        # ルートレイアウト
│   ├── page.tsx          # トップページ
│   ├── log/              # ログ一覧・詳細
│   ├── works/            # 制作実績一覧・詳細
│   ├── service/
│   │   └── medical-web/  # 医療業界向けサイト制作サービスページ
│   ├── legal/            # 特定商取引法に基づく表記
│   └── privacy/          # プライバシーポリシー
├── components/           # 共通コンポーネント
├── content/
│   ├── log/              # ログ記事（MDX）
│   └── works/            # 制作実績（MDX）
└── lib/                  # ユーティリティ
```

## ページ構成・URL設計

| URL | 内容 |
|-----|------|
| `/` | トップページ（Hero / Business / Services / Works / About / Members / Log / Contact） |
| `/service/medical-web` | 医療業界向けサイト制作 詳細ページ |
| `/works` | 制作実績一覧 |
| `/works/[slug]` | 制作実績詳細 |
| `/log` | ログ一覧 |
| `/log/[slug]` | ログ詳細（MDXレンダリング・末尾CTA付き） |
| `/privacy` | プライバシーポリシー |
| `/legal` | 特定商取引法に基づく表記 |

### サービスページのURL規則
個別サービスページは `/service/{slug}` に配置する。

| スラッグ | サービス名 |
|---------|----------|
| `medical-web` | 医療業界向けサイト制作 |

### ナビゲーション
- ヘッダー（デスクトップ）: 事業領域 / サービス / ログ / 会社概要 / [お問い合わせ]
- ヘッダー（モバイル）: ハンバーガーメニュー + [お問い合わせ]
- フッター: 事業内容 / サービス / ログ / 会社概要 / お問い合わせ / プライバシーポリシー / 特定商取引法に基づく表記

## コンテンツの追加

ログ記事・制作実績は MDX ファイルで管理しています。

### ログ記事（`src/content/log/`）

```yaml
---
title: "記事タイトル"
date: "YYYY-MM-DD"
description: "記事の説明（一覧・OGPに使用）"
tags: ["医療", "Webデザイン", "UX"]
---
```

### 制作実績（`src/content/works/`）

```yaml
---
title: "プロジェクト名"
date: "YYYY-MM-DD"
client: "クライアント名"
category: "医療業界向けサイト制作"
description: "プロジェクトの説明"
---
```

### ユーティリティ関数（`src/lib/content.ts`）
- `getAllLogs()` — ログ記事を日付降順で取得（contentフィールドなし）
- `getLog(slug)` — スラッグでログ記事を1件取得（contentフィールドあり）
- `getAllWorks()` — 制作実績を日付降順で取得
- `getWork(slug)` — スラッグで制作実績を1件取得

### LogCta のタグ判定ルール（`src/components/LogCta.tsx`）
| タグ | 表示されるCTA |
|------|-------------|
| `医療` `医院` `クリニック` `病院` `眼科` | 医療機関向けWeb制作CTA |
| `民泊` `旅館` `宿泊` `ホスピタリティ` | 民泊・旅館業CTA |
| 上記以外 | 汎用CTA |

## 実装規約

### SEO・メタデータ

**タイトル命名規則**
- トップページ: `FlagshipWorks`（`title.default`）
- その他のページ: `ページ名 | FlagshipWorks`（`title.template` で自動付与）
- `FlagshipWorks合同会社`（正式名称）はタイトルには使用しない

**表記の使い分け**
| 用途 | 表記 |
|------|------|
| タイトルタグ・OGP title・Twitter title | `FlagshipWorks` |
| OGP siteName | `FlagshipWorks` |
| 説明文・JSON-LD・法的ページ | `FlagshipWorks合同会社` |

**構造化データ（JSON-LD）**
- トップページ: `Organization` + `WebSite`
- `/service/medical-web`: `Service` + `BreadcrumbList`
- `/log/[slug]`: `BlogPosting` + `BreadcrumbList`

### 動的OGPイメージ

各ルートに `opengraph-image.tsx` を配置することで、ページごとの OGP 画像を自動生成する（Next.js App Router の規約）。

**実装済みページ**
| ルート | ファイル | 画像内容 |
|--------|----------|----------|
| `/` | `src/app/opengraph-image.tsx` | サイト共通（静的） |
| `/log/[slug]` | `src/app/log/[slug]/opengraph-image.tsx` | 記事タイトル＋タグ（動的） |
| `/service/medical-web` | `src/app/service/medical-web/opengraph-image.tsx` | サービス名＋サブタイトル＋タグ（静的） |

**新しいページに追加する際のルール**
1. ルートディレクトリに `opengraph-image.tsx` を作成
2. `export const size = { width: 1200, height: 630 }` と `export const contentType = "image/png"` を必ず定義
3. ページの `metadata` に `openGraph.images` や `twitter.images` を**書かない**（`opengraph-image.tsx` が自動で使われる）
4. デザインは既存ファイルに合わせる（背景 `#191e28`、blueprint グリッド、左下ロゴ、右下 `REF: FW-***`）
5. ロゴは `src/lib/ogLogo.tsx` の `<LogoOg opacity={0.5} />` を使用
6. フォントは Google Fonts API から TTF を取得（Satori は woff2 非対応のため TTF を使用すること）

## 環境

本番環境は Vercel にデプロイされています。`main` ブランチへの push で自動デプロイされます。
