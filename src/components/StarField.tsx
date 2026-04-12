"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
};

type Flagship = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  bodyLength: number;
  bodyWidth: number;
  trailLength: number;
  opacity: number;
  flickerOffset: number;
};

function spawnFlagship(w: number, h: number): Flagship {
  // ほぼ水平 ±40度
  const angle = (Math.random() - 0.5) * (Math.PI / 2.2);
  const dir   = Math.random() > 0.5 ? 1 : -1;
  const speed = Math.random() * 0.5 + 0.35;
  const bodyLength = Math.random() * 18 + 12; // 12〜30px

  return {
    x: dir > 0 ? -160 : w + 160,
    y: Math.random() * h * 0.85 + h * 0.075,
    vx: Math.cos(angle) * speed * dir,
    vy: Math.sin(angle) * speed,
    speed,
    bodyLength,
    bodyWidth: bodyLength * 0.2,
    trailLength: Math.random() * 55 + 35,
    opacity: Math.random() * 0.45 + 0.3,
    flickerOffset: Math.random() * Math.PI * 2,
  };
}

export function StarField() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const starsRef     = useRef<Star[]>([]);
  const flagshipsRef = useRef<Flagship[]>([]);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    // モバイルではアニメーションを無効化（パフォーマンス最適化）
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      generateStars();
    };

    const generateStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 4000);
      starsRef.current = Array.from({ length: count }, () => ({
        x:            Math.random() * canvas.width,
        y:            Math.random() * canvas.height,
        size:         Math.random() * 1.2 + 0.2,
        opacity:      Math.random() * 0.5 + 0.08,
        twinkleSpeed: Math.random() * 0.012 + 0.004,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));

      // 初回のみ：画面内のランダム位置から出発
      if (flagshipsRef.current.length === 0) {
        flagshipsRef.current = Array.from({ length: 3 }, () => {
          const ship = spawnFlagship(canvas.width, canvas.height);
          ship.x = Math.random() * canvas.width;
          ship.y = Math.random() * canvas.height;
          return ship;
        });
      }
    };

    let frame = 0;

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      /* ── 設計図グリッド ── */
      const minor = 30;
      const major = 120;
      // 補助線
      ctx.strokeStyle = "rgba(255,255,255,0.012)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= canvas.width; x += minor) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += minor) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      // 主線
      ctx.strokeStyle = "rgba(255,255,255,0.028)";
      for (let x = 0; x <= canvas.width; x += major) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += major) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      /* ── 背景の星 ── */
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinkleOffset);
        const op = star.opacity * (0.7 + 0.3 * twinkle);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${op})`;
        ctx.fill();
      });

      /* ── 旗艦 ── */
      flagshipsRef.current.forEach((ship, i) => {
        // エンジンのちらつき
        const flicker = 0.85 + 0.15 * Math.sin(frame * 0.22 + ship.flickerOffset);
        const op      = ship.opacity * flicker;

        // 進行方向に回転させてローカル座標系で描く
        ctx.save();
        ctx.translate(ship.x, ship.y);
        ctx.rotate(Math.atan2(ship.vy, ship.vx));

        const half = ship.bodyLength / 2;
        const bw   = ship.bodyWidth;

        /* ① エンジン排気トレイル（船尾 -half から後方へ） */
        const trailEnd = -half - ship.trailLength;
        const trailGrad = ctx.createLinearGradient(-half, 0, trailEnd, 0);
        trailGrad.addColorStop(0,   `rgba(120, 180, 255, ${op * 0.9})`);
        trailGrad.addColorStop(0.4, `rgba(100, 160, 255, ${op * 0.35})`);
        trailGrad.addColorStop(1,   `rgba(80,  140, 255, 0)`);

        const tw = bw * 0.65;
        ctx.beginPath();
        ctx.moveTo(-half,    -tw);
        ctx.lineTo(-half,     tw);
        ctx.lineTo(trailEnd,  tw * 0.04);
        ctx.lineTo(trailEnd, -tw * 0.04);
        ctx.closePath();
        ctx.fillStyle = trailGrad;
        ctx.fill();

        /* ② エンジンコアグロー（船尾の青白い輝き） */
        const engineGlow = ctx.createRadialGradient(-half, 0, 0, -half, 0, bw * 3);
        engineGlow.addColorStop(0, `rgba(150, 210, 255, ${op})`);
        engineGlow.addColorStop(1, `rgba(100, 170, 255, 0)`);
        ctx.fillStyle = engineGlow;
        ctx.beginPath();
        ctx.arc(-half, 0, bw * 3, 0, Math.PI * 2);
        ctx.fill();

        /* ③ 船体ハル（ダイヤモンド型） */
        ctx.beginPath();
        ctx.moveTo(half,       0);      // 船首
        ctx.lineTo(half * 0.2, -bw);    // 上部
        ctx.lineTo(-half,      0);      // 船尾
        ctx.lineTo(half * 0.2,  bw);    // 下部
        ctx.closePath();

        const hullGrad = ctx.createLinearGradient(-half, 0, half, 0);
        hullGrad.addColorStop(0,   `rgba(150, 190, 235, ${op * 0.25})`);
        hullGrad.addColorStop(0.5, `rgba(195, 218, 255, ${op * 0.5})`);
        hullGrad.addColorStop(1,   `rgba(225, 240, 255, ${op * 0.75})`);
        ctx.fillStyle = hullGrad;
        ctx.fill();

        /* ④ 船首ナビゲーションライト */
        const noseGlow = ctx.createRadialGradient(half, 0, 0, half, 0, 5);
        noseGlow.addColorStop(0, `rgba(255, 255, 255, ${op})`);
        noseGlow.addColorStop(1, `rgba(210, 235, 255, 0)`);
        ctx.fillStyle = noseGlow;
        ctx.beginPath();
        ctx.arc(half, 0, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        /* 移動 */
        ship.x += ship.vx;
        ship.y += ship.vy;

        /* 画面外で再スポーン */
        const margin = ship.trailLength + ship.bodyLength + 40;
        if (
          ship.x < -margin || ship.x > canvas.width  + margin ||
          ship.y < -margin || ship.y > canvas.height + margin
        ) {
          flagshipsRef.current[i] = spawnFlagship(canvas.width, canvas.height);
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden
    />
  );
}
