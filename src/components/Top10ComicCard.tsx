import React, { useState } from 'react';
import { PageId, MediaEntry } from '../types';
import { PAGE_THEMES } from '../constants';
import { Star, X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Top10ComicCardProps {
  entry: MediaEntry;
  rank: number;
  pageId: PageId;
}

const Top10ComicCard: React.FC<Top10ComicCardProps> = ({ entry, rank, pageId }) => {
  const theme = PAGE_THEMES[pageId];
  const [isHovered, setIsHovered] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // --- REVIEW MODAL ---
  const ReviewModal = () => {
    if (!showReview) return null;
    return createPortal(
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowReview(false)}>
        <div 
           className={`bg-[#0256a1] text-white border-[4px] border-black rounded-none shadow-[10px_10px_0_0_#000] p-6 max-w-2xl w-full relative scale-in`}
           onClick={e => e.stopPropagation()}
        >
            <button 
                onClick={() => setShowReview(false)}
                className={`absolute top-4 right-4 p-1 rounded-full text-white hover:bg-black/20 transition-colors`}
            >
                <X size={20} />
            </button>

            <div className="flex gap-4 mb-6">
                <img src={entry.coverUrl} alt={entry.title} className="w-24 h-36 object-cover border-[3px] border-black saturate-[1.2] transition-all hover:saturate-[1.5]" />
                <div>
                    <h3 className="text-2xl font-bold mb-1 text-white uppercase" style={{ fontFamily: `'Impact', sans-serif` }}>{entry.title}</h3>
                    {entry.author && <div className="text-sm font-medium mb-2 text-[#fbb013] border-b-2 border-[#fbb013] inline-block">By {entry.author}</div>}
                    <div className="flex items-center gap-1 text-[#fff200] font-bold mb-2">
                        <Star size={16} fill="currentColor" />
                        <span>{entry.myRating}/10</span>
                    </div>
                </div>
            </div>

            <h4 className="text-sm font-bold uppercase tracking-widest mb-3 text-[#fff200]">My Review</h4>
            <div className={`leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar text-white font-semibold`}>
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
        className="relative group bg-[#0256a1] border-[3px] border-black overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 cursor-pointer shadow-[4px_4px_0_0_#000]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowReview(true)}
        style={{
          boxShadow: isHovered 
            ? `10px 10px 0px 0px #000` 
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
            <div className={`w-28 sm:w-32 shrink-0 relative overflow-hidden transition-all duration-200 border-2 border-black inline-block ${isHovered ? 'bg-black shadow-[3px_3px_0_0_#000]' : 'bg-[#fff200]'}`}
                 style={{ transform: isHovered ? 'rotate(-2deg)' : 'none' }}>
                <img 
                    src={entry.coverUrl} 
                    alt={entry.title} 
                    className={`w-full h-full object-cover transition-all duration-300 ${isHovered ? 'scale-105 saturate-[1.5]' : 'saturate-[1.2] contrast-125'}`} 
                />
                 {/* Rank Burst */}
                 <div 
                    className={`absolute -top-3 -left-3 w-12 h-12 flex items-center justify-center font-black text-xl transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`}
                    style={{ 
                        fontFamily: `'Impact', sans-serif`,
                        background: isHovered ? '#ee5454' : '#fff',
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
                            color: isHovered ? '#fff200' : '#ffffff',
                            WebkitTextStroke: isHovered ? '1px black' : 'none'
                        }}
                    >
                        {entry.title}
                    </h3>
                    
                    {entry.author && (
                        <div className="text-xs font-bold text-[#fbb013] mt-1 uppercase border-b-[3px] border-[#fbb013] inline-block self-start pr-2">
                            {entry.author}
                        </div>
                    )}
                </div>
                
                {/* Speech Bubble for Review Snippet */}
                <div className="mt-2 relative">
                    <div className={`border-[2px] border-black p-2 relative z-10 shadow-[2px_2px_0_0_#000] transition-colors ${isHovered ? 'bg-[#f00000]' : 'bg-white'}`}>
                       <p className={`text-[10px] leading-tight line-clamp-2 font-bold italic ${isHovered ? 'text-white' : 'text-black'}`}>
                           "{entry.review || 'Click to read review...'}"
                       </p>
                    </div>
                </div>

                {/* Bottom Action Area */}
                <div className="flex items-center gap-2 pt-2 mt-auto">
                    <div className={`flex items-center justify-center gap-1 font-black px-2 py-0.5 transform -skew-x-12 border-[2px] border-black transition-colors ${isHovered ? 'bg-[#ee5454] text-white' : 'bg-black text-white'}`}>
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
};

export default Top10ComicCard;
