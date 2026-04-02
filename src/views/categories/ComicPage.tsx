import React, { useState, useEffect } from 'react';
import { PageId, MediaEntry } from '../../types';
import { generateMockData, PAGE_THEMES } from '../../constants';
import { Home, Star } from 'lucide-react';
import Top10ComicCard from '../../components/Top10ComicCard';
import ComicCategoryOverview from '../../components/category/ComicCategoryOverview';
import ComicCategoryStats from '../../components/category/ComicCategoryStats';
import { dataService } from '../../services/dataService';

interface ComicPageProps {
  onBack: () => void;
}

const ComicPage: React.FC<ComicPageProps> = ({ onBack }) => {
  const pageId = PageId.COMIC;
  const theme = PAGE_THEMES[pageId];

  // State for content
  const [activeGenre, setActiveGenre] = useState<string>('OVERVIEW');
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data when genre changes
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
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
      isMounted = false;
    };
  }, [pageId, activeGenre]);

  return (
    <div className="min-h-screen bg-[#fbb013] text-black pb-10 fade-in flex flex-col relative selection:bg-yellow-300 selection:text-black">
      {/* Background Halftone Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)',
          backgroundSize: '12px 12px'
        }}
      />
      
      <header className="sticky top-0 z-40 bg-[#fbb013] border-b-[4px] border-black shadow-[0_6px_0_0_#000] h-16 shrink-0 relative">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-none border-[3px] border-black hover:bg-black hover:text-white transition-colors group bg-[#fff200] shadow-[3px_3px_0_0_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              <Home className="text-current" size={20} />
            </button>
            <div className="flex items-baseline gap-2">
              <h1
                className="text-2xl md:text-3xl font-black italic tracking-tight text-white uppercase"
                style={{ fontFamily: `'Impact', sans-serif`, WebkitTextStroke: '2px black' }}
              >
                <span className="bg-[#f00000] text-white border-[3px] border-black px-2 py-0.5 mt-1 tracking-tighter transform -skew-x-12 inline-block shadow-[4px_4px_0_0_#000]" style={{ WebkitTextStroke: '0px' }}>COMICS</span> 
              </h1>
            </div>
          </div>

          <nav className="flex-1 ml-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-end gap-2 min-w-max px-2 py-1">
              <button
                onClick={() => setActiveGenre('OVERVIEW')}
                className={`flex items-center gap-1.5 px-3 py-1 font-black transition-all duration-150 border-[3px] border-black uppercase tracking-wider text-xs transform -skew-x-6 ${
                  activeGenre === 'OVERVIEW' 
                    ? 'text-black bg-[#fff200] translate-y-1 translate-x-1 shadow-none' 
                    : 'text-black bg-[#fbb013] hover:bg-[#fff200] shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-y-1 hover:translate-x-1'
                }`}
              >
                <Star size={14} className={activeGenre === 'OVERVIEW' ? 'fill-white' : 'fill-transparent'} />
                Overview
              </button>

              <button
                onClick={() => setActiveGenre('STATS')}
                className={`flex items-center gap-1.5 px-3 py-1 font-black transition-all duration-150 border-[3px] border-black uppercase tracking-wider text-xs transform -skew-x-6 ${
                  activeGenre === 'STATS' 
                    ? 'text-white bg-[#0256a1] translate-y-1 translate-x-1 shadow-none' 
                    : 'text-black bg-[#fff200] hover:bg-[#0256a1] hover:text-white shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-y-1 hover:translate-x-1'
                }`}
              >
                <Star size={14} className={activeGenre === 'STATS' ? 'fill-white' : 'fill-transparent'} />
                Stats
              </button>

              <div className="h-6 w-[4px] bg-black mx-2 transform rotate-12" />
              {theme.genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`flex items-center gap-1.5 px-3 py-1 font-black transition-all duration-150 border-[3px] border-black uppercase tracking-wider text-xs transform -skew-x-6 ${
                    activeGenre === genre 
                      ? 'text-white bg-[#f00000] translate-y-1 translate-x-1 shadow-none' 
                      : 'text-black bg-[#fff200] hover:bg-[#f00000] hover:text-white shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-y-1 hover:translate-x-1'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* 2. Comic Hero Section */}
      {activeGenre !== 'OVERVIEW' && activeGenre !== 'STATS' && (
      <div
        className="w-full h-64 md:h-80 relative overflow-hidden bg-black pb-4 z-20 border-b-[4px] border-black shadow-[0_6px_0_0_#000]"
      >
        <div 
           className="absolute inset-0 border-b-[4px] border-black z-10"
           style={{ 
               clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0 100%)',
               background: `radial-gradient(circle at center, #fff200 0%, #fbb013 30%, #f00000 70%, #9c2121 100%)`
           }}
        >
          {/* Halftone pop pattern */}
          <div 
            className="absolute inset-0 z-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)',
              backgroundSize: '12px 12px'
            }}
          />
          {/* Comic Starburst Center Highlight */}
          <div 
            className="absolute inset-0 opacity-40 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.6) 100%)`
            }}
          />

          {/* Hero Image - classic comic halftone blend */}
          <div className="absolute inset-0 z-0 opacity-90 mix-blend-luminosity">
            <img
              src={`${import.meta.env.BASE_URL}assets/hero_comic.jpg`}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              alt="Comic Hero"
              className="w-full h-full object-cover grayscale-0"
            />
          </div>

          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-20 top-[-5%]">
            <div
              className="mb-4 px-6 py-2 border-[4px] border-black inline-block transform -rotate-3 bg-[#f00000] shadow-[6px_6px_0_0_#000]"
            >
              <h2
                className="text-6xl md:text-8xl font-black mb-3 italic tracking-tight text-white leading-none top-10"
                style={{
                  fontFamily: `'Impact', sans-serif`,
                  WebkitTextStroke: '2px black',
                  textShadow: `6px 6px 0 ${theme.accentColorDark}`
                }}
              >
                TOP 10
              </h2>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* 3. Ranked List */}
      <main className={`container mx-auto px-4 relative z-20 flex-1 flex flex-col ${activeGenre !== 'OVERVIEW' && activeGenre !== 'STATS' ? '-mt-8' : 'pt-8'}`}>
        {activeGenre === 'OVERVIEW' ? (
          <ComicCategoryOverview pageId={pageId} theme={theme} />
        ) : activeGenre === 'STATS' ? (
           <ComicCategoryStats pageId={pageId} theme={theme} />
        ) : entries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {entries.map((entry, index) => (
              <Top10ComicCard 
                key={entry.id} 
                entry={entry} 
                rank={index + 1} 
                pageId={pageId} 
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 py-20">
            No entries found for this genre.
          </div>
        )}
      </main>
    </div>
  );
};

export default ComicPage;
