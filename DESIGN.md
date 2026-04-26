# FlagshipWorks — Design Document

> **このファイルについて**: ビジュアル・デザインに関するルールをまとめたドキュメントです。カラーパレット・タイポグラフィ・デザインモチーフ・アニメーション・コンポーネントのスタイルを記載します。URL設計・SEO・実装規約などの技術的な内容は `README.md` を参照してください。

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

## サービスページ構成（`/service/medical-web`）

| セクション | TechLabel | 内容 |
|-----------|-----------|------|
| ヘッダー | `// SERVICE.01 — MEDICAL WEB` | H1・サブコピー |
| 特徴 | `// FEATURES — 6 POINTS` | 6つの特徴カード（blueprint-grid） |
| こんな医療機関に | `// TARGET — WHO WE SERVE` | チェックリスト |
| 制作の流れ | `// PROCESS — 6 STEPS` | 6ステップカード |
| 料金プラン | `// PRICING — PLANS` | Standard Plan / Professional Plan の2カラム比較 |
| ローンチパートナー募集 | `// CAMPAIGN — 2026 LAUNCH PARTNER PROGRAM` | 残り枠表示・BENEFITS・REQUIREMENTS・CTA |
| 制作実績 | `// WORKS — PROJECT ARCHIVE` | 実績カード（準備中表示あり） |
| 関連ログ | `// LOG — RELATED ARTICLES` | 医療タグ記事カード |
| よくあるご質問 | `// FAQ — FREQUENTLY ASKED QUESTIONS` | 7項目のアコーディオン（shadcn/ui `@base-ui/react` 使用） |
| ご相談の流れ | `// FLOW — HOW TO GET STARTED` | 4ステップ横並びカード（お問い合わせ→ヒアリング→提案→制作開始） |
| CTA | `// CTA — GET IN TOUCH` | お問い合わせボタン |

### 料金プランの構成
- **Standard Plan**: ¥600,000〜（税別）。右上に「医師監修」バッジ。MEDICAL CHECK付き。ページ制作5〜8枚・スマホ最適化・フォーム・SEO・アナリティクス含む
- **Professional Plan**: ¥1,200,000〜（税別）。右上に「医師監修」バッジ。MEDICAL CHECK + STRATEGY付き。ページ制作10〜15枚・写真撮影ディレクション・ロゴデザイン追加
- 各カードの右上に `absolute` 配置の「医師監修」バッジ（`border border-blue-300/30 bg-blue-300/10`）

### ローンチパートナー募集の構成
- VACANCYバナー: 「限定 3 院様まで」の一行表記（`CAPACITY` ラベル付き）。OPENドット・大きな数字は使用しない
- BENEFITS: 3カードを横並び（制作費20%OFF・優先サポート対応・医師フル監修）。各カードにCheckCircle2アイコン
- REQUIREMENTS: 応募条件3項目（控えめなスタイル。`text-xs text-foreground/40`）
- CTA: 「無料相談・ローンチパートナー応募はこちら」（中央配置）

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
| `LogCta` | `src/components/LogCta.tsx` | ログ詳細ページ末尾のCTA。タグに応じて内容を自動切り替え。CTAボタン文言は「無料相談はこちら」 |
| `Accordion` | `src/components/ui/accordion.tsx` | shadcn/ui アコーディオン（`@base-ui/react` ベース）。FAQセクションで使用 |
| `Crosshair` | `src/app/page.tsx`（インライン） | 設計図クロスヘア SVG |
| `TechLabel` | 各ページ（インライン） | `//` プレフィックス付きラベル |
| `BlueprintReticle` | `src/app/page.tsx`（インライン） | ヒーロー右パネルのアニメーション SVG |
| `LogoOg` | `src/lib/ogLogo.tsx` | OGPイメージ用ロゴ（白塗りSVGインライン） |

### MdxContent のカスタムスタイル

MDXRemote に渡すコンポーネントマップ。`remark-gfm` を有効化しており、テーブル記法（`| col |`）が使用可能。

| 要素 | 主なクラス |
|------|-----------|
| `h2` | `border-b border-border/50 pb-3 text-xl font-bold` |
| `h3` | `text-base font-semibold` |
| `p` | `text-sm leading-[1.9] text-muted-foreground` |
| `ul` / `ol` | `list-disc` / `list-decimal`、`text-sm text-muted-foreground` |
| `a` | `text-blue-300 hover:underline` |
| `strong` | `font-semibold text-foreground` |
| `code`（インライン） | `font-mono text-[0.8em] text-blue-300 bg-card border border-border` |
| `pre` | `bg-card border border-border p-5 font-mono text-sm` |
| `blockquote` | `border-l-2 border-blue-300/50 pl-4 text-sm` |
| `table` | ラッパー `div` にコーナーブラケット + `border border-border`。内部 `table` は `w-full border-collapse` |
| `thead` | `bg-card border-b border-border` |
| `th` | `font-mono text-[10px] tracking-widest text-foreground/40 px-5 py-3` |
| `td` | `text-sm text-muted-foreground px-5 py-3.5` |
| `tr` | `border-b border-border/50 last:border-0` |
