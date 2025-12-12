import React from 'react';
import { HEX_GRID_LAYOUT } from '../constants';
import Hexagon from '../components/Hexagon';
import Starfield from '../components/Starfield';
import { PageId } from '../types';

interface LandingPageProps {
  onNavigate: (id: PageId) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black px-4 overflow-hidden relative">
      
      {/* Animated Deep Space Background */}
      <Starfield />

      {/* Header / Intro */}
      <div className="mb-2 md:mb-4 text-center fade-in relative z-20 px-2">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 900 }}>
          MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 animate-pulse">MEDIAVERSE</span>
        </h1>
        
        {/* Wrapped Tagline - Matching Footer Style */}
        <div 
          className="px-4 py-1.5 bg-slate-900/50 border border-cyan-500/30 rounded backdrop-blur-sm relative overflow-hidden inline-block"
          style={{
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.05)'
          }}
        >
          {/* Animated scan line */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-[scan_3s_ease-in-out_infinite]" />
          
          <p className="text-cyan-400/80 text-[8px] md:text-[10px] font-mono font-bold tracking-wider relative z-10">
            INITIALIZE_NAVIGATION_SEQUENCE // SELECT_A_NODE_TO_ACCESS_THE_ARCHIVES
          </p>
        </div>
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

      {/* Footer Decorative - Matching Top Panel */}
      <div className="mt-2 md:mt-4 relative z-20 flex justify-center">
        <div 
          className="px-4 py-1.5 bg-slate-900/50 border border-cyan-500/30 rounded backdrop-blur-sm relative overflow-hidden"
          style={{
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.05)'
          }}
        >
          {/* Animated scan line */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-[scan_3s_ease-in-out_infinite]" />
          
          <div className="text-[8px] md:text-[10px] text-cyan-400/80 font-mono font-bold tracking-wider relative z-10 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            SYSTEM.ONLINE // VER_2.0 // FOYTRIX_CORE_SYSTEM
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;