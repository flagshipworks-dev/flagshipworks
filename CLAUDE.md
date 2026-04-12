# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **注意**: このプロジェクトは Next.js 16 (App Router) + React 19 を使用しています。トレーニングデータと異なるAPIや仕様がある可能性があるため、`node_modules/next/dist/docs/` のガイドを参照してください。

---

## コマンド

```bash
npm run dev      # 開発サーバー起動（http://localhost:3000）
npm run build    # 本番ビルド
npm run start    # 本番サーバー起動（build後に実行）
npm run lint     # ESLint 実行
```

---

## アーキテクチャ

### 技術スタック

- **Next.js 16** — App Router を使用。`src/app/` 配下がルーティングの起点
- **React 19** — Server Components がデフォルト。クライアント操作が必要な場合のみ `"use client"` を付与
- **TypeScript** — 全ファイルに適用
- **Tailwind CSS v4** — ユーティリティクラスでスタイリング。設定は `src/app/globals.css`
- **shadcn/ui** — `src/components/ui/` にコンポーネントを追加。スタイルは `base-nova`、カラーは `neutral`

### ディレクトリ構成

```
src/
├── app/              # ページ（App Router）
│   ├── layout.tsx    # ルートレイアウト（共通HTML構造）
│   ├── page.tsx      # トップページ
│   └── globals.css   # グローバルスタイル（Tailwind + CSS変数）
├── components/
│   └── ui/           # shadcn/ui コンポーネント（自動生成・編集可）
└── lib/
    └── utils.ts      # cn()などのユーティリティ関数
```

### shadcn/ui コンポーネントの追加

```bash
npx shadcn@latest add button     # ボタン
npx shadcn@latest add card       # カード
npx shadcn@latest add navigation-menu  # ナビゲーション
```

追加したコンポーネントは `src/components/ui/` に生成される。

### スタイリング

Tailwind CSS v4 を使用。CSS変数によるテーマカラーは `globals.css` で定義されており、`bg-background`・`text-foreground` 等のクラスで参照できる。
