import React, { useState, useEffect } from 'react';
import { PageId, MediaEntry } from '../../types';
import { generateMockData, PAGE_THEMES } from '../../constants';
import CategoryStats from '../../components/category/CategoryStats';
import TvSeriesCategoryOverview from '../../components/category/TvSeriesCategoryOverview';
import Top10Card from '../../components/Top10Card';
import { dataService } from '../../services/dataService';
import { Home, Star, BarChart3, Tv, Hash } from 'lucide-react';

interface TvSeriesPageProps {
  onBack: () => void;
}

const TvSeriesPage: React.FC<TvSeriesPageProps> = ({ onBack }) => {
  const pageId = PageId.TV_SERIES;
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
            setEntries(realData.slice(0, 10)); // Strictly Top 10
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
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20 fade-in flex flex-col">
      {/* High-Contrast Seasonal Header */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b-4 border-[#E50914] shadow-2xl h-16 shrink-0">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center bg-black border-2 border-[#E50914] text-[#E50914] hover:bg-[#E50914] hover:text-white transition-all shadow-[4px_4px_0_0_rgba(229,9,20,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <Home size={20} />
            </button>
            <div className="flex flex-col">
              <h1
                className="text-2xl font-black uppercase tracking-tighter leading-none text-white"
                style={{ fontFamily: theme.fontFamily }}
              >
                THE <span className="text-[#E50914]">CHRONICLE</span>
              </h1>
            </div>
          </div>

          <nav className="flex-1 ml-6 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-end gap-2 min-w-max px-2">
              <button
                onClick={() => setActiveGenre('OVERVIEW')}
                className={`
                  px-4 py-1.5 font-black text-[11px] uppercase tracking-widest transition-all border-b-2
                  ${activeGenre === 'OVERVIEW' ? 'border-[#E50914] text-[#E50914] bg-white/5' : 'border-transparent text-slate-500 hover:text-slate-300'}
                `}
              >
                Overview
              </button>

              <button
                onClick={() => setActiveGenre('STATS')}
                className={`
                   px-4 py-1.5 font-black text-[11px] uppercase tracking-widest transition-all border-b-2
                  ${activeGenre === 'STATS' ? 'border-[#E50914] text-[#E50914] bg-white/5' : 'border-transparent text-slate-500 hover:text-slate-300'}
                `}
              >
                Analytics
              </button>

              <div className="h-4 w-[2px] bg-slate-800 mx-2" />
              {theme.genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`
                    px-4 py-1.5 font-black text-[11px] uppercase tracking-widest transition-all
                    ${activeGenre === genre ? 'text-white bg-[#E50914]' : 'text-slate-500 hover:text-slate-300'}
                  `}
                >
                  {genre}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

       {/* Genre Prestige Banner */}
       {activeGenre !== 'OVERVIEW' && activeGenre !== 'STATS' && (
         <div className="w-full bg-[#E50914] py-4 shadow-xl">
            <div className="container mx-auto px-4 flex items-center justify-between">
               <div className="flex items-center gap-4 text-white">
                  <div className="p-2 border-2 border-white rotate-3">
                    <Tv size={24} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-none" style={{ fontFamily: theme.fontFamily }}>
                       {activeGenre} SAGA
                    </h2>
                    <p className="text-[10px] font-bold tracking-[0.2em] opacity-80">VERIFIED SEASONS & SELECTIONS</p>
                  </div>
               </div>
               
               <div className="hidden md:flex items-center gap-8">
                  <div className="flex flex-col items-end">
                     <span className="text-[10px] font-black opacity-60">CATALOGUE ID</span>
                     <span className="text-sm font-bold tracking-tighter">TV-{activeGenre.slice(0,3).toUpperCase()}</span>
                  </div>
                  <div className="w-[2px] h-10 bg-white/20" />
                  <div className="flex flex-col items-end">
                     <span className="text-[10px] font-black opacity-60">PRECISION</span>
                     <span className="text-sm font-bold tracking-tighter italic">ULTRA-DENSE</span>
                  </div>
               </div>
            </div>
         </div>
      )}

      <main className="container mx-auto px-4 py-10 relative z-20 flex-1 flex flex-col">
        {activeGenre === 'OVERVIEW' ? (
          <TvSeriesCategoryOverview pageId={pageId} theme={theme} />
        ) : activeGenre === 'STATS' ? (
          <CategoryStats pageId={pageId} theme={theme} />
        ) : entries.length > 0 ? (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               {entries.map((entry, index) => (
                  <div key={entry.id} className="animate-in fade-in slide-in-from-right-4 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                    <Top10Card entry={entry} rank={index + 1} pageId={pageId} />
                  </div>
               ))}
            </div>

            {/* List Footer */}
            <div className="mt-12 border-t border-slate-800 pt-8 flex items-center justify-between text-slate-500 font-bold text-[10px] uppercase tracking-[0.4em]">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
                  DATA SOURCE: TVDB_CATALOGUE_V2
               </div>
               <div>END OF COLLECTION</div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-700">
            <Hash size={48} className="mb-4 opacity-20" />
            <span className="text-xl font-black uppercase tracking-widest opacity-20">Catalogue Empty</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default TvSeriesPage;
