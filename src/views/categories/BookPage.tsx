import React, { useState, useEffect } from 'react';
import { PageId, MediaEntry } from '../../types';
import { generateMockData, PAGE_THEMES } from '../../constants';
import { Home } from 'lucide-react';
import Top10Card from '../../components/Top10Card';
import { dataService } from '../../services/dataService';

interface BookPageProps {
  onBack: () => void;
}

const BookPage: React.FC<BookPageProps> = ({ onBack }) => {
  const pageId = PageId.BOOKS;
  const theme = PAGE_THEMES[pageId];

  // State for content
  const [activeGenre, setActiveGenre] = useState<string>(theme.genres[0] || 'All');
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data when genre changes
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setIsLoading(true);
      try {
        const realData = await dataService.getGenreData(pageId, activeGenre);
        if (isMounted) {
          if (realData && realData.length > 0) {
            setEntries(realData);
          } else {
            const fallback = generateMockData(pageId, activeGenre);
            setEntries(fallback.slice(0, 10));
          }
        }
      } catch (error) {
        console.error('Failed to load data', error);
        if (isMounted) {
          const fallback = generateMockData(pageId, activeGenre);
          setEntries(fallback.slice(0, 10));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, [pageId, activeGenre]);

  return (
    <div className="min-h-screen bg-[#120f0e] text-[#d4c5a9] pb-10 fade-in flex flex-col font-serif">
      {/* 1. Header - Library Style */}
      <header className="sticky top-0 z-40 bg-[#1e1915]/95 backdrop-blur-md border-b border-[#3e352f] shadow-lg h-16 shrink-0">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1.5 rounded-full hover:bg-[#2c241b] transition-colors group">
              <Home className="text-[#8c7b6d] group-hover:text-[#d4c5a9]" size={20} />
            </button>
            <div className="flex items-baseline gap-2">
              <h1 className="text-xl md:text-2xl font-bold tracking-widest" style={{ fontFamily: theme.fontFamily, color: theme.accentColorDark }}>
                {theme.title}
              </h1>
              <span className="text-[10px] text-[#8c7b6d] uppercase tracking-widest hidden sm:block">Library</span>
            </div>
          </div>

          <nav className="flex-1 ml-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-end gap-2 min-w-max px-2">
              {theme.genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`px-3 py-1 rounded text-xs font-serif italic transition-all duration-300 border ${
                    activeGenre === genre
                      ? 'bg-[#2c241b] text-[#E2A065] border-[#E2A065]'
                      : 'bg-transparent text-[#8c7b6d] border-transparent hover:text-[#d4c5a9]'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* 2. Hero - Wood/Library Theme */}
      <div className="w-full h-64 md:h-80 relative overflow-hidden bg-[#1e1915]">
        {/* Wood Texture CSS Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: `repeating-linear-gradient(45deg, #2c241b 25%, transparent 25%, transparent 75%, #2c241b 75%, #2c241b), repeating-linear-gradient(45deg, #2c241b 25%, #1e1915 25%, #1e1915 75%, #2c241b 75%, #2c241b)`,
            backgroundPosition: '0 0, 10px 10px',
            backgroundSize: '20px 20px'
        }}></div>

        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
          <div className="mb-4 px-8 py-1 border-t border-b border-[#E2A065]">
             <span className="text-sm font-serif italic text-[#E2A065]">{activeGenre} Collection</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-3 text-[#d4c5a9]" style={{ fontFamily: theme.fontFamily }}>
            The Top 10
          </h2>
          <p className="text-[#8c7b6d] font-serif italic">Curated volumes of distinction</p>
        </div>
      </div>

      {/* 3. List */}
      <main className="container mx-auto px-4 -mt-8 relative z-20">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entries.map((entry, index) => (
              <Top10Card key={entry.id} entry={entry} rank={index + 1} pageId={pageId} />
            ))}
         </div>
      </main>
    </div>
  );
};

export default BookPage;
