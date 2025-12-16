import React, { useState, useEffect } from 'react';
import { PageId, MediaEntry } from '../../types';
import { generateMockData, PAGE_THEMES } from '../../constants';
import { Home } from 'lucide-react';
import Top10Card from '../../components/Top10Card';
import { dataService } from '../../services/dataService';

interface LightNovelPageProps {
  onBack: () => void;
}

const LightNovelPage: React.FC<LightNovelPageProps> = ({ onBack }) => {
  const pageId = PageId.LIGHT_NOVEL;
  const theme = PAGE_THEMES[pageId];

  // State
  const [activeGenre, setActiveGenre] = useState<string>(theme.genres[0] || 'All');
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const realData = await dataService.getGenreData(pageId, activeGenre);
        if (isMounted) setEntries(realData?.length ? realData : generateMockData(pageId, activeGenre).slice(0, 10));
      } catch (e) {
        if (isMounted) setEntries(generateMockData(pageId, activeGenre).slice(0, 10));
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, [pageId, activeGenre]);

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-[#e5e5e5] pb-10 fade-in flex flex-col font-serif">
      {/* 1. Header - E-Reader Style (Minimal, Flat) */}
      <header className="sticky top-0 z-40 bg-[#242424] border-b border-[#333] h-14 shrink-0 flex items-center shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <button onClick={onBack} className="text-[#888] hover:text-white"><Home size={18} /></button>
             <h1 className="text-lg font-medium text-white tracking-wide uppercase">{theme.title}</h1>
          </div>
          <div className="text-xs text-[#666] uppercase tracking-widest">{activeGenre}</div>
        </div>
      </header>

      {/* 2. Hero - E-Ink Minimalist */}
      <div className="w-full py-12 bg-[#2a2a2a] border-b border-[#333] flex flex-col items-center justify-center relative">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
         
         <h2 className="text-5xl font-serif text-white mb-2 tracking-tight" style={{ fontFamily: theme.fontFamily }}>
            Top 10 Reads
         </h2>
         <div className="h-0.5 w-16 bg-[#F5F5F5] mb-4"></div>
         <p className="text-[#888] text-sm font-sans">E-Reader Optimized Selection</p>
      </div>

      {/* 3. List - Clean Layout */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {entries.map((entry, index) => (
              <Top10Card key={entry.id} entry={entry} rank={index + 1} pageId={pageId} />
            ))}
        </div>
      </main>
    </div>
  );
};

export default LightNovelPage;
