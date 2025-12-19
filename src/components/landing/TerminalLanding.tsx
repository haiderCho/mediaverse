import React, { useState, useEffect, useRef } from 'react';
import { PAGE_THEMES } from '../../constants';
import { PageId } from '../../types';

interface TerminalLandingProps {
  onNavigate: (id: PageId) => void;
}

// Terminal menu structure
// Terminal menu structure
const MENU_ITEMS: { id: PageId; category: string }[] = [
  { id: PageId.PROFILE, category: 'SYSTEM' },
  { id: PageId.ANIME_SERIES, category: 'ANIME' },
  { id: PageId.ANIME_MOVIES, category: 'ANIME' },
  { id: PageId.MOVIES, category: 'VISUAL' },
  { id: PageId.TV_SERIES, category: 'VISUAL' },
  { id: PageId.DRAMA, category: 'VISUAL' },
  { id: PageId.MANGA, category: 'READING' },
  { id: PageId.MANHWA, category: 'READING' },
  { id: PageId.MANHUA, category: 'READING' },
  { id: PageId.COMIC, category: 'READING' },
  { id: PageId.BOOKS, category: 'READING' },
  { id: PageId.LIGHT_NOVEL, category: 'READING' },
  { id: PageId.GAMES, category: 'INTERACTIVE' },
  { id: PageId.MUSIC, category: 'AUDIO' },
  { id: PageId.TRACKERS, category: 'SYSTEM' },
];

/**
 * Terminal Landing - Hacker CLI aesthetic
 */
const TerminalLanding: React.FC<TerminalLandingProps> = ({ onNavigate }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bootSequence, setBootSequence] = useState(true);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const terminalRef = useRef<HTMLDivElement>(null);
  const bootIndexRef = useRef(0);
  const bootIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Boot sequence animation
  useEffect(() => {
    const bootMessages = [
      'MEDIAVERSE KERNEL v4.19',
      'Mounting volumes... [OK]',
      'Initializing neural link... [OK]',
      'Loading archive index... [OK]',
      'Decrypting secure channels...',
      'Access Granted.',
      '',
    ];

    bootIntervalRef.current = setInterval(() => {
      const index = bootIndexRef.current;
      if (index < bootMessages.length) {
        setBootLines(prev => [...prev, bootMessages[index]]);
        bootIndexRef.current += 1;
      } else {
        finishBoot();
      }
    }, 120);

    return () => {
      if (bootIntervalRef.current) clearInterval(bootIntervalRef.current);
    };
  }, []);

  const finishBoot = () => {
    if (bootIntervalRef.current) clearInterval(bootIntervalRef.current);
    setBootSequence(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (bootSequence) return;
      
      if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        setSelectedIndex(i => Math.max(0, i - 1));
      } else if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        setSelectedIndex(i => Math.min(MENU_ITEMS.length - 1, i + 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onNavigate(MENU_ITEMS[selectedIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bootSequence, selectedIndex, onNavigate]);

  return (
    <div 
      className="min-h-screen w-full bg-black text-green-500 font-mono p-2 md:p-8 overflow-hidden relative"
      onClick={bootSequence ? finishBoot : undefined}
    >
      {/* Subtle CRT Scanlines */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-10"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 2px, 3px 100%',
        }}
      />
      
      {/* Subtle Glow */}
      <div className="fixed inset-0 pointer-events-none z-40 opacity-20 bg-green-500/5 blur-3xl" />

      {/* Terminal Window (V1 Style Container) */}
      <div className="max-w-4xl mx-auto relative z-10 border border-green-500/30 rounded bg-black/90 shadow-[0_0_50px_rgba(34,197,94,0.1)] min-h-[85vh] md:min-h-[80vh] flex flex-col mt-4 md:mt-8">
        
        {/* Header Bar (V2 Style System) */}
        <div className="border-b border-green-500/30 px-4 py-2 flex items-center justify-between bg-green-500/5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-xs font-bold text-green-400">ROOT@MEDIAVERSE:~#</span>
          </div>
          <div className="flex items-center gap-6 text-[10px] text-green-500/60 font-mono hidden md:flex">
             <span>MEM: 64TB [OK]</span>
             <span>CPU: QUANTUM [ACTIVE]</span>
             <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Console Body */}
        <div className="p-3 md:p-6 flex-1 overflow-y-auto font-mono text-xs md:text-base scrollbar-none break-all md:break-normal">
          {bootSequence ? (
            <div className="space-y-2">
              {bootLines.map((line, i) => (
                <div key={i} className="text-green-400">{line}</div>
              ))}
              <div className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1" />
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
               {/* Last login msg */}
               <div className="text-green-500/50 text-xs mb-6">
                 Last login: {currentTime.toDateString()} on tty1
               </div>

               {/* Menu List (V1 Style Layout) */}
               <div className="space-y-1">
                 {MENU_ITEMS.map((item, index) => {
                   const theme = PAGE_THEMES[item.id];
                   if (!theme) return null;
                   const isSelected = index === selectedIndex;
                   
                   return (
                     <div 
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`
                          cursor-pointer flex items-center gap-3 px-2 py-1.5 transition-colors
                          ${isSelected ? 'bg-green-500/20 text-green-300' : 'text-green-500/70 hover:text-green-400'}
                        `}
                     >
                        <span className="w-4">{isSelected ? '>' : ' '}</span>
                        <span className="w-24 opacity-60 text-xs uppercase tracking-wider">[{item.category}]</span>
                        <span className={`flex-1 tracking-wider ${isSelected ? 'font-bold' : ''}`}>
                          {item.id.replace(/_/g, ' ')}
                        </span>
                        {isSelected && (
                           <span className="text-xs opacity-50">&lt;ENTER&gt;</span>
                        )}
                     </div>
                   );
                 })}
               </div>

               {/* Prompt Line (V2 Style System) */}
               <div className="mt-12 border-t border-green-500/30 pt-4 flex items-center gap-2 text-green-400 text-sm">
                 <span className="font-bold">root@mediaverse:</span>
                 <span className="text-blue-400">/mnt/archives/</span>
                 <span className="text-white">{MENU_ITEMS[selectedIndex].id.toLowerCase()}</span>
                 <span className="w-2 h-4 bg-green-500 animate-pulse" />
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalLanding;
