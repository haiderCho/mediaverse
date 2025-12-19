import React, { useState, useRef } from 'react';
import { PAGE_THEMES } from '../../constants';
import { PageId } from '../../types';

interface FloatingCardsLandingProps {
  onNavigate: (id: PageId) => void;
}

// Cards arranged for the floating layout
const CARD_ITEMS: PageId[] = [
  PageId.PROFILE,
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
  PageId.TRACKERS,
];

/**
 * Floating Cards Landing - Glassmorphism 3D cards
 */
const TiltCard = ({ id, index, onNavigate }: { id: PageId; index: number; onNavigate: (id: PageId) => void }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);
  const theme = PAGE_THEMES[id];
  const Icon = theme.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (limit to +/- 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const verticalOffset = index % 2 === 0 ? 'translate-y-0' : 'translate-y-12';

  return (
    <button
      ref={cardRef}
      onClick={() => onNavigate(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative w-full aspect-[3/4] rounded-xl transition-all duration-300 ease-out ${verticalOffset}`}
      style={{
        transform: `perspective(1000px) rotateX(${isHovered ? rotation.x : 0}deg) rotateY(${isHovered ? rotation.y : 0}deg) scale(${isHovered ? 1.05 : 1})`,
        zIndex: isHovered ? 50 : 10,
      }}
    >
      {/* Neon Glow beneath */}
      <div 
        className={`absolute inset-4 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
        style={{ background: theme.accentColorDark }}
      />

      {/* Glass Card */}
      <div 
        className={`
          absolute inset-0 rounded-xl backdrop-blur-md border border-white/10
          bg-gradient-to-br from-white/10 to-white/5
          flex flex-col items-center justify-center p-6 gap-4
          transition-all duration-300
          ${isHovered ? 'border-white/30 shadow-2xl' : 'shadow-lg'}
        `}
        style={{
          boxShadow: isHovered 
            ? `0 20px 40px -10px ${theme.accentColorDark}40, inset 0 0 20px rgba(255,255,255,0.05)` 
            : '0 10px 20px -10px rgba(0,0,0,0.5)',
        }}
      >
        {/* Holographic Gradient Overlay on Hover */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 bg-gradient-to-tr from-transparent via-white/20 to-transparent transition-opacity duration-300 pointer-events-none"
          style={{ backgroundBlendMode: 'overlay' }}
        />

        {/* Icon Container */}
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300 relative z-10"
          style={{
            border: `1px solid ${isHovered ? theme.accentColorDark : 'rgba(255,255,255,0.1)'}`
          }}
        >
          <Icon size={32} style={{ color: isHovered ? theme.accentColorLight : 'rgba(255,255,255,0.7)' }} />
        </div>

        {/* Text */}
        <div className="text-center relative z-10">
          <h3 className="text-white font-bold tracking-wider text-sm group-hover:scale-105 transition-transform">
            {theme.title}
          </h3>
          <div 
            className="h-0.5 w-0 group-hover:w-full bg-white/50 mx-auto mt-2 transition-all duration-300"
            style={{ backgroundColor: theme.accentColorDark }}
          />
        </div>
      </div>
    </button>
  );
};

const FloatingCardsLanding: React.FC<FloatingCardsLandingProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] overflow-hidden relative">
      {/* Aurora Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-violet-600/30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-cyan-600/30 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full bg-fuchsia-600/20 blur-[100px] animate-[spin_10s_linear_infinite]" />
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full min-h-screen px-4 py-20 flex flex-col items-center">
        <div className="mb-16 text-center pointer-events-none">
           <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-lg">MEDIAVERSE</h1>
           <p className="text-sm text-white/50 tracking-[0.3em] mt-2">INTERACTIVE ARCHIVES</p>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {CARD_ITEMS.map((id, index) => (
            <TiltCard key={id} id={id} index={index} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloatingCardsLanding;
