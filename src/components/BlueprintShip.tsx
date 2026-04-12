/**
 * 旗艦の設計図（側面図） — ヒーロー背景用 SVG
 * 船首（右）→ 船尾（左）方向
 */

type Props = { className?: string };

// 内部フレームステーションのハル座標（pre-compute）
const FRAMES = [
  { x: 360, top: 122, bot: 298 },
  { x: 530, top: 118, bot: 302 },
  { x: 700, top: 113, bot: 307 },
  { x: 870, top: 109, bot: 311 },
  { x: 1040, top: 108, bot: 312 },
];

export function BlueprintShip({ className }: Props) {
  return (
    <svg
      viewBox="0 0 1400 430"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      {/* ━━ メインハル輪郭 ━━ */}
      {/* 上縁：船尾(左)→ 船首(右) */}
      <path
        d="M 100,210 C 140,175 230,140 360,124 L 1090,108 C 1200,106 1290,122 1330,158 L 1350,210"
        strokeWidth="1.2"
      />
      {/* 下縁 */}
      <path
        d="M 100,210 C 140,245 230,280 360,296 L 1090,312 C 1200,314 1290,298 1330,262 L 1350,210"
        strokeWidth="1.2"
      />

      {/* ━━ ブリッジ（上部） ━━ */}
      <path d="M 570,124 L 605,70 L 885,70 L 920,109" strokeWidth="0.8" />
      <line x1="605" y1="70" x2="885" y2="70" strokeWidth="0.8" />
      {/* ブリッジ窓 */}
      <rect x="635" y="74" width="210" height="20" strokeWidth="0.5" />
      {[675, 715, 755, 795, 835].map((x) => (
        <line key={x} x1={x} y1="74" x2={x} y2="94" strokeWidth="0.4" />
      ))}

      {/* ━━ エンジンポート（船尾） ━━ */}
      <rect x="52" y="158" width="52" height="38" rx="5" strokeWidth="0.8" />
      <rect x="48" y="190" width="60" height="42" rx="6" strokeWidth="1.2" />
      <rect x="52" y="224" width="52" height="38" rx="5" strokeWidth="0.8" />
      {/* スラスター噴射線（破線） */}
      {[177, 211, 243].map((y) => (
        <line
          key={y}
          x1="48" y1={y} x2="10" y2={y}
          strokeWidth="0.5"
          strokeDasharray="5,4"
        />
      ))}

      {/* ━━ 補助翼（上下） ━━ */}
      <path d="M 830,108 L 875,48 L 995,48 L 945,110" strokeWidth="0.8" />
      <path d="M 830,312 L 875,372 L 995,372 L 945,310" strokeWidth="0.8" />
      {/* 翼の内部分割線 */}
      <line x1="910" y1="48" x2="930" y2="109" strokeWidth="0.4" />
      <line x1="910" y1="372" x2="930" y2="311" strokeWidth="0.4" />

      {/* ━━ 内部構造フレーム ━━ */}
      {FRAMES.map(({ x, top, bot }) => (
        <line
          key={x}
          x1={x} y1={top}
          x2={x} y2={bot}
          strokeWidth="0.5"
          strokeOpacity="0.7"
        />
      ))}

      {/* ━━ 水平中心線（破線） ━━ */}
      <line
        x1="80" y1="210"
        x2="1355" y2="210"
        strokeWidth="0.6"
        strokeDasharray="18,9"
      />

      {/* ━━ フレームサークルマーカー ━━ */}
      {FRAMES.map(({ x }) => (
        <circle key={x} cx={x} cy="210" r="7" strokeWidth="0.6" />
      ))}

      {/* ━━ 寸法線（下部） ━━ */}
      <line x1="100" y1="400" x2="1350" y2="400" strokeWidth="0.6" />
      <line x1="100"  y1="392" x2="100"  y2="408" strokeWidth="0.8" />
      <line x1="1350" y1="392" x2="1350" y2="408" strokeWidth="0.8" />
      <polyline points="128,395 100,400 128,405" strokeWidth="0.8" />
      <polyline points="1322,395 1350,400 1322,405" strokeWidth="0.8" />
      {/* 中間目盛 */}
      {[360, 530, 700, 870, 1040].map((x) => (
        <line key={x} x1={x} y1="395" x2={x} y2="405" strokeWidth="0.5" />
      ))}

      {/* ━━ 上部 引出し線（ブリッジ指示） ━━ */}
      <line x1="745" y1="70" x2="745" y2="30" strokeWidth="0.5" strokeDasharray="4,3" />
      <line x1="745" y1="30" x2="820" y2="30" strokeWidth="0.5" />
      <circle cx="745" cy="30" r="2.5" strokeWidth="0.6" />
    </svg>
  );
}
