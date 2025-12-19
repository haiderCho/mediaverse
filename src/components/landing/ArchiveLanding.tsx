import React, { useState } from 'react';
import { PageId } from '../../types';
import { PAGE_THEMES } from '../../constants';

interface ArchiveLandingProps {
  onNavigate: (id: PageId) => void;
}

// Group items onto "shelves" logic
const SHELF_1 = [PageId.PROFILE, PageId.TRACKERS];
const SHELF_2 = [
  PageId.ANIME_SERIES, PageId.ANIME_MOVIES, PageId.MOVIES, PageId.TV_SERIES, PageId.DRAMA,
  PageId.MANGA, PageId.MANHWA, PageId.MANHUA, PageId.COMIC, PageId.BOOKS, PageId.LIGHT_NOVEL,
  PageId.GAMES, PageId.MUSIC
];

const SHELVES = [SHELF_1, SHELF_2];

// Categories marked as "Large" (others are Small)
const LARGE_ITEMS = [
  PageId.PROFILE,
  PageId.ANIME_SERIES,
  PageId.MOVIES,
  PageId.TV_SERIES,
  PageId.MANGA,
  PageId.COMIC,
  PageId.BOOKS,
  PageId.GAMES,
  PageId.MUSIC
];

/**
 * The Archive - A cozy library interface
 * Items appear as book spines on shelves
 */
const ArchiveLanding: React.FC<ArchiveLandingProps> = ({ onNavigate }) => {
  const [hoveredData, setHoveredData] = useState<{ shelf: number; index: number } | null>(null);

  const renderBook = (id: PageId, index: number, shelfIndex: number) => {
    const theme = PAGE_THEMES[id];
    const isHovered = hoveredData?.shelf === shelfIndex && hoveredData?.index === index;
    
    // Size logic
    const isLarge = LARGE_ITEMS.includes(id);
    const baseHeight = isLarge ? 300 : 220;
    const baseWidth = isLarge ? 60 : 44;

    // Add randomness to dimensions for realism
    const height = baseHeight + (index * 40 % 30); 
    const width = baseWidth + (index * 15 % 10);
    
    const color = theme.accentColorDark; 

    return (
      <button
        key={id}
        onClick={() => onNavigate(id)}
        onMouseEnter={() => setHoveredData({ shelf: shelfIndex, index })}
        onMouseLeave={() => setHoveredData(null)}
        className="relative group transition-all duration-300 ease-out origin-bottom"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: isHovered ? 'translateY(-20px) scale(1.05)' : 'translateY(0)',
          zIndex: isHovered ? 50 : 10 - index,
        }}
      >
        {/* Book Spine */}
        <div 
          className="w-full h-full rounded-sm shadow-xl flex flex-col items-center justify-between py-4 overflow-hidden border-l border-white/5 relative"
          style={{
            background: `linear-gradient(90deg, #2c2018 0%, ${color}20 20%, #2c2018 100%)`, 
            boxShadow: isHovered ? `0 10px 30px -5px ${color}60` : '5px 0 15px -5px rgba(0,0,0,0.8)',
            backgroundColor: '#261a15'
          }}
        >
          {/* Spine Top: Icon */}
          <div className="w-full h-12 border-t font-serif border-b border-[#c9a980]/30 flex items-center justify-center mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
             <theme.icon size={18} color={isHovered ? theme.accentColorLight : '#8c735a'} />
          </div>

          {/* Vertical Title - Rotated 90deg for Top-to-Bottom reading */}
          <div className="flex-1 flex items-center justify-center w-full relative overflow-hidden">
            <h3 
              className="absolute whitespace-nowrap font-bold tracking-widest uppercase transition-colors duration-300"
              style={{ 
                fontSize: '14px', 
                color: isHovered ? '#fff' : '#a89078',
                textShadow: isHovered ? `0 0 10px ${color}` : 'none',
                transform: 'rotate(90deg)',
                width: `${height - 90}px`, // Ensure it fits the vertical space properly
                textAlign: 'center'
              }}
            >
              {theme.title}
            </h3>
          </div>

          {/* Bottom spacing / decorative element */}
          <div className="h-8 w-full border-t border-white/5 mt-auto" />
          
          {/* Glow Overlay */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${color}, transparent)` }}
          />
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1510] text-[#e0d0b0] font-serif overflow-hidden relative selection:bg-amber-900 selection:text-white">
      {/* Ambient Lighting & Dust */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,rgba(255,200,100,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center py-12 border-b border-[#3d2e20]">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#c9a980] mb-2 drop-shadow-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
          MEDIAVERSE
        </h1>
        <p className="text-[#8c735a] italic tracking-widest text-lg">The Archive</p>
      </header>

      {/* Shelves Container */}
      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10 flex flex-col gap-16">
        
        {SHELVES.map((shelfItems, shelfIndex) => (
          <div key={shelfIndex} className="relative">
            {/* The Shelf Surface */}
            <div className="absolute bottom-0 left-[-5%] right-[-5%] h-8 bg-[#2a1d15] shadow-2xl rounded-sm transform skew-x-[-10deg] origin-bottom-left border-t border-[#3e2b20]" />
            <div className="absolute bottom-[-10px] left-[-5%] right-[-5%] h-4 bg-[#18100c] transform skew-x-[-10deg] origin-bottom-left blur-sm" />

            {/* Books Row */}
            <div className="flex items-end justify-center px-4 md:px-12 gap-1 md:gap-2 pb-8 h-[360px]">
              {shelfItems.map((id, index) => renderBook(id, index, shelfIndex))}
            </div>
            
            {/* No Label */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchiveLanding;
