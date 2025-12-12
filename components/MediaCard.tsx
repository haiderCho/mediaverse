import React, { useState } from 'react';
import { MediaEntry, ThemeConfig } from '../types';

interface MediaCardProps {
  entry: MediaEntry;
  theme: ThemeConfig;
  variant?: 'standard' | 'featured';
}

const MediaCard: React.FC<MediaCardProps> = ({ entry, theme, variant = 'standard' }) => {
  const [isHovered, setIsHovered] = useState(false);

  // --- FEATURED (HORIZONTAL) CARD LOGIC ---
  if (variant === 'featured') {
    return (
      <div 
        className="relative group w-full h-auto md:h-64 flex flex-col md:flex-row bg-slate-900/80 border border-slate-700 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:border-opacity-100"
        style={{ borderColor: isHovered ? theme.accentColorDark : '#334155' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section (Left/Top) */}
        <div className="w-full h-48 md:w-1/4 md:h-full relative overflow-hidden shrink-0">
          <img 
            src={entry.coverUrl} 
            alt={entry.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/90 via-transparent to-transparent md:from-transparent md:to-slate-900/90" />
          {/* Top Pick Badge */}
          <div className="absolute top-0 left-0 bg-gradient-to-r from-red-600 to-transparent px-3 py-1 text-white text-[10px] font-bold uppercase tracking-widest">
            Top Pick
          </div>
        </div>

        {/* Info Section (Right/Bottom) */}
        <div className="flex-1 p-4 md:p-6 flex flex-col justify-center relative">
           {/* Background decorative glow */}
           <div 
              className="absolute right-0 top-0 w-64 h-64 opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: theme.accentColorDark }}
           />

           <div className="flex justify-between items-start mb-2">
             <div className="flex flex-col">
                <span className="text-xs text-slate-400 uppercase tracking-widest mb-1">{entry.genre}</span>
                <h2 
                  className="text-xl md:text-3xl font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all"
                  style={{ 
                    fontFamily: theme.fontFamily,
                    backgroundImage: isHovered ? `linear-gradient(to right, #fff, ${theme.accentColorLight})` : 'none'
                  }}
                >
                  {entry.title}
                </h2>
             </div>
             <div className="flex items-center gap-1 bg-slate-800/50 px-3 py-1 rounded-lg border border-slate-700">
               <span className="text-lg md:text-2xl font-black" style={{ color: theme.accentColorDark }}>{entry.myRating}</span>
               <span className="text-[10px] text-slate-500 mt-1 md:mt-2">/10</span>
             </div>
           </div>

           <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 md:line-clamp-4 max-w-2xl font-light">
             "{entry.review}"
           </p>

           <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-4">
              <button 
                className="text-xs px-4 py-2 rounded font-semibold text-black transition-transform active:scale-95"
                style={{ backgroundColor: theme.accentColorDark }}
              >
                Read Full Review
              </button>
              <div className="text-xs text-slate-500 font-mono">ID: {entry.id.split('-').pop()}</div>
           </div>
        </div>
      </div>
    );
  }

  // --- STANDARD CARD LOGIC ---
  
  // Aspect ratio based on theme type for Desktop view
  let aspectClass = 'aspect-[2/3]'; 
  if (theme.id.includes('music')) aspectClass = 'aspect-square';
  if (theme.id.includes('movie') || theme.id.includes('tv') || theme.id.includes('game')) aspectClass = 'aspect-video';

  return (
    <div 
      className="relative group h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 
        -------------------------------------------
        MOBILE VIEW: Horizontal Card (Default view)
        -------------------------------------------
        No hover interaction needed. Shows Image Left | Info Right immediately.
      */}
      <div className="md:hidden flex flex-row h-32 w-full bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-sm hover:bg-slate-800/80 transition-colors">
        {/* Left: Image */}
        <div className="w-28 shrink-0 relative">
            <img 
                src={entry.coverUrl} 
                alt={entry.title} 
                className="w-full h-full object-cover" 
            />
            {/* Rating Overlay on Image */}
            <div className="absolute bottom-0 left-0 w-full bg-black/70 backdrop-blur-sm px-2 py-1">
                <div className="flex items-baseline gap-1 justify-center">
                    <span className="text-sm font-bold text-white">{entry.myRating}</span>
                    <span className="text-[8px] text-slate-400">/10</span>
                </div>
            </div>
        </div>
        
        {/* Right: Info */}
        <div className="flex-1 p-3 flex flex-col justify-center overflow-hidden relative">
            <div className="flex flex-col mb-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">{entry.genre}</span>
                <h3 className="text-sm font-bold text-white truncate leading-tight" style={{fontFamily: theme.fontFamily}}>
                    {entry.title}
                </h3>
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-3 leading-snug font-light border-t border-slate-800 pt-1 mt-1">
                "{entry.review}"
            </p>
            {/* Decorative colored bar */}
            <div className="absolute right-0 top-3 w-1 h-8 rounded-l-full" style={{backgroundColor: theme.accentColorDark}}></div>
        </div>
      </div>


      {/* 
        -------------------------------------------
        DESKTOP VIEW: Vertical Poster + Hover Popup
        -------------------------------------------
      */}
      <div className={`hidden md:block relative w-full ${aspectClass} rounded-lg bg-slate-800 transition-all duration-300`}>
        {/* Base Poster Image */}
        <img 
          src={entry.coverUrl} 
          alt={entry.title} 
          className="w-full h-full object-cover rounded-lg filter transition-all duration-300 group-hover:brightness-50 group-hover:blur-[2px]"
        />
        
        {/* Rating Badge (Base State) */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded border border-slate-600 z-10 group-hover:opacity-0 transition-opacity">
          {entry.myRating}
        </div>

        {/* 
            INTERACTIVE REVIEW POP-UP 
            Appears on Hover. Layout: Image Left | Info Right.
            Positioned centered relative to the card but larger.
        */}
        <div 
            className={`
                absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                w-[160%] min-w-[340px] h-auto min-h-[180px]
                bg-slate-950 rounded-xl shadow-2xl border border-slate-700
                overflow-hidden transition-all duration-300 ease-out origin-center
                flex flex-row
                ${isHovered ? 'opacity-100 scale-100 visible pointer-events-auto' : 'opacity-0 scale-95 invisible pointer-events-none'}
            `}
            style={{ 
                boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 1), 0 0 25px ${theme.accentColorDark}20`,
                borderColor: theme.accentColorDark
            }}
        >
            {/* Popup Left: Cover Art */}
            <div className="w-[35%] relative shrink-0">
                <img 
                    src={entry.coverUrl} 
                    alt={entry.title} 
                    className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950" />
            </div>

            {/* Popup Right: Info & Review */}
            <div className="flex-1 p-4 flex flex-col justify-center bg-slate-950 relative">
                 {/* Header */}
                 <div className="flex justify-between items-start mb-2">
                     <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-slate-400 mb-0.5">{entry.genre}</span>
                        <h3 
                            className="text-base font-bold text-white leading-tight"
                            style={{ fontFamily: theme.fontFamily }}
                        >
                            {entry.title}
                        </h3>
                     </div>
                     <div className="flex flex-col items-center justify-center bg-slate-900 rounded p-1 ml-2 border border-slate-800">
                        <span className="text-base font-black leading-none" style={{ color: theme.accentColorDark }}>{entry.myRating}</span>
                        <span className="text-[8px] text-slate-500 leading-none">/10</span>
                     </div>
                 </div>

                 {/* Review Text */}
                 <div className="relative">
                    <span className="absolute -left-2 -top-1 text-2xl text-slate-700 opacity-50 font-serif">“</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans line-clamp-4 pl-1">
                        {entry.review}
                    </p>
                    <span className="absolute -bottom-3 right-0 text-2xl text-slate-700 opacity-50 font-serif leading-none">”</span>
                 </div>
                 
                 {/* Action Hint */}
                 <div className="mt-3 pt-2 border-t border-slate-900 flex justify-end">
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Click for details</span>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;