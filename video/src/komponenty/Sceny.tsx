import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { Vizual, Strana } from '../data/videa';
import { OSA_PROUD, PLAN_POLE, TECHNIKY } from '../data/videa';
import { B, Barevne, Ikona, MONO, PISMO, Stitek, plynule, useFormat, useNastup } from './styl';

type P<T extends Vizual['typ']> = { v: Extract<Vizual, { typ: T }>; d: number };

// Oblast pro obsah: nahoře lišta s logem, dole titulky. Na výšku víc místa nahoře i dole kvůli rozhraní sítí.
const Plocha: React.FC<{ children: React.ReactNode; styl?: React.CSSProperties }> = ({ children, styl }) => {
  const { svisle } = useFormat();
  return (
    <AbsoluteFill style={{ padding: svisle ? '300px 70px 600px' : '150px 140px 250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...styl }}>
      {children}
    </AbsoluteFill>
  );
};

// Kdy se má objevit i-tá položka: rovnoměrně v první části scény.
const krok = (i: number, n: number, d: number, od = 12, podil = 0.62) => od + (n <= 1 ? 0 : (i * (d * podil - od)) / (n - 1));

const Pozadi: React.FC<{ src: string; d: number; tma?: number; rozmaz?: number }> = ({ src, d, tma = 0.55, rozmaz = 0 }) => {
  const f = useCurrentFrame();
  const { svisle } = useFormat();
  const meritko = interpolate(f, [0, d], [1.04, 1.14]);
  const posun = interpolate(f, [0, d], [0, svisle ? -40 : -30]);
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${meritko}) translateX(${posun}px)`, filter: `saturate(0.85) brightness(${tma === 0 ? 1.18 : 1}) blur(${rozmaz}px)` }} />
      <AbsoluteFill style={{ background: `rgba(31,35,40,${tma})` }} />
    </AbsoluteFill>
  );
};

const Nadpis: React.FC<{ text: string; od?: number; velikost?: number; barva?: string; zarovnat?: 'center' | 'left' }> = ({ text, od = 6, velikost = 104, barva = B.bila, zarovnat = 'center' }) => {
  const f = useCurrentFrame();
  const { k } = useFormat();
  const slova = text.split(' ');
  return (
    <h1 style={{ fontFamily: PISMO, fontWeight: 700, fontSize: velikost * k, lineHeight: 1.04, letterSpacing: '-0.02em', color: barva, margin: 0, textAlign: zarovnat }}>
      {slova.map((s, i) => {
        const o = plynule(f, [od + i * 3, od + i * 3 + 12], [0, 1]);
        return (
          <span key={i} style={{ display: 'inline-block', opacity: o, transform: `translateY(${(1 - o) * 30}px)`, marginRight: '0.24em' }}>
            <Barevne text={s} />
          </span>
        );
      })}
    </h1>
  );
};

const Pod: React.FC<{ text: string; od: number; velikost?: number; zarovnat?: 'center' | 'left'; barva?: string }> = ({ text, od, velikost = 46, zarovnat = 'center', barva = B.bila }) => {
  const f = useCurrentFrame();
  const { k } = useFormat();
  const n = useNastup(f, od);
  return <p style={{ fontFamily: PISMO, fontSize: velikost * k, lineHeight: 1.3, color: barva, margin: '28px 0 0', textAlign: zarovnat, ...n }}><Barevne text={text} /></p>;
};

const Kruh: React.FC<{ ikona: string; velikost: number; od: number; preskrtnout?: boolean; plny?: boolean }> = ({ ikona, velikost, od, preskrtnout, plny }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = interpolate(f - od, [0, 14], [0.6, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const o = plynule(f, [od, od + 10], [0, 1]);
  const cara = plynule(f, [od + fps * 0.9, od + fps * 1.3], [0, 1]);
  return (
    <div style={{ position: 'relative', width: velikost, height: velikost, borderRadius: '50%', border: `4px solid ${B.akcent}`, background: plny ? B.akcent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${s})`, opacity: o, flexShrink: 0 }}>
      <Ikona nazev={ikona} velikost={velikost * 0.5} barva={plny ? B.tmava : B.akcent} />
      {preskrtnout && <div style={{ position: 'absolute', width: velikost * 1.05 * cara, height: 6, background: B.bila, transform: 'rotate(-45deg)', transformOrigin: 'center' }} />}
    </div>
  );
};

export const SNadpis: React.FC<P<'nadpis'>> = ({ v }) => {
  const { k } = useFormat();
  return (
    <Plocha styl={{ alignItems: 'center' }}>
      {v.ikona && <div style={{ marginBottom: 48 }}><Kruh ikona={v.ikona} velikost={170 * k} od={0} preskrtnout={v.preskrtnout} /></div>}
      <Nadpis text={v.text} od={8} />
      {v.pod && <Pod text={v.pod} od={26} />}
    </Plocha>
  );
};

export const SObraz: React.FC<P<'obraz'>> = ({ v, d }) => {
  const { svisle, k } = useFormat();
  return (
    <AbsoluteFill>
      <Pozadi src={v.src} d={d} tma={0} />
      <AbsoluteFill style={{ background: svisle ? 'linear-gradient(180deg, rgba(31,35,40,0.15) 0%, rgba(31,35,40,0.2) 35%, rgba(31,35,40,0.92) 62%)' : 'linear-gradient(90deg, rgba(31,35,40,0.94) 0%, rgba(31,35,40,0.8) 38%, rgba(31,35,40,0.1) 75%)' }} />
      {v.stitek && <div style={{ position: 'absolute', top: svisle ? 300 : 150, right: svisle ? 70 : 140 }}><Stitek text={v.stitek} /></div>}
      <Plocha styl={{ justifyContent: svisle ? 'flex-end' : 'center', alignItems: 'flex-start', paddingRight: svisle ? 70 : 860 }}>
        <Nadpis text={v.nadpis} zarovnat="left" velikost={svisle ? 96 : 100} />
        {v.pod && <Pod text={v.pod} od={24} zarovnat="left" velikost={44 * (svisle ? 1 : 1)} />}
        <div style={{ height: 6 * k, width: 160, background: B.akcent, marginTop: 40 }} />
      </Plocha>
    </AbsoluteFill>
  );
};

export const SIkony: React.FC<P<'ikony'>> = ({ v, d }) => {
  const f = useCurrentFrame();
  const { svisle, k } = useFormat();
  const n = v.polozky.length;
  const sloupce = svisle ? (n > 4 ? 2 : 1) : Math.min(n, n === 4 ? 4 : n > 4 ? 3 : n);
  const vel = svisle ? (n > 4 ? 130 : 120) : n > 3 ? 150 : 170;
  return (
    <AbsoluteFill>
      {v.pozadi && <Pozadi src={v.pozadi} d={d} tma={0.86} />}
      <Plocha styl={{ alignItems: 'center' }}>
        {v.nadpis && <div style={{ marginBottom: svisle ? 60 : 70 }}><Nadpis text={v.nadpis} velikost={svisle ? 76 : 80} od={2} /></div>}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sloupce}, 1fr)`, gap: svisle ? '44px 30px' : '56px 60px', width: '100%' }}>
          {v.polozky.map((p, i) => {
            const od = krok(i, n, d, 14);
            const s = useNastup(f, od);
            return (
              <div key={i} style={{ display: 'flex', flexDirection: svisle && sloupce === 1 ? 'row' : 'column', alignItems: 'center', gap: 26, ...s }}>
                <Kruh ikona={p.ikona} velikost={vel * k} od={od} preskrtnout={p.zakaz} />
                <span style={{ fontFamily: PISMO, fontWeight: 700, fontSize: (svisle ? 44 : 40) * k, color: B.bila, textAlign: svisle && sloupce === 1 ? 'left' : 'center', lineHeight: 1.15 }}><Barevne text={p.text} /></span>
              </div>
            );
          })}
        </div>
      </Plocha>
    </AbsoluteFill>
  );
};

export const SSeznam: React.FC<P<'seznam'>> = ({ v, d }) => {
  const f = useCurrentFrame();
  const { svisle, k } = useFormat();
  const n = v.polozky.length;
  return (
    <Plocha styl={{ alignItems: svisle ? 'stretch' : 'center' }}>
      <div style={{ width: svisle ? '100%' : 1300 }}>
        <Nadpis text={v.nadpis} zarovnat="left" velikost={svisle ? 80 : 78} od={2} />
        <div style={{ marginTop: 50, display: 'flex', flexDirection: 'column', gap: svisle ? 30 : 24 }}>
          {v.polozky.map((p, i) => {
            const od = krok(i, n, d, 20, 0.78);
            const s = useNastup(f, od);
            const zaskrt = plynule(f, [od + 8, od + 16], [0, 1]);
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 30, ...s }}>
                <div style={{ width: 64 * k, height: 64 * k, flexShrink: 0, border: `4px solid ${B.akcent}`, background: zaskrt > 0.5 ? B.akcent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 34 * k, fontWeight: 600, color: B.tmava }}>
                  {v.cisla ? <span style={{ color: zaskrt > 0.5 ? B.tmava : B.akcent }}>{i + 1}</span> : <span style={{ transform: `scale(${zaskrt})`, display: 'flex' }}><Ikona nazev="Check" velikost={44 * k} barva={B.tmava} tloustka={3} /></span>}
                </div>
                <span style={{ fontFamily: PISMO, fontWeight: 700, fontSize: (svisle ? 50 : 52) * k, color: B.bila, lineHeight: 1.15 }}><Barevne text={p} /></span>
              </div>
            );
          })}
        </div>
      </div>
    </Plocha>
  );
};

export const SFakta: React.FC<P<'fakta'>> = ({ v, d }) => {
  const f = useCurrentFrame();
  const { svisle, k } = useFormat();
  return (
    <AbsoluteFill>
      <Pozadi src={v.src} d={d} tma={0.8} />
      <Plocha styl={{ alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: svisle ? 60 : 56, width: svisle ? '100%' : 1400 }}>
          {v.polozky.map((p, i) => {
            const od = krok(i, v.polozky.length, d, 8, 0.45);
            const s = useNastup(f, od);
            const raz = plynule(f, [od + 30, od + 40], [0, 1]);
            return (
              <div key={i} style={{ display: 'flex', flexDirection: svisle ? 'column' : 'row', gap: svisle ? 14 : 50, alignItems: svisle ? 'flex-start' : 'baseline', ...s }}>
                {p.rok && <span style={{ fontFamily: MONO, fontWeight: 600, fontSize: 64 * k, color: B.akcent, minWidth: svisle ? 0 : 400, whiteSpace: 'nowrap' }}>{p.rok}</span>}
                <div style={{ marginLeft: !p.rok && !svisle ? 450 : 0 }}>
                  <p style={{ fontFamily: PISMO, fontWeight: 700, fontSize: (svisle ? 50 : 54) * k, color: B.bila, margin: 0, lineHeight: 1.2 }}>{p.text}</p>
                  {p.razitko && (
                    <div style={{ marginTop: 22, display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 22px', border: `4px solid ${B.akcent}`, color: B.akcent, fontFamily: MONO, fontWeight: 600, fontSize: 34 * k, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: raz, transform: `rotate(-4deg) scale(${1.6 - 0.6 * raz})` }}>
                      <Ikona nazev="Check" velikost={34 * k} barva={B.akcent} tloustka={3} /> {p.razitko}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Plocha>
    </AbsoluteFill>
  );
};

const Vlna: React.FC<{ druh: 'kolisava' | 'rovna'; postup: number; barva: string; sirka: number }> = ({ druh, postup, barva, sirka }) => {
  const f = useCurrentFrame();
  const vyska = 120;
  const body: string[] = [];
  for (let x = 0; x <= sirka * postup; x += 6) {
    const t = x / sirka;
    const y = druh === 'kolisava' ? vyska / 2 + Math.sin(t * Math.PI * 10 + f / 6) * (vyska / 2 - 8) * (0.55 + 0.45 * Math.sin(t * Math.PI * 2)) : vyska / 2;
    body.push(`${x},${y.toFixed(1)}`);
  }
  return (
    <svg width={sirka} height={vyska} style={{ display: 'block' }}>
      <polyline points={body.join(' ')} fill="none" stroke={barva} strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
};

const Panel: React.FC<{ s: Strana; od: number }> = ({ s, od }) => {
  const f = useCurrentFrame();
  const { svisle, k } = useFormat();
  const n = useNastup(f, od);
  const sirka = svisle ? 800 : 640;
  return (
    <div style={{ flex: 1, padding: svisle ? '40px 44px' : '64px 64px', border: `4px solid ${s.aktivni ? B.akcent : B.sedaTmava}`, background: s.aktivni ? 'rgba(200,245,96,0.08)' : 'rgba(255,255,255,0.03)', ...n }}>
      {s.vlna && <div style={{ marginBottom: 30 }}><Vlna druh={s.vlna} postup={plynule(f, [od + 6, od + 40], [0, 1])} barva={s.aktivni ? B.akcent : B.seda} sirka={sirka} /></div>}
      <p style={{ fontFamily: PISMO, fontWeight: 700, fontSize: (svisle ? 62 : 80) * k, color: s.aktivni ? B.akcent : B.bila, margin: 0, lineHeight: 1.1 }}>{s.nadpis}</p>
      <p style={{ fontFamily: PISMO, fontSize: (svisle ? 40 : 46) * k, color: B.bila, margin: '18px 0 0', lineHeight: 1.3 }}>{s.popis}</p>
    </div>
  );
};

export const SSrovnani: React.FC<P<'srovnani'>> = ({ v, d }) => {
  const { svisle } = useFormat();
  return (
    <Plocha>
      <div style={{ display: 'flex', flexDirection: svisle ? 'column' : 'row', gap: svisle ? 40 : 60 }}>
        <Panel s={v.levy} od={6} />
        <Panel s={v.pravy} od={Math.round(d * 0.35)} />
      </div>
      {v.pod && <Pod text={v.pod} od={Math.round(d * 0.6)} velikost={44} />}
    </Plocha>
  );
};

export const SPlan: React.FC<P<'plan'>> = ({ v, d }) => {
  const f = useCurrentFrame();
  const { svisle, k } = useFormat();
  const nastup = useNastup(f, 0, 14);
  const prvni = Math.min(...v.aktivni);
  const m = svisle ? k : 1.2;
  return (
    <Plocha styl={{ alignItems: 'center' }}>
      <div style={{ background: B.papir, color: B.tmava, width: svisle ? 900 : 1560, padding: svisle ? '44px 40px' : '50px 60px', boxShadow: '0 30px 80px rgba(0,0,0,0.45)', transform: `${nastup.transform} rotate(-0.6deg)`, opacity: nastup.opacity }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `4px solid ${B.tmava}`, paddingBottom: 16, marginBottom: 30 }}>
          <span style={{ fontFamily: PISMO, fontWeight: 700, fontSize: 52 * m }}>Rodinný plán</span>
          <span style={{ fontFamily: MONO, fontSize: 26 * m }}>A4 · na lednici</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: svisle ? '1fr' : '1fr 1fr', gap: svisle ? 16 : 22 }}>
          {PLAN_POLE.map((p, i) => {
            const hotovo = i < prvni;
            const aktivni = v.aktivni.includes(i);
            const od = aktivni ? 10 + v.aktivni.indexOf(i) * Math.max(10, (d * 0.5) / v.aktivni.length) : 0;
            const a = aktivni ? plynule(f, [od, od + 12], [0, 1]) : 0;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: svisle ? '14px 18px' : '18px 22px', border: `3px solid ${B.tmava}`, background: aktivni ? `rgba(200,245,96,${a})` : hotovo ? 'rgba(200,245,96,0.35)' : 'transparent', opacity: aktivni || hotovo ? 1 : 0.4 }}>
                <Ikona nazev={hotovo ? 'Check' : p.ikona} velikost={44 * m} barva={B.tmava} tloustka={2.2} />
                <div>
                  <div style={{ fontFamily: PISMO, fontWeight: 700, fontSize: 34 * m }}>{i + 1}. {p.nadpis}</div>
                  {aktivni && <div style={{ fontFamily: PISMO, fontSize: 26 * m, opacity: a, marginTop: 4 }}>{p.detail}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Plocha>
  );
};

export const SOsa: React.FC<P<'osa'>> = ({ v, d }) => {
  const f = useCurrentFrame();
  const { svisle, k } = useFormat();
  const sirka = svisle ? 860 : 1500;
  const postup = plynule(f, [0, 20], [v.aktivni === 0 ? 0 : (v.aktivni - 1) / 2, v.aktivni / 2]);
  const n = v.polozky.length;
  return (
    <Plocha styl={{ alignItems: 'center' }}>
      <div style={{ position: 'relative', width: sirka, height: 150 }}>
        <div style={{ position: 'absolute', top: 40, left: 0, width: sirka, height: 6, background: B.sedaTmava }} />
        <div style={{ position: 'absolute', top: 40, left: 0, width: sirka * postup, height: 6, background: B.akcent }} />
        {OSA_PROUD.map((t, i) => {
          const aktivni = i === v.aktivni;
          const hotovo = i < v.aktivni;
          return (
            <div key={i} style={{ position: 'absolute', left: (sirka * i) / 2, top: 0, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 86, height: 86, borderRadius: '50%', background: aktivni || hotovo ? B.akcent : B.tmava, border: `6px solid ${aktivni || hotovo ? B.akcent : B.sedaTmava}` }} />
              <span style={{ fontFamily: MONO, fontWeight: 600, fontSize: (aktivni ? 40 : 30) * k, color: aktivni ? B.akcent : B.seda, whiteSpace: 'nowrap' }}>{t}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: svisle ? '40px 50px' : '40px 80px', marginTop: svisle ? 120 : 110, maxWidth: sirka }}>
        {v.polozky.map((p, i) => {
          const od = krok(i, n, d, 18, 0.6);
          const s = useNastup(f, od);
          const zhasni = v.aktivni < 2 ? plynule(f, [od + 22, od + 40], [1, 0.38]) : 1;
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, width: svisle ? 360 : 300, ...s }}>
              <div style={{ opacity: zhasni }}><Ikona nazev={p.ikona} velikost={(n === 1 ? 160 : 110) * k} barva={B.bila} /></div>
              <span style={{ fontFamily: PISMO, fontWeight: 700, fontSize: (n === 1 ? 56 : 38) * k, color: B.bila, textAlign: 'center', lineHeight: 1.15, whiteSpace: n === 1 ? 'nowrap' : 'normal' }}>{p.text}</span>
            </div>
          );
        })}
      </div>
      {v.pozn && <Pod text={v.pozn} od={Math.round(d * 0.55)} velikost={32} barva={B.seda} />}
    </Plocha>
  );
};

export const SRetez: React.FC<P<'retez'>> = ({ v, d }) => {
  const f = useCurrentFrame();
  const { svisle, k } = useFormat();
  return (
    <AbsoluteFill>
      <Pozadi src={v.src} d={d} tma={0.84} />
      <Plocha styl={{ alignItems: 'center' }}>
        <Nadpis text={v.nadpis} velikost={86} od={2} />
        <div style={{ display: 'flex', flexDirection: svisle ? 'column' : 'row', alignItems: 'center', gap: 26, marginTop: 70 }}>
          {v.kroky.map((t, i) => {
            const od = krok(i, v.kroky.length, d, 16, 0.42);
            const s = useNastup(f, od);
            return (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ opacity: s.opacity, transform: svisle ? 'rotate(90deg)' : undefined }}><Ikona nazev="ArrowRight" velikost={56 * k} barva={B.akcent} tloustka={2.4} /></div>}
                <div style={{ padding: '26px 34px', border: `4px solid ${i === v.kroky.length - 1 ? B.akcent : B.bila}`, fontFamily: PISMO, fontWeight: 700, fontSize: 42 * k, color: B.bila, background: 'rgba(31,35,40,0.7)', textAlign: 'center', ...s }}>{t}</div>
              </React.Fragment>
            );
          })}
        </div>
        {v.pozn && <Pod text={v.pozn} od={Math.round(d * 0.62)} velikost={36} barva={B.akcent} />}
      </Plocha>
    </AbsoluteFill>
  );
};

export const SZpravy: React.FC<P<'zpravy'>> = ({ v, d }) => {
  const f = useCurrentFrame();
  const { svisle, k } = useFormat();
  const tres = Math.sin(f * 1.7) * plynule(f, [d * 0.5, d * 0.6], [0, 3]) * plynule(f, [d * 0.6, d * 0.9], [1, 0]);
  return (
    <Plocha styl={{ alignItems: 'center' }}>
      <div style={{ width: svisle ? 760 : 640, height: svisle ? 900 : 760, border: `6px solid ${B.sedaTmava}`, borderRadius: 56, background: '#15181c', padding: '70px 34px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 22, transform: `translateX(${tres}px)`, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', width: 120, height: 14, borderRadius: 7, background: B.sedaTmava }} />
        {v.zpravy.map((z, i) => {
          const od = krok(i, v.zpravy.length, d, 4, 0.55);
          const s = useNastup(f, od, 10);
          return (
            <div key={i} style={{ alignSelf: 'flex-start', maxWidth: '88%', padding: '22px 28px', borderRadius: '28px 28px 28px 6px', background: B.tmava2, color: B.bila, fontFamily: PISMO, fontWeight: 700, fontSize: 40 * k, lineHeight: 1.2, ...s }}>{z}</div>
          );
        })}
      </div>
      <div style={{ marginTop: 34 }}><Stitek text={v.stitek} svetly /></div>
    </Plocha>
  );
};

export const SDveZdi: React.FC<P<'dvezdi'>> = ({ d }) => {
  const f = useCurrentFrame();
  const { svisle, k } = useFormat();
  const z1 = plynule(f, [d * 0.25, d * 0.33], [0, 1]);
  const z2 = plynule(f, [d * 0.36, d * 0.44], [0, 1]);
  const okno = plynule(f, [d * 0.66, d * 0.74], [0, 1]);
  const W = svisle ? 900 : 1400;
  const H = svisle ? 560 : 430;
  const zed = (x: number, o: number, popis: string) => (
    <g opacity={o}>
      <rect x={x} y={60} width={46} height={H - 120} fill={B.akcent} />
      <text x={x + 23} y={H - 20} textAnchor="middle" fontFamily={MONO} fontSize={28} fill={B.akcent}>{popis}</text>
    </g>
  );
  return (
    <Plocha styl={{ alignItems: 'center' }}>
      <Nadpis text="Pravidlo dvou zdí" velikost={88} od={2} />
      <svg width={W} height={H} style={{ marginTop: svisle ? 50 : 30 }}>
        <rect x={0} y={60} width={W} height={H - 120} fill="none" stroke={B.sedaTmava} strokeWidth={4} />
        <text x={W * 0.1} y={40} textAnchor="middle" fontFamily={MONO} fontSize={30} fill={B.seda}>ULICE</text>
        {zed(W * 0.22, z1, '1. zeď')}
        {zed(W * 0.48, z2, '2. zeď')}
        <g transform={`translate(${W * 0.74}, ${H / 2 - 70})`} opacity={plynule(f, [6, 18], [0, 1])}>
          <circle cx={40} cy={20} r={20} fill={B.bila} />
          <rect x={18} y={48} width={44} height={86} rx={20} fill={B.bila} />
          <text x={40} y={190} textAnchor="middle" fontFamily={MONO} fontSize={30} fill={B.bila}>VY</text>
        </g>
        <g opacity={okno}>
          <rect x={W - 40} y={H / 2 - 90} width={26} height={180} fill="#5b6b78" />
          <line x1={W - 70} y1={H / 2 - 110} x2={W + 0} y2={H / 2 + 110} stroke={B.bila} strokeWidth={6} />
          <text x={W - 30} y={H / 2 + 150} textAnchor="end" fontFamily={MONO} fontSize={26} fill={B.bila}>OKNO</text>
        </g>
      </svg>
      <Pod text="Aspoň dvě zdi mezi vámi a ulicí. Pryč od oken." od={Math.round(d * 0.7)} velikost={40 * k} />
    </Plocha>
  );
};

export const SKarty: React.FC<P<'karty'>> = ({ d }) => {
  const f = useCurrentFrame();
  const { svisle, k } = useFormat();
  return (
    <Plocha styl={{ alignItems: 'center' }}>
      <Nadpis text="Šest triků. Šest otázek." velikost={86} od={2} />
      <div style={{ display: 'grid', gridTemplateColumns: svisle ? '1fr 1fr' : '1fr 1fr 1fr', gap: 26, marginTop: 60, width: svisle ? '100%' : 1400 }}>
        {TECHNIKY.map((t, i) => {
          const od = krok(i, 6, d, 18, 0.6);
          const o = plynule(f, [od, od + 12], [0, 1]);
          return (
            <div key={i} style={{ padding: '30px 30px', border: `4px solid ${B.akcent}`, background: 'rgba(200,245,96,0.06)', opacity: o, transform: `perspective(800px) rotateY(${(1 - o) * 80}deg)` }}>
              <div style={{ fontFamily: MONO, fontSize: 28 * k, color: B.akcent }}>0{i + 1}</div>
              <div style={{ fontFamily: PISMO, fontWeight: 700, fontSize: 42 * k, color: B.bila, marginTop: 8 }}>{t}</div>
            </div>
          );
        })}
      </div>
    </Plocha>
  );
};

export const SKarta: React.FC<P<'karta'>> = ({ v, d }) => {
  const f = useCurrentFrame();
  const { svisle, k } = useFormat();
  const priklad = useNastup(f, 14);
  const otazka = useNastup(f, Math.round(d * 0.45));
  return (
    <Plocha styl={{ alignItems: svisle ? 'stretch' : 'center' }}>
      <div style={{ width: svisle ? '100%' : 1400 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Stitek text={`Trik ${v.cislo} / 6`} svetly />
        </div>
        <div style={{ marginTop: 26 }}><Nadpis text={v.technika} zarovnat="left" velikost={96} od={2} /></div>
        <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 12, ...priklad }}>
          <span style={{ fontFamily: MONO, fontSize: 24 * k, color: B.seda, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Vymyšlený příklad</span>
          <div style={{ alignSelf: 'flex-start', padding: '24px 32px', borderRadius: '28px 28px 28px 6px', background: B.tmava2, color: B.bila, fontFamily: PISMO, fontSize: 44 * k, fontStyle: 'italic', lineHeight: 1.25 }}>„{v.priklad}“</div>
        </div>
        <div style={{ marginTop: 44, display: 'flex', alignItems: 'center', gap: 26, padding: '28px 36px', background: B.akcent, color: B.tmava, ...otazka }}>
          <Ikona nazev="CircleHelp" velikost={60 * k} barva={B.tmava} tloustka={2.2} />
          <span style={{ fontFamily: PISMO, fontWeight: 700, fontSize: 50 * k, lineHeight: 1.15 }}>{v.otazka}</span>
        </div>
      </div>
    </Plocha>
  );
};

export const SKrok: React.FC<P<'krok'>> = ({ v }) => {
  const f = useCurrentFrame();
  const { svisle, k } = useFormat();
  const pruh = plynule(f, [0, 16], [0, 1]);
  const url = useNastup(f, 34);
  return (
    <Plocha styl={{ alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: svisle ? 34 : 50, width: '100%' }}>
        <div style={{ width: 18, background: B.akcent, transform: `scaleY(${pruh})`, transformOrigin: 'top', flexShrink: 0 }} />
        <div>
          <span style={{ fontFamily: MONO, fontWeight: 600, fontSize: 34 * k, color: B.akcent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Krok na dnes</span>
          <div style={{ marginTop: 26 }}><Nadpis text={v.text} zarovnat="left" velikost={svisle ? 84 : 88} od={8} /></div>
          <div style={{ marginTop: 60, display: 'flex', alignItems: 'center', gap: 22, ...url }}>
            <div style={{ width: 44 * k, height: 44 * k, background: B.akcent }} />
            <span style={{ fontFamily: PISMO, fontWeight: 700, fontSize: 52 * k, color: B.bila }}>vimecodelat.cz</span>
          </div>
          <div style={{ marginTop: 14, fontFamily: MONO, fontSize: 28 * k, color: B.seda, ...url }}>{v.odkaz.replace('vimecodelat.cz', '')}</div>
        </div>
      </div>
    </Plocha>
  );
};

export const Scena: React.FC<{ v: Vizual; d: number }> = ({ v, d }) => {
  switch (v.typ) {
    case 'nadpis': return <SNadpis v={v} d={d} />;
    case 'obraz': return <SObraz v={v} d={d} />;
    case 'ikony': return <SIkony v={v} d={d} />;
    case 'seznam': return <SSeznam v={v} d={d} />;
    case 'fakta': return <SFakta v={v} d={d} />;
    case 'srovnani': return <SSrovnani v={v} d={d} />;
    case 'plan': return <SPlan v={v} d={d} />;
    case 'osa': return <SOsa v={v} d={d} />;
    case 'retez': return <SRetez v={v} d={d} />;
    case 'zpravy': return <SZpravy v={v} d={d} />;
    case 'dvezdi': return <SDveZdi v={v} d={d} />;
    case 'karty': return <SKarty v={v} d={d} />;
    case 'karta': return <SKarta v={v} d={d} />;
    case 'krok': return <SKrok v={v} d={d} />;
  }
};
