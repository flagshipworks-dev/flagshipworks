# FlagshipWorks — Design Document

## ブランドコンセプト

**"The Platform for Flagships."**

FlagshipWorks合同会社は、複数の独立した事業（旗艦）を展開する複合事業型スタートアップ。
各事業が「母艦から出港する旗艦」として機能するイメージをビジュアルに落とし込む。

- **母艦** = FlagshipWorks本体
- **旗艦** = 各事業（Web・IT / 民泊・旅館業 / 医療 ほか）
- 事業領域を限定しない拡張性を持たせる

---

## カラーパレット

| 役割 | 値 | 備考 |
|------|----|------|
| Background | `oklch(0.145 0.015 254)` ≈ `#191e28` | 深宇宙紺。ブランドカラー |
| Foreground | `oklch(0.96 0 0)` | ほぼホワイト |
| Card | `oklch(0.185 0.014 254)` | Backgroundより少し明るい紺 |
| Muted Foreground | `oklch(0.58 0.01 254)` | サブテキスト |
| Border | `oklch(1 0 0 / 8%)` | 白8%透過 |
| Accent（セカンダリ） | `blue-300` = `#93c5fd` | StarFieldの宇宙船と同系統の青。アクティブ要素・アクセントに使用 |

### アクセントカラーの使用箇所
- TechLabelの `//` プレフィックス
- 事業カード・サービスカードの参照ラベル（`// UNIT.XX —`、`// SERVICE.XX —`）
- BlueprintReticleのレーダーライン・センタードット・ユニットマーカー
- サービス詳細ページのステップ番号・特徴番号
- MdxContentの見出し区切り線・インラインコード・リンク
- LogCtaのラベル

---

## タイポグラフィ

| 用途 | フォント | クラス例 |
|------|---------|---------|
| 本文・見出し | Geist Sans + Noto Sans JP | `font-sans` |
| 技術ラベル・アノテーション | Geist Mono | `font-mono` |

### タイポグラフィのルール
- 技術アノテーション（TechLabel）: `text-[10px] tracking-[0.2em]`
- ゴーストナンバー: `text-[11rem] md:text-[16rem] font-bold text-foreground/4`
- モノスペースラベル全般: `tracking-widest` または `tracking-[0.2em]`
- H1（ヒーロー）: `text-5xl md:text-6xl lg:text-[4.5rem]`
- H1（サービス詳細）: `text-4xl md:text-5xl lg:text-6xl`
- セクション見出し: `text-3xl md:text-4xl`
- UIテキスト（ナビ・ラベル等）では句読点（、。）は使用しない（設計図的なミニマル表現）
- ログ記事本文は通常の日本語句読点を使用してよい

---

## デザインモチーフ

### 設計図（ブループリント）
サイト全体に宇宙船の設計図をモチーフにした要素を使用。

- **グリッドライン**: 主線 120px・補助線 30px のタイルグリッド（`linear-gradient` + `background-size`）
- **クロスヘア（Crosshair）**: 14×14px の SVG。四隅や重要な要素の周囲に配置
- **コーナーブラケット**: カードの四隅に `border-t-2 border-l-2` 等で表現（サイズ: h-6 w-6 または h-5 w-5）
- **寸法線**: Business セクション下部の SVG 寸法線
- **TechLabel**: `// SECTION.XX — NAME` 形式のモノスペースラベル
- **ゴーストナンバー**: セクションの背景に薄く大きく表示される番号。左右交互に配置

### セクション番号体系（トップページ）
| 番号 | セクション | ゴーストナンバー位置 | 背景 |
|------|-----------|------------------|------|
| 01 | 事業領域（Business） | 左 | `bg-card + blueprint-grid` |
| 02 | サービス（Services） | 右 | `bg-background` |
| 03 | 制作実績（Works） | 左 | `bg-card + blueprint-grid` |
| 04 | 会社概要（About） | 右 | `bg-background` |
| 05 | メンバー（Members） | 左 | `bg-card + blueprint-grid` |
| 06 | ログ（Log） | 右 | `bg-background` |
| 07 | お問い合わせ（Contact） | 左 | `bg-background` |

※ ヒーローセクションは番号なし（タイトルページ扱い）
※ ゴーストナンバーは左右交互（奇数=左、偶数=右）

---

## レイアウト

### ヒーローセクション
- 2カラムグリッド（デスクトップ）
- 左: テキストコンテンツ（左寄せ）
- 右: BlueprintReticle SVG アニメーション
- モバイル: 1カラム（レティクル非表示）

### セクション交互配色
| セクション | 背景 |
|-----------|------|
| Hero | `bg-background` |
| Business (01) | `bg-card + blueprint-grid` |
| Services (02) | `bg-background` |
| Works (03) | `bg-card + blueprint-grid` |
| About (04) | `bg-background` |
| Members (05) | `bg-card + blueprint-grid` |
| Log (06) | `bg-background` |
| Contact (07) | `bg-background` |

### サービスカードレイアウト（Services セクション）
- フルワイドの1枚カード（コーナーブラケット付き）
- 内部を2カラムに分割: 左=概要・CTA / 右=特徴リスト（スペックシート形式）

---

## アニメーション

### StarField（`src/components/StarField.tsx`）
Canvas API によるアニメーション。毎フレーム `clearRect` で描画。

- **グリッド**: 主線 `rgba(255,255,255,0.028)`・補助線 `rgba(255,255,255,0.012)` を毎フレーム描画
- **星**: ランダム座標・サイズ・`sin` ベースの瞬き
- **宇宙船（旗艦）**: 3機。ダイヤモンド型ハル + エンジン排気トレイル + 船首ナビゲーションライト。`Math.atan2(vy, vx)` で進行方向に回転

### BlueprintReticle（インライン SVG + CSS アニメーション）
| 要素 | アニメーション | 速度 |
|------|-------------|------|
| 外周リング＋目盛り | 時計回り回転（`reticle-cw`） | 60s |
| 内周破線リング | 反時計回り回転（`reticle-ccw`） | 25s |
| レーダースイープライン | 時計回り回転（`reticle-cw`） | 5s |
| センタードット | フェード点滅（`reticle-blink`） | 2s |
| ユニットマーカー × 3 | スタガー点滅（delay: 0s / 1s / 2s） | 3s |

### スクロールインジケーター
マウスホイール型。内部ドットが `scroll-dot` キーフレームで下へ流れてループ。

### FadeIn（`src/components/FadeIn.tsx`）
スクロール連動のフェードインアニメーション。`IntersectionObserver` で要素が画面内に入ると `opacity-0 translate-y-4` → `opacity-100 translate-y-0` に遷移。

### ハンバーガーメニュー（`src/components/Header.tsx`）
- **ハンバーガー → ×**: 3本のスパンが中央に集まりながら回転（300ms）。中央線は `opacity` + `width` でフェードアウト
- **メニューパネル**: `opacity` + `translate-y` でフェードイン・スライドダウン（300ms）
- **メニュー項目**: 80ms 初期遅延の後、60ms 間隔でスタガー表示

---

## コピーライティング方針

- **UIテキストは句読点なし**（、。を使用しない）
- **ログ記事本文は通常の日本語文体**（句読点使用可）
- 英語と日本語を混在させる（設計図アノテーションは英語、本文は日本語）
- 創業者（眼科医×デザイナー）の組み合わせを個性として前面に出す
- 事業領域を限定する表現は避ける（拡張性を持たせる）

### キーコピー
| 箇所 | テキスト |
|------|---------|
| タグライン | The Platform for Flagships. |
| H1 | すべての事業を 旗艦として |
| サブコピー | ひとつの母艦から　それぞれの旗艦へ |

---

## コンポーネント

| コンポーネント | ファイル | 用途 |
|--------------|---------|------|
| `StarField` | `src/components/StarField.tsx` | Canvas アニメーション背景 |
| `FadeIn` | `src/components/FadeIn.tsx` | スクロール連動フェードイン |
| `Header` | `src/components/Header.tsx` | 固定ヘッダー。スクロールで背景出現。モバイルはハンバーガーメニュー |
| `Footer` | `src/components/Footer.tsx` | フッター。モバイルは `flex-wrap` で折り返し |
| `MdxContent` | `src/components/MdxContent.tsx` | MDXコンテンツのレンダリング。カスタムコンポーネントでスタイリング |
| `LogCta` | `src/components/LogCta.tsx` | ログ詳細ページ末尾のCTA。タグに応じて内容を自動切り替え |
| `Crosshair` | `src/app/page.tsx`（インライン） | 設計図クロスヘア SVG |
| `TechLabel` | 各ページ（インライン） | `//` プレフィックス付きラベル |
| `BlueprintReticle` | `src/app/page.tsx`（インライン） | ヒーロー右パネルのアニメーション SVG |

---

## ページ構成・URL設計

| URL | 内容 |
|-----|------|
| `/` | トップページ（Hero / Business / Services / Works / About / Members / Log / Contact） |
| `/service/medical-web` | 医療業界向けサイト制作 詳細ページ（特徴・対象・制作実績・関連ログ・CTA） |
| `/works` | 制作実績一覧 |
| `/works/[slug]` | 制作実績詳細 |
| `/log` | ログ一覧 |
| `/log/[slug]` | ログ詳細（MDXレンダリング・末尾CTA付き） |
| `/privacy` | プライバシーポリシー |

### サービスページのURL規則
個別サービスページは `/service/{slug}` に配置する。

| スラッグ | サービス名 |
|---------|----------|
| `medical-web` | 医療業界向けサイト制作 |

### ナビゲーション
- ヘッダー（デスクトップ）: 事業領域 / サービス / 制作実績 / ログ / 会社概要 / [お問い合わせ]
- ヘッダー（モバイル）: ハンバーガーメニュー + [お問い合わせ]
- フッター: 事業内容 / サービス / 制作実績 / ログ / 会社概要 / お問い合わせ / プライバシーポリシー

---

## コンテンツ管理（MDX）

### ディレクトリ構成
```
src/content/
├── log/        # ログ記事（MDXファイル）
└── works/      # 制作実績（MDXファイル）
```

### ログ記事のフロントマター
```yaml
---
title: "記事タイトル"
date: "YYYY-MM-DD"
description: "記事の説明（一覧・OGPに使用）"
tags: ["医療", "Webデザイン", "UX"]
---
```

### 制作実績のフロントマター
```yaml
---
title: "プロジェクト名"
date: "YYYY-MM-DD"
client: "クライアント名"
category: "医療業界向けサイト制作"
description: "プロジェクトの説明"
---
```

### LogCtaのタグ判定ルール
| タグ | 表示されるCTA |
|------|-------------|
| `医療` `医院` `クリニック` `病院` `眼科` | 医療機関向けWeb制作CTA |
| `民泊` `旅館` `宿泊` `ホスピタリティ` | 民泊・旅館業CTA |
| 上記以外 | 汎用CTA |

### ユーティリティ関数（`src/lib/content.ts`）
- `getAllLogs()` — ログ記事を日付降順で取得（contentフィールドなし）
- `getLog(slug)` — スラッグでログ記事を1件取得（contentフィールドあり）
- `getAllWorks()` — 制作実績を日付降順で取得
- `getWork(slug)` — スラッグで制作実績を1件取得
