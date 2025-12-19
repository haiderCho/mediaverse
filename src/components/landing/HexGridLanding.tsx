import React from 'react';
import { HEX_GRID_LAYOUT } from '../../constants';
import Hexagon from '../Hexagon';
import Hyperspace from '../Hyperspace';
import { PageId } from '../../types';

interface HexGridLandingProps {
  onNavigate: (id: PageId) => void;
}

/**
 * Hex Grid Landing - Original Sci-Fi Command Center Design
 */
const HexGridLanding: React.FC<HexGridLandingProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 px-4 overflow-hidden relative">
      
      {/* Animated Deep Space Background */}
      <Hyperspace />

      {/* Header / Intro */}
      <div className="mb-2 md:mb-4 text-center fade-in relative z-20 px-2">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 900 }}>
          <span className="text-white animate-pulse">MEDIAVERSE</span>
        </h1>
      </div>

      {/* Hex Grid Container - Perfectly Centered */}
      <div className="flex items-center justify-center w-full relative z-10 py-2 md:py-4 pt-6 md:pt-10">
        <div 
          className="relative flex flex-col items-center transform scale-[0.5] sm:scale-[0.6] md:scale-[0.75] lg:scale-90 opacity-0 animate-[fadeIn_0.6s_ease-in-out_0.3s_forwards] origin-center transition-transform duration-500 ease-in-out" 
        >
          {HEX_GRID_LAYOUT.map((row) => (
            <div 
              key={row.rowId} 
              className={`flex justify-center transition-all duration-300
                ${row.offset ? 'translate-x-[3.25rem] md:translate-x-[4.25rem]' : ''}
              `}
            >
              {row.items.map((itemId, idx) => (
                <Hexagon 
                  key={`${row.rowId}-${idx}`} 
                  pageId={itemId} 
                  onClick={onNavigate} 
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HexGridLanding;
