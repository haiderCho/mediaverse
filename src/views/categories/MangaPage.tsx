import React, { useState, useEffect } from 'react';
import { PageId, MediaEntry } from '../../types';
import { generateMockData, PAGE_THEMES } from '../../constants';
import Top10MangaCard from '../../components/Top10MangaCard';
import { dataService } from '../../services/dataService';
import MangaCategoryOverview from '../../components/category/MangaCategoryOverview';
import MangaCategoryStats from '../../components/category/MangaCategoryStats';
import { Home, Star, BarChart3, Zap } from 'lucide-react';

interface MangaPageProps {
  onBack: () => void;
}

const MangaPage: React.FC<MangaPageProps> = ({ onBack }) => {
  const pageId = PageId.MANGA;
  const theme = PAGE_THEMES[pageId];

  // State for content
  const [activeGenre, setActiveGenre] = useState<string>('OVERVIEW');
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data when genre changes
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      // Don't load entry data for Overview or Stats pages
      if (activeGenre === 'OVERVIEW' || activeGenre === 'STATS') {
        setEntries([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const realData = await dataService.getGenreData(pageId, activeGenre);

        if (isMounted) {
          if (realData && realData.length > 0) {
            setEntries(realData);
          } else {
            // Fallback
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

    return () => {
    };
  }, [pageId, activeGenre]);

  return (
    <div className="min-h-screen bg-[#fbfaf5] text-[#111111] pb-20 fade-in flex flex-col relative manga-font-jp overflow-x-hidden">
      {/* Background Screentone - Subtle */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] manga-screentone" />
      
      <header className="sticky top-0 z-40 bg-[#fbfaf5]/90 backdrop-blur-md h-16 shrink-0 border-b-[4px] border-[#111111]">
        <div className="container mx-auto px-4 h-full flex items-center justify-between relative">
          <div className="flex items-center gap-6 relative z-10">
            <button
              onClick={onBack}
              className="manga-panel w-10 h-10 flex items-center justify-center hover:bg-[#111111] hover:text-[#fbfaf5] transition-all border-[3px]"
            >
              <Home size={20} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-3xl manga-title tracking-tight text-[#111111]">
                {theme.title}
              </h1>
              <div className="h-1 bg-[#bc002d] w-full" />
            </div>
          </div>

          <nav className="flex-1 ml-4 overflow-x-auto no-scrollbar relative z-10">
            <div className="flex items-center justify-end gap-1.5 min-w-max px-2">
              <button
                onClick={() => setActiveGenre('OVERVIEW')}
                className={`px-3 py-1 manga-lettering-alt text-sm transition-all border-[3px] border-[#111111] font-bold ${
                  activeGenre === 'OVERVIEW' ? 'bg-[#111111] text-[#fbfaf5]' : 'bg-white hover:bg-[#111111] hover:text-[#fbfaf5]'
                }`}
              >
                OVERVIEW
              </button>

              <button
                onClick={() => setActiveGenre('STATS')}
                className={`px-3 py-1 manga-lettering-alt text-sm transition-all border-[3px] border-[#111111] font-bold ${
                  activeGenre === 'STATS' ? 'bg-[#111111] text-[#fbfaf5]' : 'bg-white hover:bg-[#111111] hover:text-[#fbfaf5]'
                }`}
              >
                STATS
              </button>

              <div className="w-[3px] h-6 bg-[#111111] mx-1" />
              
              {theme.genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`px-3 py-1 manga-lettering-alt text-sm transition-all border-[3px] border-[#111111] font-bold ${
                    activeGenre === genre ? 'bg-[#bc002d] text-white border-[#111111]' : 'bg-white hover:bg-[#111111] hover:text-[#fbfaf5]'
                  }`}
                >
                  {genre.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {activeGenre !== 'OVERVIEW' && activeGenre !== 'STATS' && (
        <div className="w-full h-[20rem] relative flex items-center justify-center overflow-hidden border-b-[6px] border-[#111111] bg-white group">
          <div className="absolute inset-0 manga-action-lines opacity-10 z-0" />
          
          <div className="absolute inset-0 z-0 grayscale contrast-125 opacity-30">
            <img
              src={`${import.meta.env.BASE_URL}assets/hero_manga.jpg`}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              alt="Manga Hero"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center relative z-20">
            <div className="manga-panel-double bg-[#bc002d] w-12 h-12 flex items-center justify-center transform rotate-3 mb-6">
              <Zap size={24} className="text-white fill-white" />
            </div>

            <div className="relative">
              <h2 className="text-[8rem] md:text-[12rem] manga-title leading-none text-[#111111] opacity-5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                CATEGORY
              </h2>
              <h2 className="text-6xl md:text-8xl manga-title leading-[0.85] text-[#111111] relative z-10 border-b-[8px] border-[#111111] pb-2">
                {activeGenre.toUpperCase()}
              </h2>
            </div>
            
            <div className="mt-8 px-8 py-2 bg-[#111111] text-[#fbfaf5] manga-title text-2xl flex items-center gap-4">
              <span className="text-[#bc002d]">vol.</span>
              <span>10</span>
              <span className="opacity-60">|</span>
              <span className="text-lg opacity-100 font-bold">TOP SELECTION</span>
            </div>
          </div>
        </div>
      )}

      <main className={`container mx-auto px-6 relative z-20 flex-1 flex flex-col pt-12`}>
        {activeGenre === 'OVERVIEW' ? (
          <MangaCategoryOverview pageId={pageId} theme={theme} />
        ) : activeGenre === 'STATS' ? (
           <MangaCategoryStats pageId={pageId} theme={theme} />
        ) : entries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 pb-32">
            {/* Structured Clean Grid */}
            {entries.map((entry, index) => (
              <div key={entry.id} className="manga-pop" style={{ animationDelay: `${index * 50}ms` }}>
                <Top10MangaCard 
                  entry={entry} 
                  rank={index + 1} 
                  pageId={pageId} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-40">
            <div className="text-8xl text-[#111111]/5 manga-lettering mb-8">Empty Scroll</div>
            <div className="w-32 h-[8px] bg-[#111111]/10" />
          </div>
        )}
      </main>
    </div>
  );
};

export default MangaPage;
