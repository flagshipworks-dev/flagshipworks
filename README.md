# FlagshipWorks コーポレートサイト

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

## コンテンツの追加

ログ記事・制作実績はMDXファイルで管理しています。

**ログ記事を追加する場合：**
`src/content/log/` にMDXファイルを作成してください。

```md
---
title: "記事タイトル"
date: "2026-04-01"
description: "記事の概要"
tags: ["タグ1", "タグ2"]
---

本文...
```

**制作実績を追加する場合：**
`src/content/works/` に同様の形式でMDXファイルを作成してください。

## 環境

本番環境は Vercel にデプロイされています。`main` ブランチへのpushで自動デプロイされます。
