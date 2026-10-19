import React from 'react';
import { Easing, interpolate, spring, useVideoConfig } from 'remotion';
import * as Ikony from 'lucide-react';

// Barvy a písmo podle manuálu značky (varianta Reflex).
export const B = {
  tmava: '#1f2328',
  tmava2: '#2a2f35',
  akcent: '#c8f560',
  bila: '#ffffff',
  papir: '#f3f4f2',
  seda: '#9aa0a6',
  sedaTmava: '#4a5058',
  c112: '#ff7a1a',
  c158: '#5aa9ff',
};
export const PISMO = "'IBM Plex Sans', sans-serif";
export const MONO = "'IBM Plex Mono', monospace";

export const useFormat = () => {
  const { width, height } = useVideoConfig();
  const svisle = height > width;
  // Základní jednotka: 1 = 1 px ve formátu 16:9 (1920 × 1080). Na výšku je plátno užší, písmo trochu menší.
  return { svisle, w: width, h: height, k: svisle ? 0.92 : 1 };
};

// Plynulý nástup prvku: průhlednost a posun zdola.
export const useNastup = (frame: number, od: number, trvani = 18) => {
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - od, fps, config: { damping: 200, mass: 0.8 }, durationInFrames: trvani });
  return { opacity: s, transform: `translateY(${(1 - s) * 40}px)` };
};

export const plynule = (frame: number, vstup: [number, number], vystup: [number, number]) =>
  interpolate(frame, vstup, vystup, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });

// Čísla tísňových linek mají vlastní barvy jako na webu.
export const Barevne: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(112|158)/).map((cast, i) =>
      cast === '112' ? <span key={i} style={{ color: B.c112 }}>112</span> : cast === '158' ? <span key={i} style={{ color: B.c158 }}>158</span> : <React.Fragment key={i}>{cast}</React.Fragment>,
    )}
  </>
);

export const Ikona: React.FC<{ nazev: string; velikost: number; barva?: string; tloustka?: number }> = ({ nazev, velikost, barva = B.bila, tloustka = 1.6 }) => {
  const Komp = (Ikony as unknown as Record<string, React.FC<{ size: number; color: string; strokeWidth: number }>>)[nazev] ?? Ikony.Circle;
  return <Komp size={velikost} color={barva} strokeWidth={tloustka} />;
};

export const Stitek: React.FC<{ text: string; svetly?: boolean; styl?: React.CSSProperties }> = ({ text, svetly, styl }) => (
  <span
    style={{
      fontFamily: MONO,
      fontSize: 22,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      padding: '6px 14px',
      background: svetly ? B.akcent : 'rgba(0,0,0,0.55)',
      color: svetly ? B.tmava : B.bila,
      border: svetly ? 'none' : `1.5px solid rgba(255,255,255,0.5)`,
      ...styl,
    }}
  >
    {text}
  </span>
);
