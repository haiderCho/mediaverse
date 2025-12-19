import React from 'react';
import { PAGE_THEMES } from '../../constants';
import { PageId } from '../../types';

interface BentoGridLandingProps {
  onNavigate: (id: PageId) => void;
}

// Define bento grid items with size variants
// Define bento grid items with size variants
// Define bento grid items with size variants
// Define bento grid items with size variants
const BENTO_ITEMS: { id: PageId; size: 'large' | 'medium' | 'medium-vertical' | 'small' }[] = [
  { id: PageId.PROFILE, size: 'large' },
  { id: PageId.ANIME_SERIES, size: 'medium' },
  { id: PageId.ANIME_MOVIES, size: 'small' },
  { id: PageId.MOVIES, size: 'medium-vertical' },
  { id: PageId.TV_SERIES, size: 'small' },
  { id: PageId.DRAMA, size: 'small' },
  { id: PageId.MANGA, size: 'medium-vertical' },
  { id: PageId.MANHWA, size: 'small' },
  { id: PageId.MANHUA, size: 'small' },
  { id: PageId.COMIC, size: 'medium' },
  { id: PageId.BOOKS, size: 'medium-vertical' },
  { id: PageId.LIGHT_NOVEL, size: 'small' },
  { id: PageId.GAMES, size: 'small' },
  { id: PageId.MUSIC, size: 'medium' },
  { id: PageId.TRACKERS, size: 'small' },
];

/**
 * Bento Grid Landing - Modern editorial asymmetric layout
 */
const BentoGridLanding: React.FC<BentoGridLandingProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white px-4 py-8 md:px-8 lg:px-16">
      {/* Header */}
      <header className="mb-4 md:mb-8 text-center">
        <h1 className="text-3xl md:text-6xl font-black tracking-tight mb-2 text-white">
          MEDIAVERSE
        </h1>
        <p className="text-slate-500 text-sm uppercase tracking-widest">Select a Category</p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 max-w-7xl mx-auto auto-rows-[100px] md:auto-rows-[140px] grid-flow-dense">
        {BENTO_ITEMS.map((item) => {
          const theme = PAGE_THEMES[item.id];
          const Icon = theme.icon;
          
          // Size classes
          const sizeClasses = {
            large: 'col-span-2 row-span-2',
            medium: 'col-span-2 row-span-1',
            'medium-vertical': 'col-span-1 row-span-2',
            small: 'col-span-1 row-span-1',
          };

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                group relative overflow-hidden rounded-2xl border border-slate-800 
                bg-gradient-to-br from-slate-900 to-slate-950
                hover:border-slate-600 transition-all duration-500 ease-out
                hover:scale-[1.02] hover:shadow-2xl
                ${sizeClasses[item.size]}
              `}
              style={{
                boxShadow: `0 0 0 0 ${theme.accentColorDark}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 40px ${theme.accentColorDark}30`;
                e.currentTarget.style.borderColor = theme.accentColorDark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 transparent';
                e.currentTarget.style.borderColor = '';
              }}
            >
              {/* Background glow */}
              <div 
                className="absolute inset-0 opacity-10 md:opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${theme.accentColorDark}, transparent 70%)` }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                <Icon 
                  size={item.size === 'large' ? 48 : item.size.startsWith('medium') ? 36 : 28}
                  className="mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: theme.accentColorDark }}
                />
                <span 
                  className={`font-bold uppercase tracking-wider text-center ${
                    item.size === 'large' ? 'text-lg md:text-xl' : item.size.startsWith('medium') ? 'text-sm md:text-base' : 'text-[10px] md:text-xs'
                  }`}
                  style={{ color: theme.accentColorDark }}
                >
                  {theme.title}
                </span>
              </div>

              {/* Corner accent */}
              <div 
                className="absolute top-0 right-0 w-8 h-8 opacity-30"
                style={{
                  background: `linear-gradient(135deg, transparent 50%, ${theme.accentColorDark} 50%)`,
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-slate-600 text-xs uppercase tracking-widest">Curated Archives</p>
      </footer>
    </div>
  );
};

export default BentoGridLanding;
