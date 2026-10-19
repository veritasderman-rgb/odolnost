import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { Video as VideoData } from '../data/videa';
import { B, MONO, PISMO, plynule, useFormat } from './styl';
import { Scena } from './Sceny';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/400-italic.css';
import '@fontsource/ibm-plex-sans/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/600.css';

export type Casovani = {
  delka: number;
  hlasOd: number;
  sceny: { od: number; do: number }[];
  titulky: { od: number; do: number; text: string }[];
};

export type VideoProps = { video: VideoData; cas: Casovani };

const Prechod: React.FC<{ d: number; children: React.ReactNode }> = ({ d, children }) => {
  const f = useCurrentFrame();
  const o = Math.min(plynule(f, [0, 9], [0, 1]), plynule(f, [d - 9, d], [1, 0]));
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

const Lista: React.FC = () => {
  const { svisle } = useFormat();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: svisle ? 150 : 52, left: svisle ? 70 : 72, right: svisle ? 70 : 72, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 30, height: 30, background: B.akcent }} />
          <span style={{ fontFamily: PISMO, fontWeight: 700, fontSize: 34, color: B.bila }}>Víme, co dělat</span>
        </div>
        <span style={{ fontFamily: MONO, fontSize: 20, letterSpacing: '0.06em', textTransform: 'uppercase', color: B.bila, padding: '6px 12px', border: '1.5px solid rgba(255,255,255,0.55)', background: 'rgba(0,0,0,0.35)' }}>
          Vytvořeno s pomocí AI
        </span>
      </div>
    </AbsoluteFill>
  );
};

const Titulky: React.FC<{ cas: Casovani }> = ({ cas }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { svisle } = useFormat();
  const t = f / fps;
  const cue = cas.titulky.find((c) => t >= c.od && t < c.do);
  if (!cue) return null;
  const o = Math.min(interpolate(t, [cue.od, cue.od + 0.12], [0, 1], { extrapolateRight: 'clamp' }), interpolate(t, [cue.do - 0.12, cue.do], [1, 0], { extrapolateLeft: 'clamp' }));
  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: svisle ? 400 : 64, pointerEvents: 'none' }}>
      <div style={{ maxWidth: svisle ? 940 : 1500, textAlign: 'center', opacity: o }}>
        <span style={{ fontFamily: PISMO, fontWeight: 700, fontSize: svisle ? 50 : 46, lineHeight: 1.42, color: B.bila, background: 'rgba(0,0,0,0.78)', padding: '6px 18px', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>
          {cue.text}
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Jemné pohyblivé pozadí: mřížka teček a pomalu putující světlo v barvě značky.
const Pozadi: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const x = width * (0.3 + 0.25 * Math.sin(f / 240));
  const y = height * (0.35 + 0.2 * Math.cos(f / 300));
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${x}px ${y}px, rgba(200,245,96,0.07), rgba(31,35,40,0) 45%)` }} />
      <AbsoluteFill style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1.6px, transparent 1.6px)', backgroundSize: '44px 44px', backgroundPosition: `${(f * 0.25) % 44}px ${(f * 0.12) % 44}px` }} />
    </AbsoluteFill>
  );
};

const Postup: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames, width } = useVideoConfig();
  return <div style={{ position: 'absolute', left: 0, bottom: 0, height: 8, width: (width * f) / durationInFrames, background: B.akcent }} />;
};

export const VideoKomp: React.FC<VideoProps> = ({ video, cas }) => {
  const { fps, durationInFrames } = useVideoConfig();
  const hudbaHlasitost = video.hlas ? 0.13 : 0.34;
  return (
    <AbsoluteFill style={{ background: B.tmava }}>
      <Pozadi />
      {cas.sceny.map((s, i) => {
        const od = Math.round(s.od * fps);
        const d = Math.round(s.do * fps) - od;
        return (
          <Sequence key={i} from={od} durationInFrames={d} layout="none">
            <Prechod d={d}>
              <Scena v={video.sceny[i].vizual} d={d} />
            </Prechod>
          </Sequence>
        );
      })}
      <Lista />
      <Titulky cas={cas} />
      <Postup />
      {video.hlas && (
        <Sequence from={Math.round(cas.hlasOd * fps)} layout="none">
          <Audio src={staticFile(`audio/hlas/${video.id}.mp3`)} />
        </Sequence>
      )}
      <Audio
        src={staticFile(`audio/hudba/${video.hudba}.mp3`)}
        volume={(f) => hudbaHlasitost * Math.min(interpolate(f, [0, fps * 1.5], [0, 1], { extrapolateRight: 'clamp' }), interpolate(f, [durationInFrames - fps * 2.5, durationInFrames], [1, 0], { extrapolateLeft: 'clamp' }))}
      />
    </AbsoluteFill>
  );
};
