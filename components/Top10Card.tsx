import React, { useState } from 'react';
import { PageId, MediaEntry } from '../types';
import { PAGE_THEMES } from '../constants';
import { Star, Trophy, Zap, Bookmark, Clapperboard, Film, Gamepad2, ChevronRight, Quote } from 'lucide-react';

interface Top10CardProps {
  entry: MediaEntry;
  rank: number;
  pageId: PageId;
}

const Top10Card: React.FC<Top10CardProps> = ({ entry, rank, pageId }) => {
  const theme = PAGE_THEMES[pageId];
  const [isHovered, setIsHovered] = useState(false);

  // --- STYLE SELECTION ---
  const isOtaku = [PageId.ANIME_SERIES, PageId.ANIME_MOVIES, PageId.MANGA, PageId.MANHWA, PageId.MANHUA, PageId.COMIC].includes(pageId);
  const isCinematic = [PageId.MOVIES, PageId.TV_SERIES, PageId.DRAMA].includes(pageId);
  const isLiterary = [PageId.BOOKS, PageId.LIGHT_NOVEL].includes(pageId);
  const isGamer = [PageId.GAMES].includes(pageId);

  // --- OSAKU STYLE (Anime/Manga) ---
  if (isOtaku) {
    return (
      <div
        className="relative group rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered 
            ? `0 0 20px ${theme.accentColorDark}40, 0 10px 40px -10px rgba(0,0,0,0.5)` 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Neon Border Gradient */}
        <div 
            className="absolute inset-0 p-[1px] rounded-xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
            style={{
                backgroundImage: isHovered 
                    ? `linear-gradient(135deg, ${theme.accentColorDark}, ${theme.accentColorLight}, ${theme.accentColorDark})`
                    : `linear-gradient(135deg, ${theme.accentColorDark}40, rgba(30, 41, 59, 0.5))`
            }}
        >
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl rounded-xl" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex h-40 sm:h-44 p-3 gap-4">
             {/* Rank - Large Background Detail */}
             <div 
                className="absolute -bottom-6 -right-2 text-[120px] font-black leading-none opacity-5 pointer-events-none select-none transition-opacity duration-300 group-hover:opacity-10"
                style={{ 
                    fontFamily: theme.fontFamily,
                    color: theme.accentColorDark
                }}
            >
                {rank}
            </div>

            {/* Poster Art */}
            <div className="w-28 sm:w-32 shrink-0 relative rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                <img 
                    src={entry.coverUrl} 
                    alt={entry.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                
                {/* Rank Badge (Mobile/Small) */}
                <div 
                    className="absolute top-0 left-0 px-2 py-1 text-xs font-black text-black backdrop-blur-md"
                    style={{ backgroundColor: theme.accentColorDark }}
                >
                    #{rank}
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col pt-1 pb-1 pr-2 relative">
                <div className="flex justify-between items-start mb-1">
                    <span 
                        className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-slate-700 text-slate-400 group-hover:border-slate-500 group-hover:text-slate-200 transition-colors"
                    >
                        {entry.genre}
                    </span>
                    <div className="flex items-center gap-1.5 bg-slate-900/50 px-2 py-0.5 rounded-full border border-slate-800">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-bold text-white">{entry.myRating}</span>
                    </div>
                </div>

                <h3 
                    className="text-lg sm:text-xl font-black leading-tight mb-2 text-white line-clamp-2"
                    style={{ 
                        fontFamily: theme.fontFamily,
                        textShadow: isHovered ? `0 0 10px ${theme.accentColorDark}40` : 'none'
                    }}
                >
                    {entry.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed opacity-80 mb-auto">
                    {entry.review}
                </p>

                {/* Bottom Action Area */}
                <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-2">
                    <span className="text-[10px] text-slate-600 font-mono">ID: {entry.id.split('-').pop()}</span>
                    
                    <button 
                        className="group/btn flex items-center gap-1 text-xs font-bold transition-all"
                        style={{ color: theme.accentColorDark }}
                    >
                        <span className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300">View</span>
                        <div className="p-1 rounded-full bg-slate-800 group-hover/btn:bg-slate-700">
                            <ChevronRight size={14} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // --- CINEMATIC STYLE (Movies/TV) ---
  if (isCinematic) {
    return (
      <div
        className="relative group rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Full Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
                src={entry.coverUrl} 
                alt={entry.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:blur-[2px] group-hover:brightness-50" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        {/* Cinematic Golden Border on Hover */}
        <div className={`absolute inset-0 border border-transparent transition-colors duration-500 z-20 pointer-events-none ${isHovered ? 'border-yellow-500/30' : ''}`} />

        <div className="relative z-10 p-5 h-48 md:h-56 flex flex-col justify-end">
            {/* Rank Badge - Floating "Award" Style */}
            <div className="absolute top-4 right-4 flex flex-col items-center">
                <div className="relative">
                    <Trophy size={32} className="text-yellow-500 drop-shadow-lg" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[10px] font-black text-black">
                        {rank}
                    </span>
                </div>
            </div>

            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    <Clapperboard size={14} className="text-slate-400" />
                    <span className="text-xs text-slate-300 uppercase tracking-widest">{entry.genre}</span>
                </div>

                <h3 
                    className="text-2xl font-bold text-white mb-2 leading-none drop-shadow-md"
                    style={{ fontFamily: theme.fontFamily }}
                >
                    {entry.title}
                </h3>

                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                    <div className="flex items-center gap-3 text-xs text-slate-300 mb-2">
                        <div className="flex items-center gap-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} fill={i < Math.round(entry.myRating / 2) ? "currentColor" : "none"} />
                            ))}
                        </div>
                        <span className="font-mono">{entry.myRating}/10</span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 font-light opacity-90">
                        "{entry.review}"
                    </p>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // --- LITERARY STYLE (Books) ---
  if (isLiterary) {
    return (
        <div 
            className="group relative bg-[#1e1c1a] rounded-r-md border-l-4 shadow-md transition-all duration-300 hover:translate-x-1 hover:shadow-xl flex overflow-hidden h-40 md:h-44"
            style={{ borderColor: theme.accentColorDark }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }} 
            />

            {/* Rank - Bookmark Style */}
            <div className="absolute -top-1 right-4 w-8 h-12 bg-red-800 shadow-lg flex items-end justify-center pb-1 z-20 transition-transform duration-300 group-hover:-translate-y-1"
                 style={{ backgroundColor: theme.accentColorDark, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}>
                 <span className="text-white font-serif font-bold text-lg">{rank}</span>
            </div>

            {/* Book Spine (Image) */}
            <div className="w-28 md:w-32 shrink-0 relative shadow-[5px_0_15px_rgba(0,0,0,0.5)] z-10">
                 <img 
                    src={entry.coverUrl} 
                    alt={entry.title} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content - Typography Focused */}
            <div className="flex-1 p-5 pr-14 flex flex-col justify-center">
                 <div className="flex items-center gap-2 mb-2">
                    <Bookmark size={14} className="text-slate-500" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{entry.genre}</span>
                 </div>

                 <h3 className="text-xl font-serif text-white mb-2 leading-tight" style={{ fontFamily: '"Goudy Bookletter 1911", serif' }}>
                    {entry.title}
                 </h3>

                 <div className="relative pl-4 border-l border-slate-700">
                    <p className="text-xs text-slate-400 font-serif italic line-clamp-2">
                        "{entry.review}"
                    </p>
                 </div>
                 
                 <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-[10px] text-slate-500">Use Rating: <span className="text-white">{entry.myRating}/10</span></div>
                    <ChevronRight size={14} className="text-slate-400" />
                 </div>
            </div>
        </div>
    );
  }

  // --- GAMER STYLE (Games) ---
  if (isGamer) {
    return (
        <div 
            className="group relative h-48 bg-black border border-slate-800 overflow-hidden transition-all duration-200 hover:border-green-500/50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
            }}
        >
            {/* Hex Grid Background on Hover */}
            <div 
                className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10`}
            />
             <div 
                className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-20' : 'opacity-0'}`}
                style={{ 
                    backgroundImage: `radial-gradient(${theme.accentColorDark} 1px, transparent 1px)`, 
                    backgroundSize: '20px 20px' 
                }} 
            />

            <div className="absolute inset-0 flex">
                {/* Image Area - Scanning Effect */}
                <div className="w-[40%] relative overflow-hidden border-r border-slate-800 group-hover:border-green-500/30 transition-colors">
                    <img 
                        src={entry.coverUrl} 
                        alt={entry.title} 
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div className={`absolute top-0 left-0 w-full h-[2px] bg-green-400 shadow-[0_0_10px_#4ade80] animate-[scan_2s_linear_infinite] ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                    
                    {/* Rank Hexagon */}
                    <div className="absolute top-2 left-2 bg-black/80 border border-green-500/50 backdrop-blur p-2 w-10 h-10 flex items-center justify-center font-mono font-bold text-green-400"
                         style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                        {rank}
                    </div>
                </div>

                {/* HUD Content Area */}
                <div className="flex-1 p-4 relative font-mono text-xs text-slate-300">
                    <div className="flex justify-between items-start border-b border-slate-800 pb-2 mb-2 group-hover:border-green-500/30">
                        <span className="text-[10px] text-green-500/70 uppercase">SYS.ID: {entry.id.split('-').pop()}</span>
                        <Gamepad2 size={14} className={`${isHovered ? 'text-green-400 animate-pulse' : 'text-slate-600'}`} />
                    </div>

                    <h3 className="text-base text-white font-bold mb-2 uppercase tracking-tight truncate group-hover:text-green-400 transition-colors">
                        {entry.title}
                    </h3>

                    <div className="bg-slate-900/50 p-2 border-l-2 border-slate-700 mb-2 group-hover:border-green-500 transition-colors">
                        <p className="line-clamp-2 opacity-80">
                            &gt; {entry.review}
                        </p>
                    </div>

                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <div className="h-1 w-16 bg-slate-800 rounded overflow-hidden">
                            <div className="h-full bg-green-500" style={{ width: `${entry.myRating * 10}%` }} />
                        </div>
                        <span className="text-green-500 font-bold">{entry.myRating}/10</span>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  // Fallback (Shouldn't trigger if all covered, but good practice)
  return null;
};

export default Top10Card;
