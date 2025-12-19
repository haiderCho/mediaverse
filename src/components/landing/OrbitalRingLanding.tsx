import React, { useState } from 'react';
import { PAGE_THEMES } from '../../constants';
import { PageId } from '../../types';
import Starfield from '../Starfield';


interface OrbitalRingLandingProps {
  onNavigate: (id: PageId) => void;
}

// Categories arranged in orbital positions
const ORBITAL_ITEMS: PageId[] = [
  PageId.ANIME_SERIES,
  PageId.ANIME_MOVIES,
  PageId.MOVIES,
  PageId.TV_SERIES,
  PageId.DRAMA,
  PageId.MANGA,
  PageId.MANHWA,
  PageId.MANHUA,
  PageId.COMIC,
  PageId.BOOKS,
  PageId.LIGHT_NOVEL,
  PageId.GAMES,
  PageId.MUSIC,
];

/**
 * Orbital Ring Landing - Circular cosmic dashboard (static version, no rotation)
 */
const OrbitalRingLanding: React.FC<OrbitalRingLandingProps> = ({ onNavigate }) => {
  const [hoveredId, setHoveredId] = useState<PageId | null>(null);
  const [isCentralHovered, setIsCentralHovered] = useState(false);

  const radius = 280; // Orbital radius - larger
  const itemCount = ORBITAL_ITEMS.length;
  
  const TrackersIcon = PAGE_THEMES[PageId.TRACKERS].icon;

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative">
      {/* Animated Starfield background */}
      <Starfield />

      {/* Orbital rings (decorative) */}
      <div className="absolute w-[650px] h-[650px] rounded-full border border-slate-800/30" />
      <div className="absolute w-[500px] h-[500px] rounded-full border border-purple-500/10" />

      {/* Central Hub (Profile) */}
      <div className="absolute z-20 flex flex-col items-center justify-center" style={{ width: 0, height: 0 }}>
        <button
          onClick={() => onNavigate(PageId.PROFILE)}
          onMouseEnter={() => setIsCentralHovered(true)}
          onMouseLeave={() => setIsCentralHovered(false)}
          className={`
            w-32 h-32 rounded-full bg-slate-900 border border-slate-700
            flex items-center justify-center shadow-2xl shadow-purple-500/10
            transition-all duration-300 ease-out z-50
            ${isCentralHovered ? 'scale-110 shadow-purple-500/30 border-purple-500/50' : 'scale-100'}
          `}
        >
          <div className="w-28 h-28 rounded-full bg-slate-950 flex flex-col items-center justify-center">
            {isCentralHovered ? (
               <span className="text-sm font-black text-white tracking-widest animate-pulse">
                MEDIAVERSE
              </span>
            ) : (
              <>
                <span className="text-2xl font-black text-white">MY</span>
                <span className="text-xs text-zinc-500 font-mono tracking-widest group-hover:text-white">
                  PROFILE
                </span>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Orbital Items - Static positions */}
      <div className="relative w-[600px] h-[600px] pointer-events-none">
        {ORBITAL_ITEMS.map((id, index) => {
          const theme = PAGE_THEMES[id];
          const Icon = theme.icon;
          const angle = (360 / itemCount) * index - 90; // Start from top
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const isHovered = hoveredId === id;

          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`
                absolute w-20 h-20 rounded-full flex items-center justify-center pointer-events-auto
                transition-all duration-200
                ${isHovered ? 'scale-125 z-30' : 'scale-100 z-10'}
              `}
              style={{
                left: `calc(50% + ${x}px - 40px)`,
                top: `calc(50% + ${y}px - 40px)`,
                background: `radial-gradient(circle, ${theme.accentColorDark}30, ${theme.accentColorDark}10)`,
                border: `2px solid ${theme.accentColorDark}`,
                boxShadow: isHovered 
                  ? `0 0 30px ${theme.accentColorDark}`
                  : `0 0 10px ${theme.accentColorDark}20`,
              }}
            >
              <Icon size={32} style={{ color: theme.accentColorDark }} />
              
              {/* Label on hover */}
              {isHovered && (
                <span 
                  className="absolute -bottom-8 whitespace-nowrap text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-slate-900/95"
                  style={{ color: theme.accentColorDark }}
                >
                  {theme.title}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Trackers Button - Bottom Right Corner */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => onNavigate(PageId.TRACKERS)}
          className="
            flex flex-col items-center gap-2 group
            text-slate-500 hover:text-violet-400 transition-colors duration-300
          "
        >
          <div className="w-12 h-12 rounded-full border border-slate-800 bg-slate-900/90 flex items-center justify-center group-hover:border-violet-500/50 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
            <TrackersIcon size={20} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-70 group-hover:opacity-100">
            Trackers
          </span>
        </button>
      </div>
    </div>
  );
};

export default OrbitalRingLanding;
