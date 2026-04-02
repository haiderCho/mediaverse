import React, { useState } from 'react';
import { PageId, MediaEntry } from '../types';
import { PAGE_THEMES } from '../constants';
import { Star, X, ArrowRight } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Top10MangaCardProps {
  entry: MediaEntry;
  rank: number;
  pageId: PageId;
}

const Top10MangaCard: React.FC<Top10MangaCardProps> = ({ entry, rank, pageId }) => {
  const theme = PAGE_THEMES[pageId];
  const [isHovered, setIsHovered] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // --- REVIEW MODAL ---
  const ReviewModal = () => {
    if (!showReview) return null;
    return createPortal(
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowReview(false)}>
        <div 
          className={`bg-[#fbfaf5] text-[#111111] border-[6px] border-[#111111] p-10 max-w-2xl w-full relative shadow-2xl scale-in`}
          onClick={e => e.stopPropagation()}
        >
            <button 
                onClick={() => setShowReview(false)}
                className={`absolute top-6 right-6 p-2 text-[#111111] hover:bg-[#111111] hover:text-[#fbfaf5] transition-colors border-2 border-[#111111]`}
            >
                <X size={20} />
            </button>

            <div className="flex gap-8 mb-8 border-b-4 border-[#111111] pb-8">
                <img src={entry.coverUrl} alt={entry.title} className={`w-32 h-48 object-cover border-[4px] border-[#111111] shadow-lg`}/>
                <div className="flex flex-col justify-end">
                    <h3 className={`text-4xl font-black mb-2 text-[#111111] manga-lettering uppercase leading-none`}>{entry.title}</h3>
                    {entry.author && <div className={`text-xl font-bold mb-4 text-[#111111]/60 manga-lettering-alt`}>BY {entry.author.toUpperCase()}</div>}
                    <div className="flex items-center gap-2 bg-[#bc002d] text-white px-4 py-1 self-start manga-lettering-alt font-black text-2xl">
                        <Star size={20} fill={'white'} />
                        <span>{entry.myRating}/10</span>
                    </div>
                </div>
            </div>

            <h4 className={`text-xl font-black mb-4 manga-lettering`}>NOTES //</h4>
            <div className={`leading-relaxed max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar text-[#111111] font-bold text-lg manga-font-jp`}>
                <p className="whitespace-pre-wrap">{entry.review}</p>
            </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
      <>
      <div
        className={`relative group manga-panel transition-all duration-300 cursor-pointer flex flex-col h-auto bg-white border-[6px] border-[#111111] manga-pop`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowReview(true)}
      >
        {/* Subtle Screentone */}
        <div className="absolute inset-0 manga-screentone opacity-[0.05] pointer-events-none group-hover:opacity-[0.08] transition-opacity" />
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col w-full h-full">
            
            {/* Poster Art Panel - Compact */}
            <div className="w-full h-60 shrink-0 relative overflow-hidden border-b-[6px] border-[#111111]">
                <img 
                    src={entry.coverUrl} 
                    alt={entry.title} 
                    className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-105' : 'grayscale contrast-125'}`} 
                />
                
                {/* Hanko stamp rank */}
                <div 
                    className={`absolute top-4 left-4 w-14 h-14 flex items-center justify-center font-black text-3xl transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
                    style={{ 
                        background: '#bc002d',
                        color: 'white',
                        border: '4px solid #111111',
                        zIndex: 20,
                        fontFamily: 'Archivo Black'
                    }}
                >
                    {rank}
                </div>
            </div>

            {/* Info Panel */}
            <div className="flex-1 flex flex-col p-4 relative bg-[#fbfaf5]">
                <div className="flex flex-col mb-3 relative z-10">
                    <h3 className="text-2xl font-black manga-lettering-organic leading-[0.9] mb-1 group-hover:text-[#bc002d] transition-colors">
                        {entry.title}
                    </h3>
                    
                    {entry.author && (
                        <div className="text-[10px] font-bold text-[#111111]/90 manga-lettering-alt tracking-widest uppercase">
                            BY {entry.author}
                        </div>
                    )}
                </div>
                
                <div className="flex-1 mb-3 relative">
                    {/* Iconic Manga Speech Bubble */}
                    <div 
                        className="manga-bubble text-xs font-bold manga-font-jp leading-tight p-4 bg-white min-h-[70px] manga-pop"
                        style={{ transform: `rotate(${rank % 2 === 0 ? '-1.2deg' : '1.2deg'})` }}
                    >
                        "{entry.review?.slice(0, 85) || 'Click to read full scroll...'}..."
                    </div>
                </div>

                {/* Rating Footer */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t-[3px] border-[#111111]">
                    <div className="flex items-center gap-2">
                      <div className="text-xl manga-title text-[#111111]">
                        {entry.myRating}<span className="text-xs opacity-80 font-black ml-0.5">/10</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={`${i < Math.floor(entry.myRating / 2) ? "fill-[#bc002d] text-[#bc002d]" : "text-[#111111]/40"}`} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="manga-lettering-alt text-[10px] font-black tracking-widest group-hover:text-[#bc002d] transition-colors flex items-center gap-1">
                      INSCRIPTION <ArrowRight size={14} strokeWidth={3} />
                    </div>
                </div>
            </div>
        </div>
      </div>
      <ReviewModal />
      </>
  );
};

export default Top10MangaCard;
