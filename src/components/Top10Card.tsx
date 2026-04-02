import React, { useState } from 'react';
import { PageId, MediaEntry } from '../types';
import { PAGE_THEMES } from '../constants';
import { Star, Trophy, Zap, Bookmark, Clapperboard, Film, Gamepad2, ChevronRight, Quote, X, User } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Top10CardProps {
  entry: MediaEntry;
  rank: number;
  pageId: PageId;
}

const Top10Card: React.FC<Top10CardProps> = ({ entry, rank, pageId }) => {
  const theme = PAGE_THEMES[pageId];
  const [isHovered, setIsHovered] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // --- STYLE SELECTION ---
  const isManhwa = [PageId.MANHWA].includes(pageId);
  const isManhua = [PageId.MANHUA].includes(pageId);
  const isOtaku = [PageId.ANIME_SERIES, PageId.ANIME_MOVIES].includes(pageId);
  const isManga = [PageId.MANGA].includes(pageId);
  const isComic = [PageId.COMIC].includes(pageId);
  const isCinematic = [PageId.MOVIES, PageId.TV_SERIES, PageId.DRAMA].includes(pageId);
  const isLiterary = [PageId.BOOKS, PageId.LIGHT_NOVEL].includes(pageId);
  const isGamer = [PageId.GAMES].includes(pageId);

  // --- REVIEW MODAL ---
  const ReviewModal = () => {
    if (!showReview) return null;
    return createPortal(
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowReview(false)}>
        <div 
          className={`bg-[#1a1a1a] border rounded-2xl p-6 max-w-2xl w-full relative shadow-2xl scale-in ${isComic ? 'bg-white text-black border-[4px] border-black rounded-none shadow-[10px_10px_0_0_#000]' : isManga ? 'bg-[#f4f1ea] text-[#1c1c1c] border-[3px] border-[#1c1c1c]' : 'border-[#333]'}`}
          onClick={e => e.stopPropagation()}
          style={!isComic && !isManga ? { borderColor: theme.accentColorDark } : isManga ? { borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' } : {}}
        >
            <button 
                onClick={() => setShowReview(false)}
                className={`absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors ${(isComic || isManga) ? 'text-black hover:bg-black/10' : 'text-white'}`}
            >
                <X size={20} />
            </button>

            <div className="flex gap-4 mb-6">
                <img src={entry.coverUrl} alt={entry.title} className={`w-24 h-36 object-cover ${isComic ? 'border-[3px] border-black filter grayscale transition-all hover:grayscale-0' : isManga ? 'border-[2px] border-[#1c1c1c]' : 'rounded shadow-lg'}`} style={isManga ? { borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' } : {}}/>
                <div>
                    <h3 className={`text-2xl font-bold mb-1 ${(isComic || isManga) ? 'text-black' : 'text-white'} ${isComic ? 'uppercase' : ''}`} style={{ fontFamily: isComic ? `'Impact', sans-serif` : isManga ? `"Noto Serif JP", serif` : theme.fontFamily }}>{entry.title}</h3>
                    {entry.author && <div className={`text-sm font-medium mb-2 ${isComic ? 'text-zinc-700 border-b-2 border-black inline-block' : isManga ? 'text-[#1c1c1c]/70 uppercase tracking-widest' : 'text-[#888]'}`}>By {entry.author}</div>}
                    <div className="flex items-center gap-1 text-yellow-500 font-bold mb-2">
                        <Star size={16} fill={isManga ? '#B02626' : 'currentColor'} color={isManga ? '#B02626' : 'currentColor'} />
                        <span className={isManga ? 'text-[#1c1c1c]' : ''}>{entry.myRating}/10</span>
                    </div>
                </div>
            </div>

            <h4 className={`text-sm font-bold tracking-widest mb-3 ${isComic ? 'uppercase text-black' : isManga ? 'uppercase text-[#B02626]' : 'text-[#666]'}`}>My Review</h4>
            <div className={`leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar ${(isComic || isManga) ? 'text-black font-semibold' : 'text-[#e5e5e5]'}`} style={isManga ? { fontFamily: `"Noto Serif JP", serif` } : {}}>
                <p className="whitespace-pre-wrap">{entry.review}</p>
            </div>
        </div>
      </div>,
      document.body
    );
  };

  // --- COMIC STYLE (Western/Comic Panels) ---
  if (isComic) {
    return (
      <>
      <div
        className="relative group bg-white border-[3px] border-black overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 cursor-pointer shadow-[4px_4px_0_0_#000]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowReview(true)}
        style={{
          boxShadow: isHovered 
            ? `10px 10px 0px 0px ${theme.accentColorDark}` 
            : '4px 4px 0px 0px #000',
        }}
      >
        {/* Speed lines background that appears on hover */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 4px,
              rgba(0,0,0,0.06) 4px,
              rgba(0,0,0,0.06) 8px
            )`
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex h-40 sm:h-44 p-3 gap-4">
            
            {/* Poster Art */}
            <div className={`w-28 sm:w-32 shrink-0 relative overflow-hidden transition-all duration-200 border-2 border-black inline-block ${isHovered ? 'bg-black shadow-[3px_3px_0_0_#000]' : 'bg-white'}`}
                 style={{ transform: isHovered ? 'rotate(-2deg)' : 'none' }}>
                <img 
                    src={entry.coverUrl} 
                    alt={entry.title} 
                    className={`w-full h-full object-cover transition-all duration-300 ${isHovered ? 'scale-105' : 'grayscale contrast-125'}`} 
                />
                 {/* Rank Burst */}
                 <div 
                    className={`absolute -top-3 -left-3 w-12 h-12 flex items-center justify-center font-black text-xl transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`}
                    style={{ 
                        fontFamily: `'Impact', sans-serif`,
                        background: isHovered ? theme.accentColorDark : '#fff',
                        color: isHovered ? '#fff' : '#000',
                        WebkitTextStroke: isHovered ? '1px black' : 'none',
                        clipPath: 'polygon(50% 0%, 65% 20%, 98% 35%, 75% 55%, 79% 91%, 50% 70%, 21% 91%, 25% 55%, 2% 35%, 35% 20%)',
                        zIndex: 20
                    }}
                >
                    {rank}
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col pt-1 pb-1 pr-2 relative">
                <div className="flex flex-col mb-1 relative z-10">
                    <h3 
                        className={`text-lg sm:text-xl font-black leading-tight line-clamp-2 uppercase transition-all duration-200 ${isHovered ? 'italic' : ''}`}
                        style={{ 
                            fontFamily: isHovered ? `'Impact', sans-serif` : theme.fontFamily,
                            letterSpacing: isHovered ? '1px' : 'normal',
                            color: isHovered ? theme.accentColorDark : '#000',
                            WebkitTextStroke: isHovered ? '1px black' : 'none'
                        }}
                    >
                        {entry.title}
                    </h3>
                    
                    {entry.author && (
                        <div className="text-xs font-bold text-zinc-600 mt-1 uppercase border-b-[3px] border-black inline-block self-start pr-2">
                            {entry.author}
                        </div>
                    )}
                </div>
                
                {/* Speech Bubble for Review Snippet */}
                <div className="mt-2 relative">
                    <div className="border-[2px] border-black p-2 bg-white relative z-10 shadow-[2px_2px_0_0_#000]">
                       <p className="text-[10px] leading-tight text-black line-clamp-2 font-bold italic">
                           "{entry.review || 'Click to read review...'}"
                       </p>
                    </div>
                </div>

                {/* Bottom Action Area */}
                <div className="flex items-center gap-2 pt-2 mt-auto">
                    <div className="flex items-center justify-center gap-1 font-black text-white bg-black border-[2px] border-black px-2 py-0.5 transform -skew-x-12">
                        <Star size={12} className="fill-white" />
                        <span className="text-sm transform skew-x-12">{entry.myRating}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <ReviewModal />
      </>
    );
  }

  // --- MANGA STYLE (Sumi-e / Brush / Calligraphy) ---
  if (isManga) {
    return (
      <>
      <div
        className="relative group bg-[#f4f1ea] border-[2px] border-[#1c1c1c] overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer flex font-serif text-[#1c1c1c]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowReview(true)}
        style={{
          borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
        }}
      >
        {/* Subtle washi texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />

        {/* Ink splash hover background */}
        <div 
           className={`absolute -right-10 -bottom-10 w-48 h-48 bg-[#1c1c1c] rounded-full filter blur-3xl transition-all duration-700 ease-out origin-bottom-right mix-blend-multiply ${isHovered ? 'opacity-10 scale-[2.5]' : 'opacity-0 scale-50'}`}
        />

        {/* Content Container */}
        <div className="relative z-10 flex w-full h-40 sm:h-44 p-3 gap-4">
            
            {/* Poster Art with brush border */}
            <div className={`w-28 sm:w-32 shrink-0 relative overflow-hidden transition-all duration-500 border-[2px] border-[#1c1c1c] ${isHovered ? 'shadow-md' : ''}`}
                 style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
                <img 
                    src={entry.coverUrl} 
                    alt={entry.title} 
                    className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110 filter-none' : 'grayscale-[40%] sepia-[20%]'}`} 
                />
                 {/* Hanko stamp rank */}
                 <div 
                    className={`absolute -top-1 -left-1 w-8 h-8 flex items-center justify-center font-bold text-lg transition-all duration-300 ${isHovered ? 'opacity-100 rotate-0 scale-110' : 'opacity-90 -rotate-12'}`}
                    style={{ 
                        background: '#B02626',
                        color: '#f4f1ea',
                        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                        border: '1.5px solid #8B1A1A',
                        zIndex: 20,
                        fontFamily: `"Noto Serif JP", serif`
                    }}
                >
                    {rank}
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col pt-2 pb-1 pr-2 relative">
                <div className="flex flex-col mb-1 relative z-10">
                    <h3 
                        className="text-lg sm:text-lg font-black leading-tight line-clamp-2 transition-all duration-300 relative inline-block z-10"
                        style={{ fontFamily: `"Noto Serif JP", serif`, color: '#1c1c1c' }}
                    >
                        {entry.title}
                        {/* Red brush highlight stroke on hover */}
                        <div className={`absolute bottom-1 left-0 h-2 bg-[#B02626] opacity-30 mix-blend-multiply transition-all duration-500 -z-10 ${isHovered ? 'w-full' : 'w-0'}`} style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}></div>
                    </h3>
                    
                    {entry.author && (
                        <div className="text-[10px] font-bold text-[#1c1c1c]/60 mt-1 uppercase tracking-widest inline-block self-start relative">
                            {entry.author}
                            <div className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-[#1c1c1c]/40 rotate-1"></div>
                        </div>
                    )}
                </div>
                
                {/* Vertical line separator */}
                <div className="absolute left-[-10px] top-2 bottom-2 w-[1px] bg-[#1c1c1c]/20 rounded-full transform -rotate-2" />

                <div className="mt-2 relative pl-3 border-l-[2px] border-[#1c1c1c]/30" style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
                   <p className="text-[11px] leading-relaxed text-[#1c1c1c]/80 line-clamp-2 italic mix-blend-multiply font-medium">
                       "{entry.review || 'Click to read review...'}"
                   </p>
                </div>

                {/* Bottom Action Area */}
                <div className="flex items-center gap-2 pt-2 mt-auto justify-end border-t border-[#1c1c1c]/10">
                    <div className="flex items-center justify-center gap-1 text-[#1c1c1c]">
                        <Star size={14} className={`transition-all ${isHovered ? "fill-[#B02626] text-[#B02626]" : "fill-transparent text-[#1c1c1c]"}`} />
                        <span className="text-sm font-bold" style={{ fontFamily: `"Noto Serif JP", serif` }}>{entry.myRating}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <ReviewModal />
      </>
    );
  }

  // --- MANHWA STYLE (Korean Webtoon / Modern App) ---
  if (isManhwa) {
    return (
      <>
      <div
        className="relative group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowReview(true)}
        style={{
          boxShadow: isHovered 
            ? `0 20px 40px -10px ${theme.accentColorDark}30, 0 10px 20px -5px rgba(0,0,0,0.4)` 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Glow Background */}
        <div 
            className={`absolute inset-0 bg-slate-900 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}
        />
        <div 
            className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] transition-opacity duration-500 ${isHovered ? 'opacity-30' : 'opacity-10'}`}
            style={{ backgroundColor: theme.accentColorDark }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex h-52 sm:h-56 p-4 gap-6">
            
            {/* Tall Poster Art (Webtoon Style) */}
            <div className="w-36 sm:w-40 shrink-0 relative rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-[0_0_30px_rgba(0,255,159,0.15)] transition-all duration-500 border border-white/5">
                <img 
                    src={entry.coverUrl} 
                    alt={entry.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                
                {/* Modern Rank Badge - Leaderboard Style */}
                <div 
                    className="absolute top-0 left-0 w-12 h-12 rounded-br-2xl flex items-center justify-center font-black text-black backdrop-blur-md shadow-lg transition-transform duration-300 group-hover:scale-110 origin-top-left"
                    style={{ backgroundColor: theme.accentColorDark }}
                >
                    <span className="text-xl italic">#{rank}</span>
                </div>

                {/* Score Overlay - Bottom Right */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <Star size={12} fill={theme.accentColorDark} className="text-transparent" />
                    <span className="text-sm font-black text-white leading-none">{entry.myRating}</span>
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col pt-2 pb-2 pr-2 relative">
                <div className="flex flex-col mb-3 relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-[1px] w-6 bg-slate-700" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Curator Choice</span>
                    </div>
                    <h3 
                        className="text-2xl sm:text-3xl font-black leading-tight text-white line-clamp-2 transition-all duration-500 group-hover:tracking-tight"
                        style={{ 
                            fontFamily: theme.fontFamily,
                            color: isHovered ? theme.accentColorLight : '#fff'
                        }}
                    >
                        {entry.title}
                    </h3>
                    
                    {entry.author && (
                        <div className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-widest border-l-2 border-slate-800 pl-3">
                            {entry.author}
                        </div>
                    )}
                </div>

                <div className="relative mb-auto pl-1 border-white/5">
                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed opacity-60 font-medium">
                        {entry.review || entry.synopsis || 'Review pending system entry...'}
                    </p>
                </div>

                {/* Bottom Action Area - List Style */}
                <div className="flex items-center justify-between pt-4 mt-2">
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-5 h-5 rounded-full border-2 border-slate-900 bg-slate-800" />
                            ))}
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Entry ID: {entry.id.split('-').pop()}</span>
                    </div>
                    
                    <div 
                        className="flex items-center gap-2 px-4 py-2 rounded-full transition-all bg-white/5 border border-white/5 hover:bg-white/10 font-bold text-xs uppercase tracking-widest"
                        style={isHovered ? { color: theme.accentColorDark, borderColor: `${theme.accentColorDark}30` } : { color: '#64748b' }}
                    >
                        View Entry
                        <ChevronRight size={14} />
                    </div>
                </div>
            </div>
        </div>

        {/* Sparkle effect on hover */}
        {isHovered && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(4)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-ping opacity-20"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: '2s'
                        }}
                    />
                ))}
            </div>
        )}
      </div>
      <ReviewModal />
      </>
    );
  }

  // --- MANHUA STYLE (Cultivation / Traditional meets Cyber) ---
  if (isManhua) {
    return (
      <>
      <div
        className="relative group rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-slate-800"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowReview(true)}
        style={{
          boxShadow: isHovered 
            ? `0 0 30px ${theme.accentColorDark}20` 
            : 'none',
        }}
      >
        <div 
            className="absolute inset-0 bg-slate-950"
        />
        
        {/* Decorative Grid Pinspots */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(${theme.accentColorDark} 1px, transparent 1px)`, backgroundSize: '16px 16px' }} />

        {/* Content Container */}
        <div className="relative z-10 flex h-40 sm:h-44 p-3 gap-4">
            
            {/* Rank - Floating Hex */}
            <div 
                className={`absolute top-0 left-0 w-10 h-10 flex items-center justify-center font-bold text-black z-20 opacity-90 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
                style={{ 
                    backgroundColor: theme.accentColorDark,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}
            >
                {rank}
            </div>

            {/* Poster Art */}
            <div className="w-28 sm:w-32 shrink-0 relative overflow-hidden group-hover:shadow-[0_0_15px_rgba(252,238,10,0.3)] transition-all">
                <img 
                    src={entry.coverUrl} 
                    alt={entry.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col pt-1 pb-1 pr-2 relative">
                <div className="flex flex-col mb-1 relative z-10 font-sans">
                    <h3 
                        className="text-lg sm:text-lg font-black leading-[1.1] text-white line-clamp-2 uppercase italic"
                        style={{ fontFamily: theme.fontFamily, color: theme.accentColorDark }}
                    >
                        {entry.title}
                    </h3>
                    
                    {entry.author && (
                        <div className="text-[9px] font-bold text-white/50 mt-1 uppercase tracking-[0.3em]">
                            SECT: {entry.author}
                        </div>
                    )}
                </div>

                <div className="mt-2 border-l-2 border-yellow-500/20 pl-3">
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed opacity-80">
                        {entry.synopsis || entry.review}
                    </p>
                </div>

                {/* Bottom Action Area */}
                <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-auto">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        <Star size={10} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-[10px] font-black text-white">{entry.myRating}<span className="text-[8px] opacity-40">/10</span></span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-[8px] font-bold text-slate-500 tracking-widest uppercase">
                        Ascension Level <span className="text-white">99%</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <ReviewModal />
      </>
    );
  }

  // --- CINEMATIC STYLE (Movies/TV - IMDb PRO STYLE) ---
  if (isCinematic) {
    const isTv = pageId === PageId.TV_SERIES;
    const accentColor = isTv ? '#E50914' : '#f5c518'; // Netflix Red vs IMDb Yellow
    const accentText = isTv ? 'text-[#E50914]' : 'text-[#f5c518]';
    const accentBg = isTv ? 'bg-[#E50914]' : 'bg-[#f5c518]';

    return (
      <div
        className="relative group bg-[#1a1a1a] border border-[#333] overflow-hidden transition-all duration-300 hover:border-slate-600 cursor-pointer flex flex-col md:flex-row h-auto md:h-44 shadow-lg hover:shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowReview(true)}
      >
        {/* Left: Ranked Poster Block */}
        <div className="relative w-full md:w-32 h-64 md:h-full shrink-0 overflow-hidden bg-black">
          <img 
            src={entry.coverUrl} 
            alt={entry.title} 
            className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110 brightness-75' : 'brightness-90'}`} 
          />
          {/* Rank Number - IMDb Pro Style */}
          <div className={`absolute top-0 left-0 px-3 py-1 font-black text-xl italic z-20 shadow-xl ${isTv ? 'bg-[#E50914] text-white' : 'bg-[#f5c518] text-black'}`}>
            {rank}
          </div>
          {/* Hover Overlay Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
             <Trophy size={40} className={`drop-shadow-2xl ${isTv ? 'text-white' : 'text-[#f5c518]'}`} />
          </div>
        </div>

        {/* Right: Data-Rich Content */}
        <div className="flex-1 p-5 flex flex-col justify-center min-w-0">
          <div className="flex flex-col mb-3">
             <div className="flex items-center gap-2 mb-1">
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 border ${isTv ? 'border-[#E50914] text-[#E50914]' : 'border-[#f5c518] text-[#f5c518]'}`}>
                  {isTv ? 'SERIES' : 'FEATURE'}
                </span>
                <span className="h-[1px] flex-1 bg-slate-800" />
             </div>
             
             <h3 
                className="text-2xl md:text-3xl font-black text-white leading-tight truncate uppercase tracking-tighter"
                style={{ fontFamily: theme.fontFamily }}
              >
                {entry.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                {entry.year && <span>{entry.year}</span>}
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                {entry.runtime && <span>{entry.runtime}</span>}
                {entry.seasonCount && <span>{entry.seasonCount} Seasons</span>}
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="text-slate-400">{entry.genre}</span>
              </div>
          </div>

          {/* Rating Block */}
          <div className="flex items-center gap-6 mb-4">
            {/* IMDb Rating */}
             <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">IMDb RATING</span>
                <div className="flex items-center gap-1.5 text-white font-black text-lg">
                  <Star size={18} fill="#f5c518" className="text-[#f5c518]" />
                  <span>{entry.imdbRating || '8.5'} <span className="text-xs font-normal text-slate-500">/10</span></span>
                </div>
             </div>

             {/* Personal Rating */}
             <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">MY RATING</span>
                <div className="flex items-center gap-1.5 text-white font-black text-lg">
                  <Star size={18} fill={isTv ? '#E50914' : '#f5c518'} className={isTv ? 'text-[#E50914]' : 'text-[#f5c518]'} />
                  <span>{entry.myRating} <span className="text-xs font-normal text-slate-500">/10</span></span>
                </div>
             </div>

             {/* Metascore-style Box */}
             <div className="hidden sm:flex flex-col">
                <span className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">STATUS</span>
                <div className={`px-2 py-0.5 font-bold text-sm text-black rounded-sm ${isTv ? 'bg-red-600' : 'bg-green-600'}`}>
                   {isTv ? 'WATCHED' : 'MASTER'}
                </div>
             </div>
          </div>

          {/* Director/Author visible metadata */}
          {entry.author && (
            <div className="flex items-center gap-2 border-t border-slate-800 pt-3">
               <span className="text-[9px] font-bold text-slate-500 uppercase">{isTv ? 'CREATOR' : 'DIRECTOR'}</span>
               <span className="text-xs text-slate-300 font-bold tracking-wide">{entry.author}</span>
            </div>
          )}
        </div>
        
        {/* Status indicator on the right side hover */}
        <div className={`absolute top-0 right-0 w-1 h-full transition-all duration-300 ${isHovered ? 'w-2 opacity-100' : 'opacity-0'}`} style={{ backgroundColor: accentColor }} />
        
        <ReviewModal />
      </div>
    );
  }

  // --- LITERARY STYLE (Books) ---
  if (isLiterary) {
    return (
        <>
        <div 
            className="group relative bg-[#1e1c1a] rounded-r-md border-l-4 shadow-md transition-all duration-300 hover:translate-x-1 hover:shadow-xl flex overflow-hidden h-40 md:h-44 cursor-pointer"
            style={{ borderColor: theme.accentColorDark }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setShowReview(true)}
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
                 <h3 className="text-xl font-serif text-white mb-1 leading-tight" style={{ fontFamily: '"Goudy Bookletter 1911", serif' }}>
                    {entry.title}
                 </h3>

                 {entry.author && (
                     <div className="flex items-center gap-2 mb-2">
                        <User size={14} className="text-slate-500" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{entry.author}</span>
                     </div>
                 )}

                 <div className="relative pl-4 border-l border-slate-700">
                    <p className="text-xs text-slate-400 font-serif italic line-clamp-2">
                        "{entry.review}"
                    </p>
                 </div>
                 
                 <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-[10px] text-slate-500">My Rating: <span className="text-white">{entry.myRating}/10</span></div>
                    <ChevronRight size={14} className="text-slate-400" />
                 </div>
            </div>
        </div>
        <ReviewModal />
        </>
    );
  }

  // --- GAMER STYLE (Games) ---
  if (isGamer) {
    return (
        <>
        <div 
            className="group relative h-48 bg-black border border-slate-800 overflow-hidden transition-all duration-200 hover:border-green-500/50 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setShowReview(true)}
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
                        <h3 className="text-base text-white font-bold uppercase tracking-tight truncate group-hover:text-green-400 transition-colors">
                            {entry.title}
                        </h3>
                        <Gamepad2 size={14} className={`${isHovered ? 'text-green-400 animate-pulse' : 'text-slate-600'}`} />
                    </div>

                    <div className="mb-2">
                        {entry.author ? (
                            <span className="text-[10px] text-green-500/70 uppercase block">DEV: {entry.author}</span>
                        ) : (
                            <span className="text-[10px] text-green-500/70 uppercase block">SYS.ID: {entry.id.split('-').pop()}</span>
                        )}
                    </div>

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
        <ReviewModal />
        </>
    );
  }

  // Fallback (Shouldn't trigger if all covered, but good practice)
  return null;
};

export default Top10Card;
