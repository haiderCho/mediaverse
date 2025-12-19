import React, { useState, useRef, useEffect } from 'react';
import { Palette, ChevronDown } from 'lucide-react';
import { LandingDesign, LANDING_DESIGNS } from '../types';

interface DesignToggleProps {
  currentDesign: LandingDesign;
  onSelect: (design: LandingDesign) => void;
}

/**
 * Design selector dropdown in top-left corner.
 * Allows user to choose a specific design.
 */
const DesignToggle: React.FC<DesignToggleProps> = ({ currentDesign, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const current = LANDING_DESIGNS.find(d => d.id === currentDesign) || LANDING_DESIGNS[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="fixed top-4 right-4 z-[100]">
      {/* Toggle Button - Compact Icon Only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-10 h-10 
          bg-black/20 hover:bg-black/80 backdrop-blur-md 
          border border-white/10 rounded-full 
          text-white/70 hover:text-white transition-all duration-300
          ${isOpen ? 'bg-black text-white ring-2 ring-white/20' : ''}
        `}
        title={`Change Theme (Current: ${current.label})`}
      >
        <span className="text-lg leading-none">{current.icon}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-48 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl origin-top-right animate-in fade-in zoom-in-95 duration-200">
           <div className="px-3 py-2 border-b border-white/5 text-[10px] font-mono text-white/40 uppercase tracking-widest">
             Select Design
           </div>
          {LANDING_DESIGNS.map((design) => (
            <button
              key={design.id}
              onClick={() => {
                onSelect(design.id);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                ${design.id === currentDesign 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <span className="text-base">{design.icon}</span>
              <span className="text-sm font-medium">{design.label}</span>
              {design.id === currentDesign && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignToggle;
