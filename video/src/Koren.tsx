import React from 'react';
import { Composition } from 'remotion';
import { VIDEA } from './data/videa';
import casovani from './data/casovani.json';
import { VideoKomp, type Casovani } from './komponenty/Video';

const FPS = 30;
const FORMATY = [
  { nazev: '16x9', width: 1920, height: 1080 },
  { nazev: '9x16', width: 1080, height: 1920 },
];

export const Koren: React.FC = () => (
  <>
    {VIDEA.flatMap((video) => {
      const cas = (casovani as Record<string, Casovani>)[video.id];
      if (!cas) return [];
      return FORMATY.map((f) => (
        <Composition
          key={`${video.id}-${f.nazev}`}
          id={`${video.id}-${f.nazev}`}
          component={VideoKomp}
          durationInFrames={Math.round(cas.delka * FPS)}
          fps={FPS}
          width={f.width}
          height={f.height}
          defaultProps={{ video, cas }}
        />
      ));
    })}
  </>
);
