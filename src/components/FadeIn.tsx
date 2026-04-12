"use client";

import { useRef, useEffect, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
}

export function FadeIn({ children, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform,filter] duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0 blur-none" : "opacity-0 translate-y-4 blur-sm"
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
