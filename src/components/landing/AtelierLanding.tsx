import React, { useState } from 'react';
import { PageId } from '../../types';
import { PAGE_THEMES } from '../../constants';

interface AtelierLandingProps {
  onNavigate: (id: PageId) => void;
}

// Curated order for the gallery
const EXHIBITION_ITEMS = [
  PageId.PROFILE,
  PageId.ANIME_SERIES, PageId.ANIME_MOVIES,
  PageId.MOVIES, PageId.TV_SERIES,
  PageId.DRAMA,
  PageId.MANGA, PageId.MANHWA, PageId.MANHUA,
  PageId.COMIC, PageId.BOOKS,
  PageId.LIGHT_NOVEL,
  PageId.GAMES,
  PageId.MUSIC,
  PageId.TRACKERS,
];

// Image mapping for gallery
// Only includes user-verified creative commons/unsplash source IDs
const GALLERY_IMAGES: Record<PageId, string> = {
  [PageId.PROFILE]: 'https://unsplash.com/photos/tV2_gksMCbc/download',
  [PageId.ANIME_SERIES]: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
  [PageId.ANIME_MOVIES]: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop',
  [PageId.MOVIES]: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
  [PageId.TV_SERIES]: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=600&auto=format&fit=crop',
  [PageId.DRAMA]: 'https://unsplash.com/photos/XtCYt6EOwwE/download',
  [PageId.MANGA]: 'https://unsplash.com/photos/lUgO0ozZ480/download',
  [PageId.MANHWA]: 'https://unsplash.com/photos/a6kpcMyKYlg/download',
  [PageId.MANHUA]: 'https://unsplash.com/photos/EqodlcRMZOY/download',
  [PageId.COMIC]: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=600&auto=format&fit=crop',
  [PageId.BOOKS]: 'https://unsplash.com/photos/HH4WBGNyltc/download',
  [PageId.LIGHT_NOVEL]: 'https://unsplash.com/photos/B8drXN4TKAQ/download',
  [PageId.GAMES]: 'https://unsplash.com/photos/w_ALCig7cVU/download',
  [PageId.MUSIC]: 'https://unsplash.com/photos/KazZtMYsPGs/download',
  [PageId.TRACKERS]: 'https://unsplash.com/photos/X2BVpYsMV-w/download',
  [PageId.HOME]: '',
};

/**
 * The Atelier - A structured, high-end art gallery interface.
 * Replaces the chaotic masonry with a precise grid.
 */
const AtelierLanding: React.FC<AtelierLandingProps> = ({ onNavigate }) => {
  const [hoveredId, setHoveredId] = useState<PageId | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#f2f2f0] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white overflow-x-hidden">
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply z-50"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-8 z-40 flex justify-between items-baseline mix-blend-darken pointer-events-none bg-gradient-to-b from-[#f2f2f0] to-transparent">
        <div className="flex flex-col">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-medium tracking-tighter leading-[0.9] md:leading-[0.8]">
            Atelier
          </h1>
          <span className="text-xs uppercase tracking-[0.3em] mt-4 ml-1 opacity-60">
            Curated Collection
          </span>
        </div>
        <div className="hidden md:block">
           <span className="text-xs font-mono border border-black/20 px-3 py-1 rounded-full">
             EST. 2025
           </span>
        </div>
      </header>
      
      {/* Main Exhibition Grid */}
      <div className="container mx-auto px-4 md:px-6 pt-32 md:pt-48 pb-12 md:pb-24 max-w-[1600px] relative z-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
          {EXHIBITION_ITEMS.map((id, index) => {
            const theme = PAGE_THEMES[id];
            const isHovered = hoveredId === id;
            const imageUrl = GALLERY_IMAGES[id];
            
            // Stagger animations based on index (simulated with standard delay classes if feasible, or inline style)
            const delayStyle = { transitionDelay: `${index * 50}ms` };

            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex flex-col items-center text-left focus:outline-none"
                style={delayStyle}
              >
                {/* Art Frame / Canvas */}
                <div 
                  className={`
                    w-full aspect-[3/4] p-2
                    bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] 
                    border border-[#e5e5e0] relative overflow-hidden transition-all duration-500 ease-out
                    group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)]
                    group-hover:-translate-y-2
                  `}
                >
                  <div className="w-full h-full relative overflow-hidden bg-neutral-100 flex items-center justify-center">
                     
                     {imageUrl ? (
                       <>
                         {/* Actual Art Image */}
                         <img 
                           src={imageUrl} 
                           alt={theme.title}
                           className={`
                             w-full h-full object-cover transition-all duration-700 ease-in-out
                             grayscale md:grayscale
                             md:group-hover:grayscale-0 md:group-hover:scale-105
                             scale-100 md:scale-100 opacity-100 md:opacity-90
                           `}
                         />
                         {/* Overlay for depth */}
                         <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-10 mix-blend-multiply bg-[#f2f2f0]'}`} />
                       </>
                     ) : (
                       /* Fallback Icon for Items without Image */
                       <div className={`
                          relative z-10 transition-all duration-500 transform
                          ${isHovered ? 'scale-110' : 'scale-100 opacity-60'}
                        `}>
                           <theme.icon 
                             size={48} 
                             strokeWidth={1} 
                             className={`
                               transition-colors duration-300
                               ${isHovered ? 'text-black' : 'text-[#888]'}
                             `} 
                           />
                           
                           {/* Subtle background glow for icon items */}
                           <div 
                              className="absolute inset-0 blur-3xl opacity-20 transform scale-150"
                              style={{ background: theme.accentColorLight }}
                           />
                        </div>
                     )}

                  </div>
                  
                  {/* Decorative corner marks */}
                  <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-black/10" />
                  <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-black/10" />
                  <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-black/10" />
                  <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-black/10" />

                </div>

                {/* Plaque / Label */}
                <div className="mt-6 w-full flex flex-col items-center">
                  <span className="text-xs font-mono text-neutral-400 mb-1 tracking-widest">
                    NO. {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-lg tracking-wide text-neutral-900 group-hover:text-black transition-colors">
                    {theme.title}
                  </h3>
                  {/* Genre / Subtext */}
                   <span className={`
                     text-[10px] uppercase tracking-wider mt-1
                     transition-all duration-300
                     opacity-100 md:opacity-0 translate-y-0
                     md:group-hover:opacity-50 md:group-hover:translate-y-0
                     md:-translate-y-2
                   `}>
                     {theme.genres[0]}
                   </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Footer / Signature */}
      <div className="fixed bottom-8 right-8 mix-blend-multiply opacity-20 pointer-events-none rotate-[-90deg] origin-bottom-right hidden md:block">
        <h2 className="text-6xl font-serif italic text-neutral-900">Gallery</h2>
      </div>

    </div>
  );
};

export default AtelierLanding;
