import React, { useState } from 'react';
import { PageId } from '../../types';
import { PAGE_THEMES } from '../../constants';

interface FrequencyLandingProps {
  onNavigate: (id: PageId) => void;
}

const VINYL_ITEMS = [
  PageId.PROFILE,
  PageId.MUSIC,
  PageId.ANIME_SERIES,
  PageId.MOVIES,
  PageId.GAMES,
  PageId.BOOKS,
  PageId.MANGA,
  PageId.TRACKERS,
  // Add others if needed, sticking to 8-12 for visual balance usually, but let's include all main ones
  PageId.COMIC,
  PageId.TV_SERIES,
  PageId.LIGHT_NOVEL,
  PageId.DRAMA
];

/**
 * The Frequency - A Retro Audio/Vinyl interface
 * Items appear as vinyl records in a grid
 */
const FrequencyLanding: React.FC<FrequencyLandingProps> = ({ onNavigate }) => {
  const [hoveredId, setHoveredId] = useState<PageId | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#111] text-[#ff9900] overflow-hidden relative selection:bg-[#ff9900] selection:text-black font-mono">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      {/* Header */}
      <header className="fixed top-8 left-8 z-20 flex items-center gap-4">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]" />
        <h1 className="text-xl tracking-[0.2em] font-bold text-[#ff9900]/80 border-b border-[#ff9900]/30 pb-1">
          FREQUENCY
        </h1>
        <span className="text-xs text-[#ff9900]/50 ml-4">STEREO HI-FI</span>
      </header>

      {/* Main Grid */}
      <div className="container mx-auto px-4 py-32 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {VINYL_ITEMS.map((id, index) => {
            const theme = PAGE_THEMES[id];
            const Icon = theme.icon;
            const isHovered = hoveredId === id;

            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex flex-col items-center gap-6"
              >
                {/* Vinyl Record */}
                <div 
                  className={`
                    relative w-48 h-48 md:w-56 md:h-56 rounded-full 
                    bg-[#1a1a1a] shadow-2xl transition-all duration-700 ease-in-out
                    flex items-center justify-center border-4 border-[#222]
                    group-hover:shadow-[0_0_30px_rgba(255,153,0,0.3)]
                  `}
                >
                  {/* Vinyl Grooves */}
                  <div className="absolute inset-0 rounded-full border-[12px] border-[#000] opacity-80" />
                  <div className="absolute inset-4 rounded-full border border-[#333] opacity-50" />
                  <div className="absolute inset-8 rounded-full border border-[#333] opacity-40" />
                  <div className="absolute inset-12 rounded-full border border-[#333] opacity-30" />
                  
                  {/* Label (Center) */}
                  <div 
                    className={`
                      w-24 h-24 rounded-full flex items-center justify-center
                      transition-transform duration-[3s] linear
                      relative overflow-hidden
                    `}
                    style={{
                      background: isHovered ? theme.accentColorDark : '#2a2a2a',
                      transform: isHovered ? 'rotate(360deg)' : 'rotate(0deg)'
                    }}
                  >
                     <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                     <Icon 
                       size={32} 
                       className={`relative z-10 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-[#ff9900]'}`} 
                     />
                  </div>

                  {/* Shine reflection */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                </div>

                {/* Label Underneath */}
                <div className="text-center">
                  <h3 className={`
                    text-lg font-bold tracking-widest uppercase transition-colors duration-300
                    ${isHovered ? 'text-white' : 'text-[#444]'}
                  `}>
                    {theme.title}
                  </h3>
                  <div className={`
                    h-0.5 w-12 mx-auto mt-2 transition-all duration-300
                    ${isHovered ? 'w-full bg-[#ff9900]' : 'bg-[#333]'}
                  `} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FrequencyLanding;
