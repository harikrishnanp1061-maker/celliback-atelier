"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

// Theme accent tokens matching Celliback Atelier's signature matte rose palette
const ACCENT = "var(--primary, #C86D7A)";
const TRAIL = `color-mix(in srgb, ${ACCENT} 35%, transparent)`;
const SHEEN = `color-mix(in srgb, ${ACCENT} 35%, white)`;
const SHADOW = `color-mix(in srgb, ${ACCENT} 30%, transparent)`;

// Share of the path drawn by the load intro (sweeps across the hero screen)
const INTRO_SHARE = 0.14;

// Real-pixel SVG path wandering diagonally across the Hero and through each content section
function buildPath(w: number, h: number) {
  const X = (f: number) => (f * w).toFixed(1);
  const Y = (f: number) => (f * h).toFixed(1);

  return [
    `M ${X(0.06)} ${Y(0.01)}`,
    // Phase 1 (Intro): Sweeps diagonally across hero from top-left to bottom-right
    `C ${X(0.42)} ${Y(0.03)}, ${X(0.85)} ${Y(0.07)}, ${X(0.84)} ${Y(0.12)}`,
    // S-curve 1: under hero / across ProductSlider
    `C ${X(0.82)} ${Y(0.18)}, ${X(0.15)} ${Y(0.20)}, ${X(0.12)} ${Y(0.26)}`,
    // S-curve 2: across ProductSlider into Armor Highlights
    `C ${X(0.10)} ${Y(0.32)}, ${X(0.88)} ${Y(0.34)}, ${X(0.86)} ${Y(0.40)}`,
    // S-curve 3: across Armor into Lifestyle Community
    `C ${X(0.84)} ${Y(0.46)}, ${X(0.12)} ${Y(0.48)}, ${X(0.14)} ${Y(0.54)}`,
    // S-curve 4: across Lifestyle into Store Locator Mini-Map
    `C ${X(0.16)} ${Y(0.60)}, ${X(0.88)} ${Y(0.62)}, ${X(0.85)} ${Y(0.68)}`,
    // S-curve 5: across Store Locator into Unboxing Perks
    `C ${X(0.82)} ${Y(0.74)}, ${X(0.14)} ${Y(0.76)}, ${X(0.16)} ${Y(0.82)}`,
    // S-curve 6: across Unboxing into Concierge Contact
    `C ${X(0.18)} ${Y(0.88)}, ${X(0.84)} ${Y(0.90)}, ${X(0.50)} ${Y(0.98)}`,
  ].join(" ");
}

const DefaultBow = () => (
  <svg viewBox="0 0 48 48" width="100%" height="100%" fill="currentColor">
    <path d="M24 24C16 12 4 10 4 20c0 8 12 8 20 4Z" />
    <path d="M24 24c8-12 20-14 20-4 0 8-12 8-20 4Z" />
    <circle cx="24" cy="24" r="4.5" />
    <path d="M22 27l-6 14 6-4 2-3ZM26 27l6 14-6-4-2-3Z" />
  </svg>
);

type Props = {
  children: React.ReactNode;
  bow?: React.ReactNode; // pass the site's own bow asset here
  className?: string;
};

export function RibbonScroll({ children, bow, className = "" }: Props) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const lenRef = useRef(0);
  const [pathLength, setPathLength] = useState(0);
  const [size, setSize] = useState({ w: 1200, h: 5000 });

  // Track the wrapper's real pixel size across all screen resizes
  useEffect(() => {
    const updateSize = () => {
      const el = wrapRef.current;
      const w = el ? el.offsetWidth : window.innerWidth;
      const h = el ? el.offsetHeight : document.documentElement.scrollHeight;
      setSize({ w: Math.max(360, w), h: Math.max(1200, h) });
    };

    updateSize();

    const el = wrapRef.current;
    if (el && typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(([entry]) => {
        if (entry?.contentRect) {
          setSize({
            w: Math.max(360, entry.contentRect.width),
            h: Math.max(1200, entry.contentRect.height),
          });
        }
      });
      ro.observe(el);
      return () => ro.disconnect();
    }

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const d = useMemo(() => buildPath(size.w, size.h), [size]);

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      lenRef.current = len;
      setPathLength(len);
    }
  }, [d, size]);

  // Global window scroll progress, smoothed with buttery spring physics
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    mass: 0.6,
  });

  // Load intro: smoothly draws the first diagonal sweep top-left -> bottom-right of hero
  const intro = useMotionValue(reduce ? 1 : 0);
  useEffect(() => {
    if (reduce) {
      intro.set(1);
      return;
    }
    const c = animate(intro, 1, { duration: 1.8, ease: "easeOut", delay: 0.2 });
    return () => c.stop();
  }, [reduce, intro]);

  // Total drawn amount: intro first, then scroll continues from there
  // The trail is never erased going down; scrolling back up smoothly retracts it to the hero
  const drawn = useTransform([intro, smooth], ([i, s]: number[]) =>
    Math.min(1, Math.max(0, INTRO_SHARE * i + (1 - INTRO_SHARE) * s))
  );

  // Tip position and direction along the path with reliable fallback and micro-cache
  const lastVRef = useRef<number>(-1);
  const cachedPointRef = useRef<{ x: number; y: number; a: number }>({ x: 50, y: 70, a: 45 });

  const pointAt = (v: number) => {
    const p = pathRef.current;
    const len = pathLength || lenRef.current || (p ? p.getTotalLength() : 0);
    if (!p || len <= 0) {
      return { x: size.w * 0.08, y: 70, a: 45 };
    }
    const safeV = Math.min(1, Math.max(0, v));
    const ptA = p.getPointAtLength(len * safeV);
    const ptB = p.getPointAtLength(Math.min(len, len * safeV + 2));
    return {
      x: ptA.x,
      y: ptA.y,
      a: (Math.atan2(ptB.y - ptA.y, ptB.x - ptA.x) * 180) / Math.PI,
    };
  };

  const getCachedPoint = (v: number) => {
    // If delta is tiny, reuse cached point to avoid heavy redundant getPointAtLength calls
    if (Math.abs(v - lastVRef.current) < 0.0004) {
      return cachedPointRef.current;
    }
    const pt = pointAt(v);
    lastVRef.current = v;
    cachedPointRef.current = pt;
    return pt;
  };

  const tipX = useTransform(drawn, (v) => getCachedPoint(v).x);
  const tipY = useTransform(drawn, (v) => getCachedPoint(v).y);
  // Tilt the bow gently toward the travel direction (90deg = straight down)
  const tilt = useTransform(drawn, (v) => (getCachedPoint(v).a - 90) * 0.6);

  const mobile = size.w < 640;
  const strokeW = mobile ? 12 : 20;
  const bowSize = mobile ? 36 : 48;

  return (
    <div ref={wrapRef} className={`relative overflow-x-clip ${className}`}>
      {/* 
        Ribbon Layer: 
        Elevated to z-20 so it renders IN FRONT of section backgrounds/textures (z-0),
        while sitting BEHIND section content cards and text (which use relative z-30).
        Hardware-accelerated with translateZ(0) to prevent frame drops on mobile.
      */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 overflow-visible [transform:translateZ(0)] will-change-transform"
        animate={
          reduce || mobile ? undefined : { x: [0, 6, 0, -6, 0], y: [0, 4, 0, -4, 0] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          fill="none"
          className="absolute inset-0 overflow-visible pointer-events-none"
        >
          <defs>
            {/* Multi-stop rich satin ribbon gradient using theme color-mix tokens */}
            <linearGradient id="satin-ribbon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={TRAIL} />
              <stop offset="35%" stopColor="#F07088" stopOpacity="0.92" />
              <stop offset="70%" stopColor="#DE5872" stopOpacity="0.90" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0.96" />
            </linearGradient>
          </defs>

          {/* 1. Ambient soft drop shadow trail (pure vector rasterization for 60-120fps performance) */}
          <motion.path
            d={d}
            stroke="rgba(31, 26, 27, 0.10)"
            strokeWidth={strokeW + 6}
            strokeLinecap="round"
            style={{ pathLength: drawn }}
          />

          {/* 2. Main satin ribbon strip (14-20px wide) */}
          <motion.path
            ref={pathRef}
            d={d}
            stroke="url(#satin-ribbon-grad)"
            strokeWidth={strokeW}
            strokeLinecap="round"
            style={{ pathLength: drawn }}
          />

          {/* 3. Crisp rose contour edge line for definition */}
          <motion.path
            d={d}
            stroke="#D85870"
            strokeWidth={2}
            strokeOpacity={0.8}
            strokeLinecap="round"
            style={{ pathLength: drawn }}
          />

          {/* 4. Center silky sheen highlight */}
          <motion.path
            d={d}
            stroke={SHEEN}
            strokeWidth={3.5}
            strokeLinecap="round"
            transform="translate(-2 -3)"
            style={{ pathLength: drawn }}
          />
        </svg>

        {/* Coquette Bow at the travelling tip */}
        <motion.div
          className="absolute left-0 top-0 pointer-events-none"
          style={{
            x: tipX,
            y: tipY,
            rotate: tilt,
            width: bowSize,
            height: bowSize,
            marginLeft: -bowSize / 2,
            marginTop: -bowSize / 2,
            color: ACCENT,
            filter: `drop-shadow(0 4px 8px ${SHADOW})`,
          }}
        >
          {bow ?? <DefaultBow />}
        </motion.div>
      </motion.div>

      {/* 
        Page content wrapper:
        Notice no z-index is applied here so child sections preserve their natural stacking context.
        Section backgrounds remain underneath (z-0), while section cards and text (z-30) float on top of the ribbon (z-20).
      */}
      <div className="relative">{children}</div>
    </div>
  );
}
