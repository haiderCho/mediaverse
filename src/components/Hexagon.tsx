import React, { useState } from 'react';
import { PageId } from '../types';
import { PAGE_THEMES } from '../constants';

interface HexagonProps {
  pageId: PageId | null;
  onClick: (id: PageId) => void;
}

const Hexagon: React.FC<HexagonProps> = ({ pageId, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Dimensions for Pointy Topped Hexagon (Width < Height)
  // Mobile: Smaller, Desktop: Standard
  const containerClass = "w-24 h-28 md:w-32 md:h-36 mx-1 -mt-6 md:-mt-8 md:mx-1 flex items-center justify-center";

  if (!pageId) {
    // Render an empty placeholder to maintain grid structure
    return <div className={`${containerClass} opacity-0 pointer-events-none`} />;
  }

  const theme = PAGE_THEMES[pageId];
  const Icon = theme.icon;

  return (
    <div 
      className={`${containerClass} group relative cursor-pointer z-0 hover:z-50 transition-all duration-300 ease-out`}
      onClick={() => onClick(pageId)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'scale(1.15) translateY(-8px) rotateX(5deg)' : 'scale(1)',
        filter: isHovered ? `drop-shadow(0 0 30px ${theme.accentColorDark}) drop-shadow(0 10px 20px rgba(0,0,0,0.8))` : 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))',
        perspective: '1000px'
      }}
    >
      {/* 
        Spaceship Panel Border Effect 
        Animated rotating gradient border simulating energy field
      */}
      <div 
        className="absolute inset-[-2px] hex-shape transition-all duration-300"
        style={{
            background: isHovered 
                ? `conic-gradient(from 0deg, ${theme.accentColorDark}, ${theme.accentColorLight}, #fff, ${theme.accentColorLight}, ${theme.accentColorDark})`
                : `linear-gradient(135deg, ${theme.accentColorDark}40, #1e293b)`,
            opacity: isHovered ? 1 : 0.8, // Increased opacity for mobile default
            animation: isHovered ? 'spin 3s linear infinite' : 'none',
            boxShadow: isHovered ? `inset 0 0 20px ${theme.accentColorDark}50` : `inset 0 0 10px ${theme.accentColorDark}20` // Default glow
        }}
      />
      
      {/* Metallic Border Base */}
      <div 
        className="absolute inset-0 hex-shape transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, #475569 0%, #1e293b 50%, #0f172a 100%)`,
        }}
      />

      {/* Inner Content Hex - Spaceship Panel */}
      <div 
        className="absolute inset-[2px] hex-shape bg-slate-900/95 backdrop-blur-md transition-all duration-300 flex items-center justify-center overflow-hidden"
        style={{
          boxShadow: `inset 0 0 30px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.1)`
        }}
      >
         {/* Scanline Effect */}
         <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
          }}
        />

         {/* Energy Pulse Effect */}
         <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <div 
            className="absolute inset-0 animate-pulse"
            style={{ 
              background: `radial-gradient(circle at center, ${theme.accentColorDark}15 0%, transparent 70%)`,
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          />
        </div>

        {/* Corner Brackets - Tech Panel Style */}
        <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          {/* Top Left */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: theme.accentColorDark }} />
          {/* Top Right */}
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: theme.accentColorDark }} />
          {/* Bottom Left */}
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: theme.accentColorDark }} />
          {/* Bottom Right */}
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: theme.accentColorDark }} />
        </div>

        {/* Holographic Shine */}
         <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/20 via-transparent to-purple-400/20"
          style={{ 
            transform: isHovered ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.8s ease-out'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-2 text-slate-300 group-hover:text-white transition-all duration-300">
          <Icon 
            size={isHovered ? 34 : 26} 
            className="mb-1 md:mb-2 transition-all duration-300 transform group-hover:-translate-y-1" 
            style={{ 
              color: isHovered ? '#fff' : theme.accentColorDark,
              filter: isHovered ? `drop-shadow(0 0 12px ${theme.accentColorLight}) drop-shadow(0 0 6px #fff)` : 'none'
            }} 
          />
          <span 
            className="text-[0.6rem] md:text-[0.7rem] font-bold uppercase tracking-[0.15em] leading-none"
            style={{ 
              fontFamily: '"Orbitron", sans-serif',
              textShadow: isHovered ? `0 0 10px ${theme.accentColorDark}, 0 0 5px #fff` : 'none',
              letterSpacing: '0.15em'
            }}
          >
            {theme.title}
          </span>

          {/* Status Indicator */}
          <div className="mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div 
              className="w-1 h-1 rounded-full animate-pulse"
              style={{ backgroundColor: theme.accentColorDark }}
            />
            <span className="text-[0.4rem] font-mono tracking-wider" style={{ color: theme.accentColorDark }}>
              READY
            </span>
          </div>
        </div>
      </div>
      
      {/* Add global style for animations */}
      <style>{`
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes scan {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default Hexagon;