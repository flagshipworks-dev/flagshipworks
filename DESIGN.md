# FlagshipWorks — Design Document

## ブランドコンセプト

**"The Platform for Flagships."**

FlagshipWorks合同会社は、複数の独立した事業（旗艦）を展開するホールディングス型の会社。
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
- 句読点（、。）は使用しない（設計図的なミニマル表現）

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

### セクション番号体系
| 番号 | セクション | ゴーストナンバー位置 |
|------|-----------|------------------|
| 01 | 事業領域（Business） | 左 |
| 02 | サービス（Services） | 右 |
| 03 | 会社概要（About） | 左 |
| 04 | メンバー（Members） | 右 |
| 05 | お問い合わせ（Contact） | 左 |

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
| Business | `bg-card` + `blueprint-grid` |
| Services | `bg-background` |
| About | `bg-background` |
| Members | `bg-card` + `blueprint-grid` |
| Contact | `bg-background` |

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

---

## コピーライティング方針

- **句読点なし**（、。を使用しない）
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
| `Header` | `src/components/Header.tsx` | 固定ヘッダー。スクロールで背景出現 |
| `Footer` | `src/components/Footer.tsx` | フッター。プライバシーポリシーリンク含む |
| `Crosshair` | `src/app/page.tsx`（インライン） | 設計図クロスヘア SVG |
| `TechLabel` | `src/app/page.tsx` / 各ページ（インライン） | `//` プレフィックス付きラベル |
| `BlueprintReticle` | `src/app/page.tsx`（インライン） | ヒーロー右パネルのアニメーション SVG |

---

## ページ構成・URL設計

| URL | 内容 |
|-----|------|
| `/` | トップページ（Hero / Business / Services / About / Members / Contact） |
| `/service/medical-web` | 医療業界向けサイト制作 詳細ページ |
| `/privacy` | プライバシーポリシー |

### サービスページのURL規則
個別サービスページは `/service/{slug}` に配置する。
サービスが複数になった段階で `/services`（一覧ページ）を追加予定。

| スラッグ | サービス名 |
|---------|----------|
| `medical-web` | 医療業界向けサイト制作 |

### ナビゲーション
- ヘッダー・フッターのサービスリンクはトップページの `#services` セクションへスクロール
- 各サービス詳細ページへは、トップページのサービスセクション内「詳しく見る」ボタンからアクセス
